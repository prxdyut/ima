import { connectDB } from "@/helper/db";
import { Fees } from "@/helper/models";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const student = request.nextUrl.searchParams.get("student") || false;

  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId);

  try {
    let dataObject = false;
    if (
      student &&
      (user.publicMetadata.type == "teacher" ||
        user.publicMetadata.type == "admin")
    ) {
      dataObject = await Fees.findOne({
        student,
      });
    }

    if (
      !student &&
      (user.publicMetadata.type == "teacher" ||
        user.publicMetadata.type == "admin")
    ) {
      dataObject = await Fees.find();
    }

    if (user.publicMetadata.type == "student") {
      dataObject = await Fees.findOne({
        student: userId,
      });
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
  const { userId } = auth();
  let { total, student, ...data } = reqData;
data.created = new Date()
data.updatedBy = userId

  try {
    const newData = await Fees.findOneAndUpdate(
      { student },
      {
        $push: { transactions: data },
        $set: {lastUpdated: new Date()}
      },
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
    (key) => (formattedData[`submissions.$.${key}`] = reqData[key])
  );

  try {
    const newData = await Fees.updateOne(
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
