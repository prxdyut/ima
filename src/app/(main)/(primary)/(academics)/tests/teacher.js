"use client";
import React, { useEffect, useState } from "react";
import UIList from "@/components/list";
import { getAllTests } from "@/helper/apis";
import NewButton from "./button";
import { DeleteIcon, EditIcon } from "@/helper/icons";
import FormBuilder from "@/components/form-builder";
import { getFormattedDate, subjects } from "@/helper/functions";
import { Typography } from "@mui/material";
import { getSubjectIcon, getSubjectName } from "@/helper/functions";
import Loading from "./loading";
import { useUser } from "@clerk/nextjs";

export default  function Page({}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getAllTests()
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);
  if (loading) return <Loading />;

  const contents = data.map(
    ({ title, subject, created, _id, questions, answers, total }) => ({
      title,
      description: getSubjectName(subject),
      helper: total,
      link: "/tests/" + _id,
      more:  [
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
                { type: "num", label: "Total", name: "total", value: 50 },
                {
                  type: "file",
                  label: "Question Set",
                  name: "questions",
                  value: questions,
                },
                {
                  type: "file",
                  label: "Answer Set",
                  name: "answers",
                  value: answers,
                },
              ]}
              exitAfterSubmit={true}
              uri={`/api/tests/?id=` + _id}
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
                  label: "Are you Sure? You want to delete this Test.",
                },
              ]}
              exitAfterSubmit={true}
              submitLabel="Delete"
              submitNode={
                <Typography sx={{ p: 4 }}>Deleted Successfully</Typography>
              }
              uri={`/api/tests/?id=` + _id}
              type="DELETE"
            />
          ),
        },
      ],
    })
  );

  return (
    <React.Fragment>
      <NewButton/>
      <UIList
        contents={contents}
        style={{
          mx: -2,
          "& .MuiTypography-caption": {
            color: "primary.main",
            fontSize: "1.2rem",
            fontWeight: 600,
          },
        }}
      />
    </React.Fragment>
  );
}
