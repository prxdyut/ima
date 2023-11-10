import { connectDB } from "@/helper/db";
import { Batches } from "@/helper/models";
import { NextResponse } from "next/server";

connectDB();
export async function GET(request) {
  try {
    const data = await Batches.find().exec();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
