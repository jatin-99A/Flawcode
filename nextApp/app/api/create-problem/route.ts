import { NextResponse } from "next/server";
import { asyncApiHandler, TAysncApiErrorHandler } from "@/lib/asyncErrorHandler";
import { UserRole } from "@/app/generated/prisma";
import prisma from "@/lib/db";
import { getJudge0LanguageId, submitBatch, pollBatchResults } from "@/lib/judge0";
import CreateProblemSchema, { TCreateProblemBody } from "@/lib/validation";
import { getCurrentUser } from "@/modules/auth/actions";

export const POST: TAysncApiErrorHandler = asyncApiHandler(async (request: Request) => {
    const userData = await getCurrentUser();

    if (userData?.role !== UserRole.ADMIN) {
        return NextResponse.json({ message: "Access denied. You do not have permission to access this resource" }, { status: 401 });
    }

    const body: TCreateProblemBody = await request.json();
    const parseResult = CreateProblemSchema.safeParse(body);

    if (!parseResult.success) {
        const firstError = parseResult.error.issues[0];
        return NextResponse.json({ message: firstError.message }, { status: 400 });
    }

    const { title, description, difficulty, tags, examples, constraints, testCases, codeSnippets, referenceSolutions } = parseResult.data;

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
        const languageId = getJudge0LanguageId(language);
        if (!languageId) {
            return NextResponse.json({ message: `Unsupported language: ${language}` }, { status: 400 });
        }

        const submissions = testCases.map(({ input, expectedOutput }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: expectedOutput,
        }));

        const submissionResults = await submitBatch(submissions);

        if (!submissionResults) return NextResponse.json({ success: false, message: "submission failed try again later" }, { status: 500 })
        const tokens = submissionResults.map((res) => res.token);
        const results = await pollBatchResults(tokens);

        if (!results) {
            return NextResponse.json(
                { success: false, message: "Failed to fetch results, please try again later" },
                { status: 500 }
            );
        }

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (result.status.id !== 3) {
                return NextResponse.json(
                    {
                        error: `Validation failed for ${language}`,
                        testCase: {
                            input: submissions[i].stdin,
                            expectedOutput: submissions[i].expected_output,
                            actualOutput: result.stdout,
                            error: result.stderr || result.compile_output,
                        },
                        details: result,
                    },
                    { status: 400 }
                );
            }
        }
    }

    const newProblem = await prisma.problems.create({
        data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testCases,
            codeSnippets,
            referenceSolutions,
            userId: userData.id,
        },
    });
    
    return NextResponse.json(
        { success: true, message: "Problem created successfully", data: newProblem },
        { status: 201 }
    );
});
