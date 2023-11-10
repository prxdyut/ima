import { NextRequest, NextResponse } from "next/server";

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  const formData = await request.formData();
  const slug = request.nextUrl.searchParams.get('slug')
  const files = formData.getAll("file");

  const response = await Promise.all(
    files.map(async (file, index) => {
      const fileNameSplit = file.name.split(".");
      const fileExtention = fileNameSplit[fileNameSplit.length - 1];
      const fileName = `/${slug}/${index}-${Math.ceil(
        Math.random() * 10000
      )}.${fileExtention}`;

      const Body = await file.arrayBuffer();
      await s3.send(new PutObjectCommand({ Bucket, Key: fileName, Body }));

      return 'https://pradyut-test-bucket.s3.amazonaws.com/'+fileName;
    })
  );

  return NextResponse.json(response);
}

export async function DELETE(request) {
  const Key = request.nextUrl.searchParams.get("key");
  const bucketParams = { Bucket, Key };

  try {
    const data = await s3.send(new DeleteObjectCommand(bucketParams));
    console.log("Success. Object deleted.", data);
    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
