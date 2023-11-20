import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId);
  const settings = user?.publicMetadata?.settings || {};
  console.log(settings);
  return NextResponse.json(settings);
}

export async function POST(req) {
  const reqData = await req.json();
  const { userId } = auth();
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: { settings: reqData },
  });
  return NextResponse.json(reqData);
}
