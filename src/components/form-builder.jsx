"use client";
import {} from "@clerk/nextjs";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  NoSsr,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "suneditor/dist/css/suneditor.min.css";
import ImageUploader from "@/components/image-uploader";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import { ModalContext } from "@/helper/modal-context";
import BatchSelect from "./batch-select";

const FormBuilder = ({
  formFields,
  onSubmit = () => {},
  uri,
  type = "POST",
  exitAfterSubmit,
  submitLabel = "Submit",
  submitNode = <Typography sx={{ p: 4 }}>Updated Successfully</Typography>,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createModal = useContext(ModalContext);

  let defaultData = {};
  formFields.map((a) => (defaultData[a.name] = a?.value || null));

  const [data, updateData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  console.log(data);
  const submit = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: type,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(uri, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        onSubmit(result);
        if (exitAfterSubmit) {
          router.back();
          router.refresh();
          createModal(submitNode, null, true);
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          p: 2,
          // mb:5,
          "& .ql-editor": { height: "8rem" },
          "& .quill > div": {
            borderRadius: 1,
            "&.ql-toolbar": {
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            },
            "&.ql-container": {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          },
        }}
      >
        {formFields.map(
          ({ label, type, name, options }, i) =>
            (type == "date" && (
              <LocalizationProvider dateAdapter={AdapterDayjs} key={i}>
                <DatePicker
                  label={label}
                  value={dayjs(data[name] || new Date().toISOString())}
                  onChange={(e) => updateData({ ...data, [name]: new Date(e) })}
                />
              </LocalizationProvider>
            )) ||
            (type == "time" && (
              <LocalizationProvider dateAdapter={AdapterDayjs} key={i}>
                <TimePicker
                  label={label}
                  value={dayjs(data[name] || new Date().toISOString())}
                  onChange={(e) => updateData({ ...data, [name]: new Date(e) })}
                />
              </LocalizationProvider>
            )) ||
            (type == "short" && (
              <TextField
                key={searchParams.get("modalId") + i}
                label={label}
                value={data[name]}
                onChange={(e) =>
                  updateData({ ...data, [name]: e.target.value })
                }
              />
            )) ||
            (type == "num" && (
              <TextField
                key={searchParams.get("modalId") + i}
                label={label}
                value={data[name]}
                onChange={(e) =>
                  updateData({ ...data, [name]: parseInt(e.target.value) })
                }
              />
            )) ||
            (type == "text" && (
              <Typography key={Math.random()}>{label}</Typography>
            )) ||
            (type == "batch" && (
              <BatchSelect
                value={data[name]}
                onChange={(e) => updateData({ ...data, [name]: e.target.value })}
              />
            )) ||
            (type == "long" && (
              <NoSsr key={searchParams.get("modalId") + i}>
                <ReactQuill
                  theme="snow"
                  placeholder={label}
                  value={data[name]}
                  onChange={(e) => updateData({ ...data, [name]: e })}
                />
              </NoSsr>
            )) ||
            (type == "file" && (
              <React.Fragment key={searchParams.get("modalId") + i}>
                <ImageUploader
                  onChange={(e) => updateData({ ...data, [name]: e })}
                  value={data[name] == null ? [] : data[name]}
                  slug={name}
                  label={label}
                />
              </React.Fragment>
            )) ||
            (type == "option" && (
              <FormControl fullWidth key={i}>
                <InputLabel>{label}</InputLabel>
                <Select
                  label={label}
                  value={data[name]}
                  onChange={(e) =>
                    updateData({ ...data, [name]: e.target.value })
                  }
                >
                  <MenuItem value={null} disabled selected>
                    &nbsp;
                  </MenuItem>
                  {options.map((option, idx) => (
                    <MenuItem value={option.value} key={idx}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))
        )}
      </Stack>
      <Box
        sx={{ position: "sticky", bottom: "0", bgcolor: "background.paper" }}
      >
        <Divider sx={{ borderBottomWidth: 2 }} />
        <Stack
          spacing={2}
          display={"flex"}
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ p: 2 }}
        >
          <Button variant="outlined" onClick={() => router.back()}>
            Cancel
          </Button>
          <LoadingButton loading={loading} variant="contained" onClick={submit}>
            {submitLabel}
          </LoadingButton>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default FormBuilder;
