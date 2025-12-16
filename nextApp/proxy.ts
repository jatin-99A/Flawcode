import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { UserRole } from '@prisma/client';
import { getCurrentUser } from './modules/auth/actions';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  if (isAdminRoute(req)) {

    const userData = await getCurrentUser();

    if (userData?.role !== UserRole.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. You do not have permission to access this resource",
        },
        { status: 403 }
      );
    }
  }
}
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}