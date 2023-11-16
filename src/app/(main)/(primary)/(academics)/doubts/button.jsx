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
        { type: "batch", name: "batch", },
        { type: "short", label: "Topic", name: "topic" },
        { type: "long", label: "Topic", name: "content" },
        { type: "file", label: "Files", name: "files" },
      ]}
      onSubmit={(result) => {
        router.refresh();

        createModal(
          <Stack
            spacing={3}
            sx={{
              mt: 2,
              p: 2,
            }}
          >
            <Stack>
              <Typography>
                <b>Id :</b> {result?._id}
              </Typography>
              <Typography>
                <b>Topic :</b> {result?.topic}
              </Typography>
              <Typography>
                <b>Description : </b>
                <br />{" "}
                <NoSsr>
                  <div dangerouslySetInnerHTML={{ __html: result?.content }} />
                </NoSsr>
              </Typography>
              <ImageViewer contents={result?.files} />
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
          'Created Successfully'
        );
      }}
      uri={"/api/doubts"}
    />
  );
  return (
    <Stack display={"flex"} alignItems={"flex-end"} sx={{ my: 2 }}>
      <Button
        variant="contained"
        onClick={() => createModal(form, "Create Doubt")}
        sx={{ width: "fit-content" }}
      >
        Create Doubt
      </Button>
    </Stack>
  );
}
