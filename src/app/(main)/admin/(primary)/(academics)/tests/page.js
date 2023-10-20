import React from "react";
import UIList from "@/components/list";
import { getAllTests } from "@/helper/apis";

export default async function Page({}) {
  const data = await getAllTests();
  const contents = data.map(({ title, subject, created }) => ({
    title,
    description: subject,
    helper: "10/50",
  }));

  return (
    <React.Fragment>
      <UIList
        contents={contents}
        style={{
          mx: -2,
          "& .MuiTypography-caption": {
            color: "primary.main",
            fontSize: "1.4rem",
            fontWeight: 600,
          },
        }}
      />
    </React.Fragment>
  );
}
