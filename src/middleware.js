import { clerkClient, withClerkMiddleware } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api*", "/error*", "/components", "/file"];

const isPublic = (path) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware(async (request) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const { userId } = getAuth(request);


  if (!userId) {
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }

  const user = await clerkClient.users.getUser(userId);

  if (request.nextUrl.pathname.split("/")[1] == user.privateMetadata.type) {
    return NextResponse.next();
  }

  const authErrorUrl = new URL("/error/authentication", request.url);
  return NextResponse.redirect(authErrorUrl);
});

export const config = {
  matcher: ["/((?!static|.*\\..*|_next|favicon.ico).*)", "/"],
};
