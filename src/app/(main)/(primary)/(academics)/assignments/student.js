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
import { auth, currentUser, useUser } from "@clerk/nextjs";

export default function Student({}) {
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
    })
  );

  return (
    <React.Fragment>
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
