"use client";
import React, { useEffect, useState } from "react";
import UIList from "@/components/list";
import { getAllAssignments } from "@/helper/apis";
import { getSubjectIcon, getSubjectName } from "@/helper/functions";
import { DeleteIcon, EditIcon } from "@/helper/icons";
import FormBuilder from "@/components/form-builder";
import { subjects } from "@/helper/functions";
import { Typography } from "@mui/material";
import Loading from "./loading";
import NewButton from "./button";

export default  function Teacher({}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAssignments()
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const contents = data.map(
    ({ _id, topic, subject, expiry, content, files }) => ({
      title: topic,
      description: getSubjectName(subject),
      helper: new Date(expiry).toLocaleDateString(),
      icon: getSubjectIcon(subject),
      link: "/assignments/" + _id,
      more: [
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
                { type: "short", label: "Topic", name: "topic", value: topic },
                {
                  type: "date",
                  label: "Expiry",
                  name: "expiry",
                  value: expiry,
                },
                {
                  type: "long",
                  label: "Topic",
                  name: "content",
                  value: content,
                },
                { type: "file", label: "Files", name: "files", value: files },
              ]}
              exitAfterSubmit={true}
              uri={`/api/assignment/?id=` + _id}
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
                  label: "Are you Sure? You want to delete this assignment.",
                },
              ]}
              exitAfterSubmit={true}
              submitLabel="Delete"
              submitNode={
                <Typography sx={{ p: 4 }}>Deleted Successfully</Typography>
              }
              uri={`/api/assignment/?id=` + _id}
              type="DELETE"
            />
          ),
        },
      ],
    })
  );

  return (
    <React.Fragment>
      <div id="webpushr-subscription-button"></div>
      <NewButton/>
      <UIList
        contents={contents}
        style={{
          mx: -2,
          "& .MuiListItemIcon-root svg": {
            bgcolor: "primary.light",
            color: "primary.main",
            borderRadius: 1,
          },
        }}
      />
    </React.Fragment>
  );
}
