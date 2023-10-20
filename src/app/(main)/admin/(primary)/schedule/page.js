"use client";
import React, { useEffect, useState } from "react";
import UIList from "@/components/list";
import { getSchedule } from "@/helper/apis";
import UICalender from "../../../../../components/calender";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Page({}) {
  const router = useRouter();
  const [date, setDate] = useState(
    new Date("2023-10-14").toISOString("en-US", {
      timeZone: "America/New_York",
    })
  );
  const [data, setData] = useState({});

  useEffect(() => {
    getSchedule(new Date(date).toISOString()).then((res) => setData(res));
  }, [date]);

  return (
    <React.Fragment>
      {JSON.stringify(
        new Date(new Date(date).toLocaleString("en-US", {
          timeZone: "America/Toronto",
        })).toLocaleDateString()
      )}
      {JSON.stringify(`${new Date(date).getUTCFullYear()}-${new Date(date).getUTCMonth()}-${new Date(date).getUTCDate()}`)}
      <UICalender onChange={(date) => setDate(new Date(date).toISOString())} />
      <UIList style={{ mx: -2 }} />
    </React.Fragment>
  );
}
