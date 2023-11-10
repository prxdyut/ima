"use client";
import React, { useState } from "react";
import UIList from "@/components/list";
import UICalender from "@/components/calender";
import dayjs from "dayjs";
import {
  getFormattedTime,
  getSubjectIcon,
  getSubjectName,
  subjects,
} from "@/helper/functions";
import NewButton from "./button";
import { DeleteIcon, EditIcon } from "@/helper/icons";
import FormBuilder from "@/components/form-builder";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";

const n = (n) => (n > 9 ? "" + n : "0" + n);
const formattedDate = (value) =>
  `${value.$y}-${n(value.$M + 1)}-${n(value.$D)}`;
const formattedTime = (value) =>
  `${getFormattedTime(value.in)} - ${getFormattedTime(value.out)}`;

export default function Container({ data, reload, allowEdit = false }) {
  const [value, setValue] = useState(dayjs.tz(new Date(), "Etc/GMT+1"));

  const filteredData = data
    .filter(({ date: _ }) => formattedDate(dayjs(_)) == formattedDate(value))
    .flatMap(({ lectures, date }) => [
      ...lectures.map((_) => ({ ..._, date })),
    ]);
  console.log(filteredData);
  const router = useRouter();
  const contents = filteredData.map(
    ({ _id, title, subject, date, ...timings }) => ({
      icon: getSubjectIcon(subject, { style: { color: "black" } }),
      title,
      description: getSubjectName(subject),
      helper: <>{`${formattedTime(timings)}  `}&nbsp;</>,
      more: allowEdit && [
        {
          icon: <EditIcon fontSize={"small"} />,
          modal: (
            <FormBuilder
              formFields={[
                {
                  type: "option",
                  label: "Subject",
                  name: "subject",
                  options: subjects,
                  value: subject,
                },
                { type: "short", label: "Title", name: "title", value: title },
                { type: "date", label: "Date", name: "date", value: date },
                { type: "time", label: "Start", name: "in", value: timings.in },
                { type: "time", label: "End", name: "out", value: timings.out },
              ]}
              exitAfterSubmit={true}
              uri={`/api/schedules/?id=` + _id}
              onSubmit={() => reload()}
              type="PATCH"
            />
          ),
        },
        {
          icon: <DeleteIcon fontSize={"small"} />,
          modal: (
            <FormBuilder
              formFields={[
                {
                  type: "text",
                  label: `/api/schedules/?date=${date}&id=${_id}`,
                },
              ]}
              exitAfterSubmit={true}
              submitLabel="Delete"
              submitNode={
                <Typography sx={{ p: 4 }}>Deleted Successfully</Typography>
              }
              onSubmit={() => reload()}
              uri={`/api/schedules/?date=${date}&id=${_id}`}
              type="DELETE"
            />
          ),
        },
      ],
    })
  );

  return (
    <React.Fragment>
      {allowEdit && <NewButton reload={reload} />}
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
