"use client";
import { UserProfile, useOrganization } from "@clerk/nextjs";
import {} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button, Container } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Page(params) {

  return (
    <React.Fragment>
      <Container>
        <UserProfile />
        <Button LinkComponent={Link} href="./sign-in">
          Sign In
        </Button>
      </Container>
    </React.Fragment>
  );
}
