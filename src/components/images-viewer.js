"use client";
import {
  ImageList,
  ImageListItem, NoSsr
} from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "suneditor/dist/css/suneditor.min.css";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ImageViewer = ({ contents = [], cols = 3 }) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  return (
    <>
      <NoSsr>
        <style>
          {`.yarl__container {
    background-color: rgb(0 0 0 / 80%);}`}
        </style>
      </NoSsr>
      <ImageList sx={{ width: "100%" }} cols={cols}>
        {contents.map((item, idx) => (
          <ImageListItem
            key={idx}
            onClick={() =>
              router.push(pathname + "?image-preview=" + idx, { scroll: false })
            }
          >
            <img
              srcSet={`${item}`}
              src={`${item}`}
              alt={Math.random()}
              loading="lazy"
              style={{borderRadius: 8}}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Lightbox
        open={searchParam.has("image-preview")}
        close={() => router.back()}
        slides={contents.map((src) => ({ src }))}
        plugins={[Captions, Fullscreen, Video, Zoom, Share]}
        index={parseInt(searchParam.get("image-preview"))}
      />
    </>
  );
};

export default ImageViewer;
