"use client";
import UploadComponent from "../../components/image-uploader";

export default function Page(params) {
  return (
    <UploadComponent
      onChange={console.log}
      value={[]}
      slug="new"
      label="New File"
    />
  );
}
