import { connectDB } from "@/helper/db";
import { Attendances, Schedules } from "@/helper/models";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  const batch = "batch1";
  const date = "2023-10-27";
  const students = ["a1", "a2", "a3", "a5", "a7", "a8", "a9"];

  let result;

  try {
    const data = await Attendances.findOne({
      batch,
      "logs.date": date,
    });

    if (data) {
      result = data;
    } else {
      result = {
        data: await Attendances.updateOne(
          {
            batch,
          },
          {
            $push: {
              logs: {
                date,
                students,
              },
            },
          },
          { upsert: true }
        ),
        msg: "created",
      };
    }

    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
