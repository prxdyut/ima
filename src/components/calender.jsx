"use client";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

const ReactViewer = dynamic(() => import("react-viewer"), { ssr: false });

import "suneditor/dist/css/suneditor.min.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const UICalender = ({  onChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState()
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={value} onChange={(newdate) => {setValue(new Date(newdate.$d).toDateString()); onChange(newdate) }} />
    </LocalizationProvider>
  );
};

export default UICalender;
