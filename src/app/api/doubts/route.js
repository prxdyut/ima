import { connectDB } from "@/helper/db";
import { Doubts } from "@/helper/models";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId);

  let data;
  try {
    if (id)
      data = await Doubts.findOne({
        _id: id,
      }).exec();
    else if (user.publicMetadata.type == "teacher" || user.publicMetadata.type == "admin")
      data = await Doubts.find().exec();
    else if (user.publicMetadata.type == "student")
      data = await Doubts.find({
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
  const { userId } = auth();

  try {
    const data = new Doubts({...reqData, user: userId, created: new Date()});
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
    const updatedData = await Doubts.findOneAndUpdate({ _id: id }, reqData, {
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
    const deleteData = await Doubts.deleteOne({ _id: id });
    return NextResponse.json(deleteData);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}
