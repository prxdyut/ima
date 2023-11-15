import { connectDB } from "@/helper/db";
import { Chats } from "@/helper/models";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id") || false;
  const { userId } = auth();

  try {
    let dataObject = [];
    if (id) {
      dataObject = await Chats.findOne({
        roomId: id,
      });
    } else {
      dataObject = await Chats.find({ members: userId }).select([
        "roomId",
        "roomName",
        "members",
      ]);
    }

    console.log(dataObject);
    return NextResponse.json(dataObject);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PATCH(request) {
  let reqData = await request.json();
  const id = request.nextUrl.searchParams.get("id");
  const { userId } = auth();

  try {
    const newData = await Chats.updateOne(
      { roomId: id },
      {
        $push: {
          messages: { sender: userId, timestamp: new Date(), ...reqData },
        },
      }
    );

    console.log(newData);
    return NextResponse.json(reqData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(request) {
  let reqData = await request.json();
  const { userId } = auth();

  try {
    const data = new Chats({
      roomId: Math.ceil(Math.random() * 10000000000),
      members: [userId, reqData.member],
      messages: []
    });
    const createdData = await data.save();

    console.log(createdData);
    return NextResponse.json(createdData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
