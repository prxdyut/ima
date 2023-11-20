"use client";
import { Box, Button, NoSsr, Stack, Typography } from "@mui/material";
import { ModalContext } from "@/helper/modal-context";
import React, { useContext } from "react";
import FormBuilder from "@/components/form-builder";
import { getFormattedDate, subjects } from "@/helper/functions";
import { usePathname, useRouter } from "next/navigation";
import { Verified } from "@mui/icons-material";
import FilesViewer from "@/components/files-viewer";
import Link from "next/link";

export default function NewButton(params) {
  const createModal = useContext(ModalContext);
  const router = useRouter();
  const pathname = usePathname();
  const form = (
    <FormBuilder
      formFields={[
        {
          type: "option",
          label: "Subject",
          name: "subject",
          options: subjects,
        },
        { type: "batch", name: "batch",},
        { type: "short", label: "Topic", name: "topic",},
        { type: "date", label: "Expiry", name: "expiry" },
        { type: "long", label: "Topic", name: "content" },
        { type: "file", label: "Files", name: "files", },
      ]}
      onSubmit={(result) => {
        router.refresh();
        console.log(result);
        createModal(
          <Stack spacing={3} sx={{ mt: 2, p: 2 }}>
            <Stack>
              <Typography>
                <b>Id :</b> {result?._id}
              </Typography>
              <Typography>
                <b>Subject : </b>
                {result?.subject}
              </Typography>
              <Typography>
                <b>Topic :</b> {result?.topic}
              </Typography>
              <Typography>
                <b>Expiry :</b> {getFormattedDate(result?.expiry)}
              </Typography>
              <Typography>
                <b>Description : </b>
                <br />{" "}
                <NoSsr>
                  <div dangerouslySetInnerHTML={{ __html: result?.content }} />
                </NoSsr>
              </Typography>
              <FilesViewer contents={result?.files} />
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
      uri={`/api/assignment`}
    />
  );
  return (
    <Stack display={"flex"} alignItems={"flex-end"} sx={{ my: 2 }}>
      <Button
        variant="contained"
        onClick={() => createModal(form, "Create Assignment")}
        sx={{ width: "fit-content" }}
      >
        Create Assignemnt
      </Button>
    </Stack>
  );
}
