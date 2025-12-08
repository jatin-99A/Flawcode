"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import type { user as PrismaUser } from "@prisma/client";


type TOnboardUser = () => Promise<{
    success: boolean;
    message: string;
    user?: PrismaUser;
}>;

export const onBoardUser: TOnboardUser = async () => {
    try {
        const user = await currentUser();

        if (!user) return { success: false, message: "No authenticated user found" };

        const { id: clerkId, firstName, lastName, imageUrl, emailAddresses } = user;
        const email = emailAddresses[0]?.emailAddress || "";

        // Fetch existing user
        const existingUser = await prisma.user.findUnique({ where: { clerkId } });

        // Prepare only changed fields for update
        const updateData: Partial<{
            firstName: string;
            lastName: string;
            imageUrl: string;
            email: string;
        }> = {};

        if (!existingUser || (firstName && firstName !== existingUser.firstName)) updateData.firstName = firstName || "";
        if (!existingUser || (lastName && lastName !== existingUser.lastName)) updateData.lastName = lastName || "";
        if (!existingUser || (imageUrl && imageUrl !== existingUser.imageUrl)) updateData.imageUrl = imageUrl || "";
        if (!existingUser || (email && email !== existingUser.email)) updateData.email = email;

        const upsertUser = await prisma.user.upsert({
            where: { clerkId },
            update: updateData,
            create: {
                clerkId,
                firstName: firstName || "",
                lastName: lastName || "",
                imageUrl: imageUrl || "",
                email,
            }
        });

        return {
            success: true,
            message: "User onboarded successfully",
            user: upsertUser,
        };

    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
};
