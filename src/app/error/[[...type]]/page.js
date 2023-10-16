import { Box, Link } from "@mui/material";
import React from "react";

export default function Error({ params }) {
  const errorType = params.type.join(",");
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", width: "100vw" }}>
        {errorType} <Link href={"/admin"}>Admin</Link>
        <Link href={"/teacher"}>Teacher</Link>
        <Link href={"/student"}>Student</Link>
        <Link href={"/parent"}>Parent</Link>
      </Box>
    </React.Fragment>
  );
}
