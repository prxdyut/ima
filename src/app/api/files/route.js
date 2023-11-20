import { connectDB } from "@/helper/db";
import { Files } from "@/helper/models";
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
      data = await Files.findOne({
        _id: id,
        batch: user.publicMetadata.batch,
      }).exec();
    else if (user.publicMetadata.type == "teacher" || user.publicMetadata.type == "admin")
      data = await Files.find().exec();
    else if (user.publicMetadata.type == "student")
      data = await Files.find({
        batch: user.publicMetadata.batch,
      }).exec();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}

export async function POST(request) {
  let reqData = await request.json();
const fileData = {...reqData}

  try {
    const data = new Files(fileData);
    const createdData = await data.save();

    await sendMail(
      {
        subject: `New File`,
        text: JSON.stringify(fileData),
      },
      reqData.batch, 'library'
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
    const updatedData = await Files.findOneAndUpdate(
      { _id: id },
      reqData,
      {
        upsert: true,
      }
    );

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
    const deleteData = await Files.deleteOne({ _id: id });
    return NextResponse.json(deleteData);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}
