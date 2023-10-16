import { connectDB } from "@/helper/db";
import { Schedules } from "@/helper/models";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const date = request.nextUrl.searchParams.get("date");

  try {
    const data = await Schedules.findOne({ date });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PUT(request) {
  let reqData = await request.json();

  const date = request.nextUrl.searchParams.get("date");

  try {
    const newData = await Schedules.findOneAndUpdate(
      { date },
      { $push: { lectures: reqData } },
      { upsert: true }
    );

    console.log(newData);
    return NextResponse.json(newData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PATCH(request) {
  let reqData = await request.json();
  const id = request.nextUrl.searchParams.get("id");

  let formattedData = {};
  Object.keys(reqData).map(
    (key) => (formattedData[`lectures.$.${key}`] = reqData[key])
  );

  try {
    const newData = await Schedules.updateOne(
      { "lectures._id": id },
      {
        $set: formattedData,
      }
    );

    console.log(newData);
    return NextResponse.json(newData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(request) {
  const date = request.nextUrl.searchParams.get("date");
  const id = request.nextUrl.searchParams.get("id");

  try {
    const newData = await Schedules.updateOne(
      { date: new Date(date) },
      {
        $pull: { lectures: { _id: id } },
      }
    );

    console.log(newData);
    return NextResponse.json(newData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
