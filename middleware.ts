import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/auth/(.*)",
    "/login",
    "/register",
    "/api/webhooks/(.*)",
    "/api/ai/(.*)",
    "/api/trpc/(.*)",
    "/bangla",
    "/bangla/(.*)",
  ],
  afterAuth(auth, req) {
    // Handle custom logic after authentication
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/login", req.url)
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

