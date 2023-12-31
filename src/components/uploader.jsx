"use client";

import useSWRMutation from "swr/mutation";
import "@mantine/dropzone/styles.css";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  NoSsr,
  Stack,
} from "@mui/material";
import { Save, UploadFile } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { CancelIcon, DeleteIcon } from "@/helper/icons";
import LoadingButton from "@mui/lab/LoadingButton";

export default function UploadComponent({
  onChange,
  slug = "",
  label = "Upload",
}) {
  const [file, setfile] = useState();
  const [uploading, setUploading] = useState(false);
console.log(file)
  useEffect(() => {
    onChange(file);
  }, [file]);

  async function uploadDocuments(url, { arg }) {
    setUploading(true);
    const body = new FormData();
    arg.file.forEach((file) => {
      body.append("file", file, file.name);
    });

    const response = await fetch(url, { method: "POST", body }).then((res) =>
      res.json()
    );
    setfile(await response);
    setUploading(false);
    return await response;
  }

  function ImagePicker() {
    const [id, _] = useState(Math.ceil(Math.random() * 100000));
    const { trigger } = useSWRMutation(
      "/api/documents?slug=" + slug,
      uploadDocuments
    );

    return (
      <React.Fragment>
        <input
          type="file"
          id={"uploadFile-" + id}
          
          // accept="image/png, image/gif, image/jpeg"
          onChange={(e) =>
            // trigger({
            //   file: Object.keys(e.target.file).map(
            //     (file) => e.target.file[file]
            //   ),
            // })
          console.log(e.target.files[0])
          }
          style={{ display: "none" }}
        />
        <LoadingButton
          loading={uploading}
          loadingPosition="start"
          startIcon={<UploadFile />}
          variant="outlined"
          fullWidth
          onClick={() => document.getElementById("uploadFile-" + id).click()}
        >
          {label}
        </LoadingButton>
      </React.Fragment>
    );
  }

  return (
    <Box>
      <ImagePicker />
      <ImageViewer contents={file} update={setfile} />
    </Box>
  );
}

const ImageComponent = (params) => {
  const [loading, setLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    if (loading) {
      let load = loadCount;
      const interval = setInterval(() => {
        load = load + 1;
        setLoadCount(load + 1);
      }, 100);
      return () => clearInterval(interval);
    } else return;
  }, [loading]);

  return (
    <React.Fragment>
      <img
        key={loadCount}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(true)}
        {...params}
        style={{
          display: loading ? "none" : "unset",
          width: "100%",
          borderRadius: 6,
        }}
      />
      <CircularProgress sx={{ display: !loading ? "none" : "unset", p: 1 }} />
    </React.Fragment>
  );
};

const ImageViewer = ({ contents = [], update }) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const deleteItem = (key, idx) => {
    fetch(`/api/documents?key=${key}`, {
      method: "DELETE",
    }).catch((error) => console.log("error", error));
    update(contents.filter((_, i) => i != idx));
  };

  return (
    <>
      <NoSsr>
        <style>
          {`.yarl__container {
    background-color: rgb(0 0 0 / 80%);}`}
        </style>
      </NoSsr>
      <ImageList
        // variant="masonry"
        sx={{ width: "100%", maxWidth: 625, pt: 1, mt: 1, pl: 1 }}
        cols={4}
        gap={12}
        // rowHeight={164}
      >
        {contents.map((key, idx) => (
          <ImageListItem
            key={idx}
            sx={{
              bgcolor: "primary.light",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 0.5,
            }}
          >
            <IconButton
              sx={{
                width: "fit-content",
                position: "absolute",
                top: "-8px",
                right: "-8px",
                bgcolor: "primary.light",
                p: 0,
              }}
              onClick={() => deleteItem(key, idx)}
            >
              <CancelIcon sx={{ color: "primary.main" }} />
            </IconButton>
            <ImageComponent
              src={`https://pradyut-test-bucket.s3.amazonaws.com/${key}`}
              onClick={() =>
                router.push(pathname + "?image-preview=" + idx, {
                  scroll: false,
                })
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Lightbox
        open={searchParam.has("image-preview")}
        close={() => router.back()}
        slides={contents.map((src) => ({
          src: `https://pradyut-test-bucket.s3.amazonaws.com/${src}`,
        }))}
        plugins={[Captions, Fullscreen, Video, Zoom, Share]}
        index={parseInt(searchParam.get("image-preview"))}
      />
    </>
  );
};
