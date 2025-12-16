import { IJudge0Submission, ILanguageIds, ISubmissionPayload } from "@/types/types";
import axios from "axios";

const language_ids: ILanguageIds = {
    CPP: 54,
    C: 50,
    JAVA: 62,
    PYTHON: 71,
    JAVASCRIPT: 63,
    CSHARP: 51,
    GO: 60,
    RUBY: 72,
    KOTLIN: 78,
    SWIFT: 83,
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get judge0 ID by language name
export const getJudge0LanguageId = (
    languageName: string
): number | undefined => {
    return language_ids[languageName.toUpperCase() as keyof ILanguageIds];
};


// Submit batch of submissions to Judge0
export async function submitBatch(submissions: ISubmissionPayload[]): Promise<Array<any> | null> {
    try {
        const { data } = await axios.post(
            `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
            { submissions }
        );

        return data;

    } catch (error) {
        return null
    }
}

// Poll all tokens until they are done
export async function pollBatchResults(tokens: Array<string>): Promise<IJudge0Submission[] | null> {
    try {
        let maxRetries: number = 0;

        while (true) {
            const { data } = await axios.get(
                `${process.env.JUDGE0_API_URL}/submissions/batch`,
                {
                    params: {
                        tokens: tokens.join(","),
                        base64_encoded: false,
                    },
                }
            );

            const results = data.submissions;

            const isAllDone = results.every(
                (r: IJudge0Submission) => r.status.id !== 1 && r.status.id !== 2
            );
            if (isAllDone) return results;

            if (maxRetries === Number(process.env.JUDGE0_MAX_RETRIES)) return null

            maxRetries++
            await sleep(1000);
        }
    } catch (error) {
        return null
    }
}