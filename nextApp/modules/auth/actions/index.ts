"use server";
import prisma from "@/lib/db";
import { TOnboardUser } from "@/types/types";
import { currentUser as currentUserClerk } from "@clerk/nextjs/server";
import { User } from "@/app/generated/prisma";


// Onboards the current Clerk user by creating or updating their record in the database
export const onBoardUser: TOnboardUser = async () => {
    try {
        const user = await currentUserClerk();

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

// Returns the currently authenticated user from the database
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const user = await currentUserClerk();
    if (!user) return null;
    
    return await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
  } catch {
    return null;
  }
};
