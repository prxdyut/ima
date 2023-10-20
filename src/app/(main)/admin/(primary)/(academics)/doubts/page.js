import React from "react";
import UIList from "@/components/list";
import { getAllDoubts } from "@/helper/apis";

export default async function Page({}) {
  const data = await getAllDoubts();
  const contents = data.map(({ topic, content, created }) => ({
    title: topic,
    description: content,
    helper: new Date(created).toLocaleDateString(),
  }));

  return (
    <React.Fragment>
      <UIList
        contents={contents}
        style={{
          mx: -2,
          "& .MuiListItemText-secondary": {
            display: "inline-block",
            width: "75%",
            whiteSpace: "nowrap",
            overflow: "hidden !important",
            textOverflow: "ellipsis",
          },
        }}
      />
    </React.Fragment>
  );
}
