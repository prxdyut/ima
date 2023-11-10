"use client";
import React, { useContext, useEffect, useState } from "react";
import { getAssignment, getSubmission, getUser } from "@/helper/apis";
import { getFormattedDate } from "@/helper/functions";
import { Box, Button, Divider, NoSsr, Stack, Typography } from "@mui/material";
import ImageViewer from "@/components/images-viewer";
import Loading from "./loading";
import { ModalContext } from "@/helper/modal-context";
import FormBuilder from "@/components/form-builder";
import { useRouter } from "next/navigation";
import { clerkClient } from "@clerk/nextjs";

export default function Page({ params: { id } }) {
  const [assignment, setAssignment] = useState({});
  const [submission, setSubmission] = useState(false);
  const [teacherName, setTeacherName] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const data = { assignment, submission };
  const createModal = useContext(ModalContext);

  useEffect(() => {
    getAssignment(id)
      .then(async ({ teacher, ...res }) => ({
        ...res,
        teacher: await getUser(teacher).then(
          (user) => (user.firstName || "") + " " + (user.lastName || "")
        ),
      }))
      .then((res) => setAssignment(res))
      .then(() => setLoading(false));

    getSubmission(id)
      .then((res) => setSubmission(res))
      .then(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const form = (
    <FormBuilder
      formFields={[
        { type: "long", label: "Topic", name: "content" },
        { type: "file", label: "Files", name: "files" },
      ]}
      onSubmit={() => {
        router.refresh();
        router.back();
        createModal(
          <Typography textAlign={"center"} variant="h6" sx={{ p: 4 }}>
            Submitted Successfully
          </Typography>,
          ""
        );
      }}
      uri={`/api/submission?assignment=${id}`}
    />
  );

  return (
    <React.Fragment>
      <Stack direction={"column"} spacing={2}>
        {/* <Stack direction={"column"} spacing={1}> */}
        <Typography variant="h6" fontWeight={600}>
          {data?.assignment?.topic}
        </Typography>
        <Typography>{data?.assignment?.teacher}</Typography>
        <Typography fontWeight={600}>
          {getFormattedDate(data?.assignment?.expiry)}
        </Typography>
        <Divider textAlign="right">Assignment</Divider>
        {/* </Stack> */}
        <NoSsr>
          <div
            dangerouslySetInnerHTML={{ __html: data?.assignment?.content }}
          />
        </NoSsr>
        <ImageViewer contents={data?.assignment?.files} />
        {data?.submission ? (
          <React.Fragment>
            <Box />
            <Divider textAlign="right">Submission</Divider>
            <Typography fontWeight={600}>
              {getFormattedDate(data?.submission?.created)}
            </Typography>
            <NoSsr>
              <div
                dangerouslySetInnerHTML={{ __html: data?.submission?.content }}
              />
            </NoSsr>
            <ImageViewer contents={data?.submission?.files} />
          </React.Fragment>
        ) : (
          <Box sx={{ textAlign: "end" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => createModal(form, "Submit Assignment")}
            >
              Submit
            </Button>
          </Box>
        )}
      </Stack>
    </React.Fragment>
  );
}
