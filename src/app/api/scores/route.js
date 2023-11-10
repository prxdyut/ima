import { connectDB } from "@/helper/db";
import { Tests } from "@/helper/models";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const data = await Tests.findOne({ "scores._id": id });
    let dataObject;
    if (data) {
      const object = data.scores.find((obj) => obj.id === id);
      dataObject = object;
    } else {
      throw "No object found with the provided id";
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

  const id = request.nextUrl.searchParams.get("test");

  try {
    const newData = await Tests.updateOne(
      { _id: id },
      { $set: { scores: reqData } }
    );

    console.log(reqData);
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
    (key) => (formattedData[`scores.$.${key}`] = reqData[key])
  );

  try {
    const newData = await Tests.updateOne(
      { "scores._id": id },
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
