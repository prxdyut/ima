"use client";
import React, { useState } from "react";
import UIList from "@/components/list";
import UICalender from "@/components/calender";
import dayjs from "dayjs";
import { getFormattedTime, getSubjectIcon } from "@/helper/functions";

const n = (n) => (n > 9 ? "" + n : "0" + n);
const formattedDate = (value) =>
  `${value.$y}-${n(value.$M + 1)}-${n(value.$D)}`;
const formattedTime = (value) =>
  `${getFormattedTime(value.in)} - ${getFormattedTime(value.out)}`;

export default function Container({ data }) {
  const [value, setValue] = useState(dayjs.tz(new Date(), "Etc/GMT+1"));
  const filteredData = data
    .filter(({ date: _ }) => formattedDate(dayjs(_)) == formattedDate(value))
    .flatMap(({ lectures }) => lectures);

  const contents = filteredData.map(({ title, subject, ...timings }) => ({
    icon: getSubjectIcon(subject, { style: { color: "black" } }),
    title,
    helper: `${formattedTime(timings)}`,
  }));

  return (
    <React.Fragment>
      <UICalender value={value} onChange={(date) => setValue(date)} />
      <UIList
        style={{
          mx: 0,
          "& .MuiTypography-caption": {
            color: "text.primary",
            fontWeight: 500,
          },
        }}
        contents={contents}
      />
    </React.Fragment>
  );
}
