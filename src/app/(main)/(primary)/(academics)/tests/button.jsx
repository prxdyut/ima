"use client";
import { Box, Button, NoSsr, Stack, Typography } from "@mui/material";
import { ModalContext } from "@/helper/modal-context";
import React, { useContext } from "react";
import FormBuilder from "@/components/form-builder";
import { getFormattedDate, subjects } from "@/helper/functions";
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
        { type: "batch", name: "batch",},
        {
          type: "option",
          label: "Subject",
          name: "subject",
          options: subjects,
        },
        { type: "short", label: "Title", name: "title" },
        { type: "num", label: "Total", name: "total" },
        { type: "file", label: "Question Set", name: "questions" },
        { type: "file", label: "Answer Set", name: "answers" },
      ]}
      onSubmit={(result) => {
        router.refresh();

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
                <b>Total :</b> {result?.total}
              </Typography>
              <Typography>
                <b>Question Set :</b> <br/>
              <ImageViewer contents={result?.questions} />
              </Typography>
              <Typography>
                <b>Answer Set :</b> <br/>
              <ImageViewer contents={result?.answers} />
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <Button variant="outlined" onClick={() => router.back()}>
                done
              </Button>
              <Button
                variant="contained"
                LinkComponent={Link}
                href={pathname + "/" + result._id}
              >
                View
              </Button>
            </Stack>
          </Stack>,
          "Created Successfully"
        );
      }}
      uri={"/api/tests"}
    />
  );
  return (
    <Stack display={"flex"} alignItems={"flex-end"} sx={{ my: 2 }}>
      <Button
        variant="contained"
        onClick={() => createModal(form, "Create Test")}
        sx={{ width: "fit-content" }}
      >
        Create Test
      </Button>
    </Stack>
  );
}
