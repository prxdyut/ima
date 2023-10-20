import { NextRequest, NextResponse } from "next/server";

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(request) {
  const key = request.nextUrl.searchParams.get("key");

  if (key) {
    await s3.send(new ListObjectsCommand({ Bucket }));
    return NextResponse.json({
      src: `https://pradyut-test-bucket.s3.amazonaws.com/${key}`,
    });
  }

  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}

export async function POST(request) {
  const formData = await request.formData();
  const files = formData.getAll("file");

  const response = await Promise.all(
    files.map(async (file, index) => {
      const fileNameSplit = file.name.split(".");
      const fileExtention = fileNameSplit[fileNameSplit.length - 1];
      const fileName = `refdc/fecds/fecds/${index}-${Math.ceil(
        Math.random() * 10000
      )}.${fileExtention}`;

      const Body = await file.arrayBuffer();
      s3.send(new PutObjectCommand({ Bucket, Key: fileName, Body }));

      return fileName;
    })
  );

  return NextResponse.json(response);
}
