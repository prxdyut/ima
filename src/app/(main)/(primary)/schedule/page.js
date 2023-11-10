
import React from "react";
import { auth, clerkClient,  } from "@clerk/nextjs";
import Loading from "./loading";
import Teacher from "./teacher";
import Student from "./student";

export default async function Page(){
  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId)

  if (user.publicMetadata.type == "teacher") return <Teacher />;
  if (user.publicMetadata.type == "admin") return <Teacher />;
  if (user.publicMetadata.type == "student") return <Student />;

  return <Loading/>
}
