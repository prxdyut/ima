import { Assignments } from "../../../helper/models";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const reqData = await request.json();

  try {
    const data = new Assignments({ expiry: new Date() });
    const createdData = await data.save();

    console.log(createdData);
    return NextResponse.json(createdData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
