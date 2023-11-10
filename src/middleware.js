import { authMiddleware, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  async afterAuth(auth, req, evt) {
    if (auth.isPublicRoute) return NextResponse.next();

    if (!auth.userId && !auth.isPublicRoute)
      return redirectToSignIn({ returnBackUrl: req.url });

    const path = req.nextUrl.pathname;
    if (path == "/")
      return NextResponse.rewrite(new URL(`/assignments`, req.url));
  },
  publicRoutes: [
    (process.env.API_AUTH) && "/api/:param",
    "/admin/:param",
    "/sign-in/:param",
    "/sign-up/:param",
    "/error/:param",
    "/components",
    "/file",
    "/api/:route"
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
