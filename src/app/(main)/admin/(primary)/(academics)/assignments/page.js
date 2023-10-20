import React from "react";
import UIList from "@/components/list";
import { getAllAssignments } from "@/helper/apis";

export default async function Page({}) {
  const data = await getAllAssignments();
  const contents = data.map(({ topic, subject, expiry }) => ({
    title: topic,
    description: subject,
    helper: new Date(expiry).toLocaleDateString(),
    icon: <></>
  }));
  return (
    <React.Fragment>
      <UIList contents={contents} style={{ mx: -2 }} />
    </React.Fragment>
  );
}
