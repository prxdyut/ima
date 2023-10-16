"use client";
import { UserProfile, useOrganization } from "@clerk/nextjs";
import {} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Page(params) {
  return (
    <React.Fragment>
      <Typography>Admin Page</Typography>
      <Link href={'/admin'}>Admin</Link>
      <Link href={'/teacher'}>Teacher</Link>
      <Link href={'/student'}>Student</Link>
      <Link href={'/parent'}>Parent</Link>
    </React.Fragment>
  );
}
