import { NextResponse } from "next/server";

export type TAysncApiErrorHandler = (req: Request) => Promise<NextResponse>;

export const asyncApiHandler = (fn: TAysncApiErrorHandler) => async (req: Request) => {
    try {
        return await fn(req);
    } catch (err: any) {
        return NextResponse.json({ message: "Internal server error", error: err?.message }, { status: 500 });
    }
};
