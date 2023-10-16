import { connectDB } from "@/helper/db";
import { Doubts } from "@/helper/models";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const data = await Doubts.findOne({ "responses._id": id });
    let dataObject;
    if (data) {
      const object = data.responses.find((obj) => obj.id === id);
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

  const id = request.nextUrl.searchParams.get("doubt");

  try {
    const newData = await Doubts.updateOne(
      { _id: id },
      { $push: { responses: reqData } }
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
    (key) => (formattedData[`responses.$.${key}`] = reqData[key])
  );

  try {
    const newData = await Doubts.updateOne(
      { "responses._id": id },
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
