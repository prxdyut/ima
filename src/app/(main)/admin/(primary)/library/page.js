import React from "react";
import UIList from "@/components/list";
import { getFiles } from "@/helper/apis";

export default async function Page({}) {
  const data = await getFiles();
  return (
    <React.Fragment>
      {JSON.stringify(data)}
      {/* <UIList style={{ mx: -2 }} /> */}
    </React.Fragment>
  );
}
