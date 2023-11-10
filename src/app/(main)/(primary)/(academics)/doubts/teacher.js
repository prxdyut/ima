"use client";
import React, { useEffect, useState } from "react";
import UIList from "@/components/list";
import { getAllDoubts } from "@/helper/apis";
import NewButton from "./button";
import { DeleteIcon, EditIcon } from "@/helper/icons";
import FormBuilder from "@/components/form-builder";
import { Typography } from "@mui/material";
import Loading from "./loading";

export default  function Teacher({}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDoubts()
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);
  if (loading) return <Loading />;

  const contents = data.map(({ topic, content, created, files, _id }) => ({
    title: topic,
    description: content,
    helper: new Date(created).toLocaleDateString(),
    link: "/doubts/" + _id,
    more: [
      {
        icon: <EditIcon fontSize={"small"} />,
        modal: (
          <FormBuilder
            formFields={[
              { type: "short", label: "Topic", name: "topic", value: topic },
              { type: "long", label: "Topic", name: "content", value: content },
              { type: "file", label: "Files", name: "files", value: files },
            ]}
            exitAfterSubmit={true}
            uri={`/api/doubts/?id=` + _id}
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
                label: "Are you Sure? You want to delete this Doubt.",
              },
            ]}
            exitAfterSubmit={true}
            submitLabel="Delete"
            submitNode={
              <Typography sx={{ p: 4 }}>Deleted Successfully</Typography>
            }
            uri={`/api/doubts/?id=` + _id}
            type="DELETE"
          />
        ),
      },
    ],
  }));

  return (
    <React.Fragment>
      <NewButton/>
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
