"use client";
import React, { useEffect, useState } from "react";
import { getAssignment, getAllSubmissions, getUser } from "@/helper/apis";
import { getFormattedDate } from "@/helper/functions";
import { Box, Divider, NoSsr, Stack, Typography } from "@mui/material";
import FilesViewer from "@/components/files-viewer";
import Loading from "./loading";
import UIAccordian from "@/components/accordians";

export default function Page({ params: { id } }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssignment(id)
      .then(async (res) => ({
        ...res,
        submissions: await Promise.all(
          res.submissions.map(async (_) => ({
            ..._,
            student: await getUser(_.student).then(
              (user0) => (user0.firstName || "") + " " + (user0.lastName || "")
            ),
          }))
        ),
      }))
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);

  const contents = data?.submissions?.map(
    ({ student, content, files, created }) => ({
      title: student,
      content: (
        <Stack spacing={2}>
          <NoSsr>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </NoSsr>
          <FilesViewer contents={files} />
          <Box textAlign={"end"}>
            <Typography variant="caption">
              {new Date(created).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      ),
    })
  ) || [];
  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <Stack direction={"column"} spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          {data?.topic}
        </Typography>
        <Typography fontWeight={600}>
          {getFormattedDate(data?.expiry)}
        </Typography>
        <Divider textAlign="right">Assignment</Divider>
        <NoSsr>
          <div
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
        </NoSsr>
        <FilesViewer contents={data?.files} />
        <Box />
        <Divider textAlign="right">Submissions</Divider>
        <UIAccordian contents={contents} />
      </Stack>
    </React.Fragment>
  );
}
