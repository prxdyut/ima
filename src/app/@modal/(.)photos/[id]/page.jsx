"use client";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Dialog,
  Grow,
  IconButton,
  Modal,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default function PhotoModal() {
  const router = useRouter();
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(true);
  const debouncedOpen = useDebounce(open, 500);
  const smallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (!debouncedOpen) {
      router.back();
    }
  }, [debouncedOpen]);

  const style = {
    position: "absolute",
    maxWidth: smallScreen? "100vw": "90vw",
    minHeight: smallScreen? "100vh" : "50vh",
    bgcolor: "background.paper",
    boxShadow: 12,
    borderRadius: 2,
  };

  console.log(smallScreen);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <React.Fragment>
      {smallScreen ? (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Slide in={open} direction="up">
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={style}>
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <Close />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                      save
                    </Button>
                  </Toolbar>
                </AppBar>
                <Box sx={{ p: 2 }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Slide>
        </Modal>
      ) : (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Grow in={open} direction="up">
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={style}>
                <AppBar
                  position="sticky"
                  sx={{
                    borderRadius: 2,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <Toolbar>
                    {/* <Typography>{matches}</Typography> */}
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onClick={handleClose} sx={{ mr: -1 }}>
                      <Close sx={{ color: "primary.contrastText" }} />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <Box sx={{ p: 2 }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grow>
        </Modal>
      )}
    </React.Fragment>
  );
}
