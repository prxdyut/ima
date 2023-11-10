import { connectDB } from "@/helper/db";
import { Assignments } from "@/helper/models";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId);

  let data;
  try {
    if (id)
      data = await Assignments.findOne({
        _id: id,
      }).exec();
    else if (
      user.publicMetadata.type == "teacher" ||
      user.publicMetadata.type == "admin"
    )
      data = await Assignments.find().exec();
    else if (user.publicMetadata.type == "student")
      data = await Assignments.find({
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
  const { userId } = auth();

  try {
    const data = new Assignments({...reqData, teacher: userId, created: new Date()});
    const createdData = await data.save();

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
    const updatedData = await Assignments.findOneAndUpdate(
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
    const deleteData = await Assignments.deleteOne({ _id: id });
    return NextResponse.json(deleteData);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}
