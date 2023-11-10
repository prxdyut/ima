"use client";
import React, { createContext, useState } from "react";
export const ModalContext = createContext();

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IconButton, Typography } from "@mui/material";
import { CancelIcon, CloseIcon } from "./icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalContextProvider = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searcParams = useSearchParams();
  const closeButton = (
    <IconButton
      sx={{ position: "absolute", top: "6px", right: "6px" }}
      onClick={() => router.back()}
    >
      <CloseIcon fontSize="large" />
    </IconButton>
  );

  const [title, setTitle] = useState();
  const [closeIcon, setCloseIcon] = useState(closeButton);
  const [modal, setModal] = useState(false);
  const [modalId, setmodalId] = useState(
    `${Math.ceil(Math.random() * 100000)}`
  );

  const handleClose = () => {
    router.back();
    setModal(false);
  };

  const createModal = (body, title = "", noClose = false) => {
    setModal(body);
    setTitle(title);
    if (noClose) {
      setCloseIcon(false);
    } else {
      setCloseIcon(closeButton);
    }
    router.push(pathname + "?modalId=" + modalId, {scroll: false});
  };

  return (
    <ModalContext.Provider value={createModal}>
      {props.children}

      <Dialog
        open={searcParams.get("modalId") == modalId}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          Boolean(closeIcon) ? handleClose() : null;
        }}
        sx={{minWidth:'50vw'}}
      >
        <DialogTitle>
          {title}
          {closeIcon}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>{modal}</DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
