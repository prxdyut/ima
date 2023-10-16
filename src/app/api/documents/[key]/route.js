import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Bucket and s3: same as above
const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = process.env.AWS_REGION;

export async function GET(_, { params }) {
  const command = new GetObjectCommand({ Bucket, Key: params.key });
  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return NextResponse.json({ src });
}
