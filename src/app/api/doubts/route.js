import { connectDB } from "@/helper/db";
import { Doubts } from "@/helper/models";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  let data;
  try {
    if (id) data = await Doubts.findById(id).exec();
    else data = await Doubts.find().select(["_id", "topic", "created", "content"]).exec();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}

export async function POST(request) {
  let reqData = await request.json();

  try {
    const data = new Doubts(reqData);
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
