"use client";

import { Dropzone } from "@mantine/dropzone";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Grow,
  IconButton,
  Modal,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { useDebounce } from "@uidotdev/usehooks";
import { Close } from "@mui/icons-material";

export default function UploadComponent() {
  const [files, setFiles] = useState({ files: [] });

  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const searchParams = useSearchParams();
  const smallScreen = useMediaQuery("(max-width:768px)");
  const open = searchParams.has("uploads");
  const { trigger } = useSWRMutation("/api/documents", uploadDocuments);
  const handleClose = () => router.back();

  const style = {
    position: "absolute",
    width: smallScreen ? "100vw" : "75vw",
    height: smallScreen ? "100vh" : "50vh",
    bgcolor: "background.paper",
    boxShadow: 12,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
  };

  async function uploadDocuments(url, { arg }) {
    setUploading(true);
    const body = new FormData();
    arg.files.forEach((file) => {
      body.append("file", file, file.name);
    });

    const response = await fetch(url, { method: "POST", body }).then((res) =>
      res.json()
    );

    setImages([...images, ...(await response)]);
    setFiles({ files: [] });
    setPreview([]);
    setUploading(false);
    router.back();
    return await response;
  }

  useEffect(() => {
    let filesArr = [];
    files.files.map((file, index) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        filesArr.push(reader.result);
        setPreview(filesArr);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    });
    filesArr = [];
  }, [files]);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        LinkComponent={Link}
        href={pathname + "?" + params.toString() + "&uploads"}
      >
        {`Upload${!(images.length == 0) ? "s" : ""} (${images.length})`}
      </Button>
      <Modal
        open={open}
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
                    Upload Files
                  </Typography>
                </Toolbar>
              </AppBar>
              {!uploading ? (
                <Box
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <input
                    type="file"
                    id="uploadFile"
                    style={{ display: "none" }}
                    multiple
                    onChange={(e) =>
                      setFiles({
                        files: [
                          ...files.files,
                          ...Object.keys(e.target.files).map(
                            (file) => e.target.files[file]
                          ),
                        ],
                      })
                    }
                  />
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        document.getElementById("uploadFile").click()
                      }
                    >
                      + Select Files
                    </Button>
                  </Box>
                  <Stack spacing={2} sx={{ flexGrow: 1, my: 2 }}>
                    <Divider textAlign="left">Preview</Divider>
                    {preview.map((file) => (
                      <Image key={file} height={56} width={56} src={file} />
                    ))}
                    <Divider textAlign="left">
        {`Upload${!(images.length == 0) ? "s" : ""} (${images.length})`}</Divider>
                    {images.map((key) => (
                      <Image
                        key={key}
                        height={56}
                        width={56}
                        src={`https://pradyut-test-bucket.s3.amazonaws.com/${key}`}
                      />
                    ))}
                  </Stack>
                  <Button
                    onClick={() => {
                      uploading ? null : trigger(files);
                    }}
                    variant="contained"
                    fullWidth
                    sx={{ position: "sticky", bottom: "0" }}
                  >
                    {uploading ? "Uploading" : "Upload"}
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Box>
          </Box>
        </Slide>
      </Modal>
    </React.Fragment>
  );
}
