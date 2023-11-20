"use client";
import React from "react";
import {
  getFormattedDate,
  getFormattedName,
  getSubjectName,
} from "@/helper/functions";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FilesViewer from "@/components/files-viewer";
import { getTest, getUsersByBatch } from "@/helper/apis";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./loading";
import { useUser } from "@clerk/nextjs";

export default function Page({ params: { id } }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  console.log(data);
  useEffect(() => {
    getTest(id)
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);
  if (loading) return <Loading />;

  const obtained = data?.scores?.find(
    ({ user: user0 }) => user0 == user?.id
  )?.obtained;

  return (
    <React.Fragment>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"column"} spacing={1}>
          <Typography variant="h5" fontWeight={600}>
            {getSubjectName(data?.subject)}
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            {data?.title}
          </Typography>

          <Typography>{data?.teacher}</Typography>
          <Typography fontWeight={600}>
            {getFormattedDate(data?.created)}
          </Typography>

          <Typography variant="h5">
            <b>
              {obtained}&nbsp;/&nbsp;{data?.total}
            </b>
          </Typography>
        </Stack>
        <Divider textAlign="right">Test</Divider>
        <Typography variant="caption">Questions</Typography>
        <FilesViewer contents={data?.questions || []} />
        <Typography variant="caption">Answers</Typography>
        <FilesViewer contents={data?.answers || []} />
      </Stack>
    </React.Fragment>
  );
}
