import { connectDB } from "@/helper/db";
import { Attendances, Schedules } from "@/helper/models";
import { NextResponse } from "next/server";

connectDB();

export async function GET(request) {
  const date = request.nextUrl.searchParams.get("date") || false;
  const batch = request.nextUrl.searchParams.get("batch") || false;

  let data = null;
  try {
    if (date && batch) {
      const fetchData = await Attendances.findOne({
        "logs.date": date,
        batch,
      }).exec();

      if (fetchData) data = fetchData.logs.find((log) => log.date == date);
    }

    if (!date && batch) {
      data = await Attendances.findOne({
        batch,
      }).exec();
    }

    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(request) {
  const reqData = await request.json();
  const { date, batch } = reqData.logs;
  console.log(reqData);
  let result;

  try {
    const data = await Attendances.findOne({
      batch,
      "logs.date": date,
    });

    if (data) {
      result = {
        data: await Attendances.updateOne(
          {
            batch,
          },
          {
            $set: {
              logs: data.logs.map((log) => {
                if (log.date == date) {
                  return reqData.logs;
                } else return log;
              }),
            },
          },
          { upsert: true }
        ),
        msg: "created",
      };
    } else {
      result = {
        data: await Attendances.updateOne(
          {
            batch,
          },
          {
            $push: reqData,
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
