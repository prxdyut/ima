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

export default function Student({}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  useEffect(() => {
    getAllTests()
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);
  if (loading) return <Loading />;

  const contents = data.map(
    ({ title, subject, created, _id, questions, answers, scores, total }) => {
      const obtained = scores?.find(
        ({ user: user0 }) => user0 == user?.id
      )?.obtained;

      return {
        title,
        description: getSubjectName(subject),
        helper: (obtained || 0) + ' / ' + (total || 0) ,
        link: "/tests/" + _id,
      };
    }
  );
  console.log(data);
  return (
    <React.Fragment>
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
