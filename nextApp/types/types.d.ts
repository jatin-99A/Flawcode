import type { user as PrismaUser, UserRole } from "@prisma/client";
import { JSX } from "react";
import { int } from "zod";

export type TOnboardUser = () => Promise<{
    success: boolean;
    message: string;
    user?: PrismaUser;
}>;

export interface IFeatures {
    icon: JSX.Element;
    title: string;
    description: string;
};

export interface IStat {
    number: number;
    symbol: string;
    label: string;
};

export interface IActiveLinkProps {
    href: string
    activeClass?: string
    inactiveClass?: string
    className?: string
}

export interface IProblemCategory {
    level: string;
    title: string;
    description: string;
    count: string;
    color: "amber" | "indigo";
}

export interface ILanguageIds {
    CPP: number;
    C: number;
    JAVA: number;
    PYTHON: number;
    JAVASCRIPT: number;
    CSHARP: number;
    GO: number;
    RUBY: number;
    KOTLIN: number;
    SWIFT: number;
};

export interface ISubmissionPayload {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

interface IJudge0Status {
  id: number;
  description: string;
};

export interface IJudge0Submission {
  token: string;
  status: IJudge0Status;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
};
