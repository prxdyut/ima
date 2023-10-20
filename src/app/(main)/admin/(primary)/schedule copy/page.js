import React from "react";
import UIList from "@/components/list";
import { getSchedule } from "@/helper/apis";

export default async function Page({}) {
  const data = await getSchedule(new Date('2023-10-14').toISOString());
  return (
    <React.Fragment>
      {JSON.stringify(data)}
      {/* <UIList style={{ mx: -2 }} /> */}
    </React.Fragment>
  );
}
