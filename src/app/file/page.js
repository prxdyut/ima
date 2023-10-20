"use client";
import useSWR from "swr";

import { Dropzone, FileWithPath } from "@mantine/dropzone";
import useSWRMutation from "swr/mutation";
import "@mantine/dropzone/styles.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

export default function UploadComponent() {
  const [images, setImages] = useState([]);
  // const fetcher = (path) => fetch(path).then((res) => res.json());

  // const Images = () => {
  //   const { data } = useSWR("/api/documents", fetcher);
  //   return data?.map((image) => <S3Image Key={image.Key} />);
  // };

  // const S3Image = ({ Key }) => {
  //   return (
  //     <Image
  //       height={100}
  //       width={100}
  //       src={`https://pradyut-test-bucket.s3.amazonaws.com/${Key}`}
  //     />
  //   );
  // };

  async function uploadDocuments(url, { arg }) {
    const body = new FormData();
    arg.files.forEach((file) => {
      body.append("file", file, file.name);
    });

    const response = await fetch(url, { method: "POST", body }).then((res) =>
      res.json()
    );
    setImages([...images, ...(await response)]);
    return await response;
  }

  function imageExists(image_url) {
    var http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    http.send();
    console.log(http.status);
    return http.status != 404;
  }

  useEffect(() => {
    images.map((key) =>
      imageExists(`https://pradyut-test-bucket.s3.amazonaws.com/${key}`)
    );
  }, [images]);

  function ImagePicker() {
    const { trigger } = useSWRMutation("/api/documents", uploadDocuments);

    return (
      <React.Fragment>
        <input
          type="file"
          id="uploadFile"
          multiple
          onChange={(e) =>
            trigger({
              files: Object.keys(e.target.files).map(
                (file) => e.target.files[file]
              ),
            })
          }
        />
        <Button onClick={() => document.getElementById("uploadFile").click()}>
          <UploadFile />
          &nbsp; Upload
        </Button>
      </React.Fragment>
    );
  }

  return (
    <div>
      <ImagePicker />

      {images.map((key) => (
        <Image
          height={100}
          width={100}
          src={`https://pradyut-test-bucket.s3.amazonaws.com/${key}`}
        />
      ))}
    </div>
  );
}
