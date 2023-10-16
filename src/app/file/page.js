"use client";
import useSWR from "swr";
import { Image } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import useSWRMutation from "swr/mutation";

export default function UploadComponent() {
  const fetcher = (path) => fetch(path).then((res) => res.json());

  const Images = () => {
    const { data } = useSWR("/api/documents", fetcher);
    return data?.map((image) => <S3Image Key={image.Key} />);
  };

  const S3Image = ({ Key }) => {
    const { data } = useSWR(`/api/documents/${Key}`, fetcher);
    return <Image src={data.src} />;
  };

  async function uploadDocuments(url, { arg }) {
    const body = new FormData();
    arg.files.forEach((file) => {
      body.append("file", file, file.name);
    });

    const response = await fetch(url, { method: "POST", body });
    return await response.json();
  }

  function ImagePicker() {
    // when uploading a document, there seem to be a slight delay, so wait ~1s
    // before refreshing the list of documents `mutate("/api/documents")`.
    const { trigger } = useSWRMutation("/api/documents", uploadDocuments);

    return (
      <Dropzone onDrop={(files) => trigger({ files })}>{/* {...} */}</Dropzone>
    );
  }

  return <ImagePicker />;
}
