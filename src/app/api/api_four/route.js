import { clerkClient } from "@clerk/nextjs";
import sendMail from "../../../helper/sendMail";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const users = await clerkClient.users.getUserList();
    const batchUsers = users.filter((user) => user.publicMetadata.batch);
    const settingsUsers = batchUsers.filter(
      (user) => user.publicMetadata.settings?.["assignments"]
    );
    const emailOfUsers = settingsUsers.flatMap((user) =>
      user.emailAddresses.map((o) => o.emailAddress)
    );
    const stringifiedEmailOfUsers = emailOfUsers.join(", ");

    // await sendMail({
    //   from: process.env.NODEMAILER_EMAIL,
    //   bcc: "pradyut.encorewolf@gmail.com, pradyutdasforwork@gmail.com",
    //   subject: "TEST",
    //   text: "NEW EMAIL 2",
    // });

    return NextResponse.json(stringifiedEmailOfUsers);
  } catch (e) {
    console.log(e);
    return NextResponse.json({});
  }
}
