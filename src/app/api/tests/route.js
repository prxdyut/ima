import { connectDB } from "@/helper/db";
import { Tests } from "@/helper/models";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const data = await Tests.findById(id).exec();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}

export async function POST(request) {
  let reqData = await request.json();

  try {
    const data = new Tests(reqData);
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
    const updatedData = await Tests.findOneAndUpdate(
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
    const deleteData = await Tests.deleteOne({ _id: id });
    return NextResponse.json(deleteData);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}
