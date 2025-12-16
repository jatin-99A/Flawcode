import { z } from "zod";

const tags = z.array(z.string("Must be a string").nonempty("Each tag must be a non empty string")).optional();
const examples = z.array(z.string("Must be a string").nonempty("Each example must be a non empty string")).optional();
const constraints = z.array(z.string("Must be a string").nonempty("Each constraint must be a non empty string")).optional();

const testCaseSchema = z.object({
  input: z.any().refine(val => val !== undefined && val !== null, { message: "Test case input is required" }),
  expectedOutput: z.any().refine(val => val !== undefined && val !== null, { message: "Test case expected output is required" }),
});

const codeSnippetsSchema = z.object({
  cpp: z.string("Must be a string").nonempty("C++ code snippet is required"),
  c: z.string("Must be a string").nonempty("C code snippet is required"),
  java: z.string("Must be a string").nonempty("Java code snippet is required"),
  python: z.string("Must be a string").nonempty("Python code snippet is required"),
  javascript: z.string("Must be a string").nonempty("JavaScript code snippet is required"),
  csharp: z.string("Must be a string").nonempty("C# code snippet is required"),
  go: z.string("Must be a string").nonempty("Go code snippet is required"),
  ruby: z.string("Must be a string").nonempty("Ruby code snippet is required"),
  kotlin: z.string("Must be a string").nonempty("Kotlin code snippet is required"),
  swift: z.string("Must be a string").nonempty("Swift code snippet is required"),
});

const referenceSolutionsSchema = z.object({
  cpp: z.string("Must be a string").nonempty("C++ reference solution is required"),
  c: z.string("Must be a string").nonempty("C reference solution is required"),
  java: z.string("Must be a string").nonempty("Java reference solution is required"),
  python: z.string("Must be a string").nonempty("Python reference solution is required"),
  javascript: z.string("Must be a string").nonempty("JavaScript reference solution is required"),
  csharp: z.string("Must be a string").nonempty("C# reference solution is required"),
  go: z.string("Must be a string").nonempty("Go reference solution is required"),
  ruby: z.string("Must be a string").nonempty("Ruby reference solution is required"),
  kotlin: z.string("Must be a string").nonempty("Kotlin reference solution is required"),
  swift: z.string("Must be a string").nonempty("Swift reference solution is required"),
});

const CreateProblemSchema = z.object({
  title: z.string("Must be a string").nonempty("Title is required"),
  description: z.string("Must be a string").nonempty("Description is required"),
  difficulty: z.string("Must be a string").nonempty("Difficulty is required"),
  tags: tags,
  examples: examples,
  constraints: constraints,
  testCases: z.array(testCaseSchema).nonempty("At least one test case is required"),
  codeSnippets: codeSnippetsSchema,
  referenceSolutions: referenceSolutionsSchema,
});

export type TCreateProblemBody = z.infer<typeof CreateProblemSchema>;
export default CreateProblemSchema;
