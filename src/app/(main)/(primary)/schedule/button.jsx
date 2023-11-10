"use client";
import { Box, Button, NoSsr, Stack, Typography } from "@mui/material";
import { ModalContext } from "@/helper/modal-context";
import React, { useContext } from "react";
import FormBuilder from "@/components/form-builder";
import {
  getFormattedDate,
  getFormattedTime,
  subjects,
} from "@/helper/functions";
import { usePathname, useRouter } from "next/navigation";
import { Verified } from "@mui/icons-material";
import ImageViewer from "@/components/images-viewer";
import Link from "next/link";

export default function NewButton(params) {
  const createModal = useContext(ModalContext);
  const router = useRouter();
  const pathname = usePathname();
  const form = (
    <FormBuilder
      formFields={[
        { type: "batch", name: "batch" },
        {
          type: "option",
          label: "Subject",
          name: "subject",
          options: subjects,
        },
        { type: "short", label: "Topic", name: "title" },
        { type: "date", label: "Date", name: "date" },
        { type: "time", label: "Start", name: "in" },
        { type: "time", label: "End", name: "out" },
      ]}
      type={"PUT"}
      onSubmit={(result) => {
        router.refresh();
params.reload()
        createModal(
          <Stack spacing={3} sx={{ mt: 2, p: 2 }}>
            <Stack>
              <Typography>
                <b>Id :</b> {result?._id}
              </Typography>
              <Typography>
                <b>Subject :</b> {result?.subject}
              </Typography>
              <Typography>
                <b>Title :</b> {result?.title}
              </Typography>
              <Typography>
                <b>Date :</b> {result?.date}
              </Typography>
              <Typography>
                <b>Start :</b> {getFormattedTime(result?.in)}
              </Typography>
              <Typography>
                <b>End :</b> {getFormattedTime(result?.out)}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <Button variant="outlined" onClick={() => router.back()}>
                done
              </Button>
            </Stack>
          </Stack>,
          "Created Successfully"
        );
      }}
      uri={"/api/schedules"}
    />
  );
  return (
    <Stack display={"flex"} alignItems={"flex-end"} sx={{ my: 2 }}>
      <Button
        variant="contained"
        onClick={() => createModal(form, "Create Test")}
        sx={{ width: "fit-content" }}
      >
        Create Schedule
      </Button>
    </Stack>
  );
}
