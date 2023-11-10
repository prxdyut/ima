"use client";
import { Button, Stack, Typography } from "@mui/material";
import { ModalContext } from "@/helper/modal-context";
import React, { useContext } from "react";
import FormBuilder from "@/components/form-builder";
import {
  fileFormats
} from "@/helper/functions";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function NewButton(params) {
  const createModal = useContext(ModalContext);
  const router = useRouter();
  const pathname = usePathname();
  const form = (
    <FormBuilder
      formFields={[
        { type: "batch", name: "batch",},
        { type: "short", label: "Title", name: "title" },
        {
          type: "option",
          label: "File Type",
          name: "type",
          options: fileFormats,
        },
        { type: "short", label: "File URL", name: "url" },
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
                <b>Title :</b> {result?.title}
              </Typography>
              <Typography>
                <b>Type :</b> {result?.type}
              </Typography>
              <Typography>
                <b>Url :</b>{" "}
                <Link href={result?.url} target="_blank" style={{color: 'blue'}}>
                  {result?.url}
                </Link>
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <Button variant="outlined" onClick={() => router.back()}>
                done
              </Button>
              <Button
                variant="contained"
                LinkComponent={Link}
                href={result?.url}
                target="_blank"
              >
                View
              </Button>
            </Stack>
          </Stack>,
          "Created Successfully"
        );
      }}
      uri={"/api/files"}
    />
  );
  return (
    <Stack display={"flex"} alignItems={"flex-end"} sx={{ my: 2 }}>
      <Button
        variant="contained"
        onClick={() => createModal(form, "Create Upload")}
        sx={{ width: "fit-content" }}
      >
        Create Upload
      </Button>
    </Stack>
  );
}
