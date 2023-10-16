'use client'
import { UserProfile, useOrganization } from "@clerk/nextjs";
import {} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React, { useEffect } from "react";

export default function Page(params) {
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const elem = document.createElement("h1");
      elem.innerHTML = "New Alert";

      elem.onload = () => {
        resolve(true);
      };
      elem.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(elem);
    });
  };

  return (
    <React.Fragment>
    </React.Fragment>
  );
}
