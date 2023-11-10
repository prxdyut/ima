"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Collapse,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  NoSsr,
  Paper,
  Stack,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Assignment,
  CalendarToday,
  ExpandMore,
  Help,
  HomeMax,
  Inbox,
  LibraryAdd,
  LibraryMusic,
  Logout,
  Menu as MenuIcon,
  MoreVert,
  ReceiptLong,
  Schedule,
  Search as SearchIcon,
  Timelapse,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Section from "@/components/section";
import { UserButton } from "@clerk/nextjs";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import SunEditor from "suneditor-react";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ReactViewer = dynamic(() => import("react-viewer"), { ssr: false });

import "suneditor/dist/css/suneditor.min.css";
import Link from "next/link";
import { TransitionGroup } from "react-transition-group";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ImageViewer = ({ contents = [], cols = 3 }) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  return (
    <>
      <NoSsr>
        <style>
          {`.yarl__container {
    background-color: rgb(0 0 0 / 80%);}`}
        </style>
      </NoSsr>
      <ImageList sx={{ width: "100%" }} cols={cols}>
        {contents.map((item, idx) => (
          <ImageListItem
            key={idx}
            onClick={() =>
              router.push(pathname + "?image-preview=" + idx, { scroll: false })
            }
          >
            <img
              srcSet={`${item}`}
              src={`${item}`}
              alt={Math.random()}
              loading="lazy"
              style={{borderRadius: 8}}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Lightbox
        open={searchParam.has("image-preview")}
        close={() => router.back()}
        slides={contents.map((src) => ({ src }))}
        plugins={[Captions, Fullscreen, Video, Zoom, Share]}
        index={parseInt(searchParam.get("image-preview"))}
      />
    </>
  );
};

export default ImageViewer;
