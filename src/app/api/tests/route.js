import { connectDB } from "@/helper/db";
import { Tests } from "@/helper/models";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import sendMail from "@/helper/sendMail";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId);

  let data;
  try {
    if (id)
      data = await Tests.findOne({
        _id: id,
      }).exec();
    else if (
      user.publicMetadata.type == "teacher" ||
      user.publicMetadata.type == "admin"
    )
      data = await Tests.find().exec();
    else if (user.publicMetadata.type == "student")
      data = await Tests.find({
        batch: user.publicMetadata.batch,
      }).exec();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(request) {
  let reqData = await request.json();
  const testData = reqData;

  try {
    const data = new Tests(testData);
    const createdData = await data.save();
    await sendMail(
      {
        subject: `New Test`,
        text: JSON.stringify(testData),
      },
      reqData.batch, 'tests'
    );

    console.log(createdData);
    return NextResponse.json(createdData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  let reqData = await request.json();

  try {
    const updatedData = await Tests.findOneAndUpdate({ _id: id }, reqData, {
      upsert: true,
    });

    console.log(updatedData);
    return NextResponse.json(updatedData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const deleteData = await Tests.deleteOne({ _id: id });
    return NextResponse.json(deleteData);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}
