import React from "react";
import { auth, clerkClient, useUser } from "@clerk/nextjs";
import Loading from "./loading";
import Teacher from "./teacher";
import Student from "./student";

export default async function Page(params) {
  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId);

  if (user.publicMetadata.type == "teacher") return <Teacher {...params} />;
  if (user.publicMetadata.type == "admin") return <Teacher {...params} />;
  if (user.publicMetadata.type == "student") return <Student {...params} />;

  return <Loading />;
}
