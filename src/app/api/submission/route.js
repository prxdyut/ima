import { connectDB } from "@/helper/db";
import { Assignments } from "@/helper/models";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id") || false;
  const all = request.nextUrl.searchParams.get("all") || false;
  const { userId } = auth();

  try {
    let dataObject = false;
    if (id && all) {
      const data = await Assignments.findOne({
        _id: id,
      });
      if (data) dataObject = data.submissions;
      else dataObject = [];
    }

    if (id && !all) {
      const data = await Assignments.findOne({
        _id: id,
        "submissions.student": userId,
      });
      if (data) {
        dataObject = data.submissions.find((obj) => obj.student == userId);
      }
    }

    console.log(dataObject);
    return NextResponse.json(dataObject);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(request) {
  let reqData = await request.json();
  const id = request.nextUrl.searchParams.get("assignment");
  const { userId } = auth();

  try {
    const newData = await Assignments.updateOne(
      { _id: id },
      {
        $push: {
          submissions: { student: userId, created: new Date(), ...reqData },
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

export async function PATCH(request) {
  let reqData = await request.json();
  const id = request.nextUrl.searchParams.get("id");

  let formattedData = {};
  Object.keys(reqData).map(
    (key) => (formattedData[`submissions.$.${key}`] = reqData[key])
  );

  try {
    const newData = await Assignments.updateOne(
      { "submissions._id": id },
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
