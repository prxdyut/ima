"use client";
import React, { useEffect, useState } from "react";
import UIList from "@/components/list";
import { getAllDoubts } from "@/helper/apis";
import NewButton from "./button";
import { DeleteIcon, EditIcon } from "@/helper/icons";
import FormBuilder from "@/components/form-builder";
import { Typography } from "@mui/material";
import Loading from "./loading";
import { useUser } from "@clerk/nextjs";

export default  function Student({}) {
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
