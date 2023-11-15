import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const fromEmailName = 'sales';
 
    const emailAddressId = 'idn_2WoCEKN81iuR25YAtMyNcvYVjrZ';
     
    const subject = 'Free tacos';
     
    const body = 'Join us via Zoom for remote Taco Tuesday!';
     
    const email = await clerkClient.emails.createEmail({
      fromEmailName,
      subject,
      body,
      emailAddressId
    });

    console.log(email);
    return NextResponse.json(email);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
