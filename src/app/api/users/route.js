import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id") || false;
  const batch = request.nextUrl.searchParams.get("batch") || false;

  if (id) {
    try {
      const user = await clerkClient.users.getUser(id);

      return NextResponse.json(user);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error);
    }
  } else if (batch) {
    try {
      const users_ = await clerkClient.users.getUserList();
      const users = users_.filter(
        ({ publicMetadata }) => publicMetadata.batch == batch
      );
      console.log(users);
      return NextResponse.json(users);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error);
    }
  } else {
    try {
      const users = await clerkClient.users.getUserList();

      console.log(users);
      return NextResponse.json(users);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error);
    }
  }
}

export async function POST(request) {
  const reqData = await request.json();
  const {
    externalId,
    emailAddress,
    phoneNumber,
    username,
    password,
    firstName,
    lastName,
    ...publicMetadata
  } = reqData;

  let formattedData = {
    externalId,
    emailAddress,
    phoneNumber,
    username,
    password,
    firstName,
    lastName,
    publicMetadata,
  };
  try {
    const user = await clerkClient.users.createUser(formattedData);

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PATCH(request) {
  const reqData = await request.json();
  const {
    userId,
    firstName,
    lastName,
    username,
    password,
    primaryEmailAddressID,
    primaryPhoneNumberID,
    primaryWeb3WalletID,
    externalId,
    ...publicMetadata
  } = reqData;

  let formattedData = {
    userId,
    firstName,
    lastName,
    username,
    password,
    primaryEmailAddressID,
    primaryPhoneNumberID,
    primaryWeb3WalletID,
    externalId,
    publicMetadata,
  };
  const id = request.nextUrl.searchParams.get("id") || false;

  try {
    const user = await clerkClient.users.updateUser(id, formattedData);

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id") || false;
  try {
    const user = await clerkClient.users.deleteUser(id);

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
