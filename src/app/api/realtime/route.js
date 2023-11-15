import { Fees } from "@/helper/models";
import { NextResponse } from "next/server";

export async function GET(request) {
  let data_;
  try {
    await Fees.watch().on("change", (data) => (data_ = data));
    return NextResponse.json(data_);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
