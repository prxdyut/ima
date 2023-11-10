import React from "react";
import {
  AssignmentOutlined,
  ReceiptLongOutlined,
  QuestionAnswerOutlined,
  EventNoteOutlined,
  MenuBookOutlined,
  LocalLibraryOutlined,
  Logout,
  Edit,
  Delete,
  Cancel,
  Close,
  Send,
  Refresh,
  Upload,
} from "@mui/icons-material";

import { TbAtom, TbMathSymbols, TbVaccineBottle } from "react-icons/tb";
import { SlChemistry } from "react-icons/sl";

export function AssignmentIcon(params) {
  return <AssignmentOutlined {...params} />;
}

export function TestIcon(params) {
  return <ReceiptLongOutlined {...params} />;
}

export function DoubtIcon(params) {
  return <QuestionAnswerOutlined {...params} />;
}

export function ScheduleIcon(params) {
  return <EventNoteOutlined {...params} />;
}

export function LibraryIcon(params) {
  return <MenuBookOutlined {...params} />;
}

export function AcademicsIcon(params) {
  return <LocalLibraryOutlined {...params} />;
}

export function LogoutIcon(params) {
  return <Logout {...params} />;
}

export function CancelIcon(params) {
  return <Cancel {...params} />;
}

// Subjects
export function MathsIcon(params) {
  return <TbMathSymbols {...params} />;
}

export function PhysicsIcon(params) {
  return <TbAtom />;
}

export function ChemistryIcon(params) {
  return <TbVaccineBottle />;
}

// Actions
export function EditIcon(params) {
  return <Edit {...params} />;
}

export function DeleteIcon(params) {
  return <Delete {...params} />;
}
export function CloseIcon(params) {
  return <Close {...params} />;
}
export function SendIcon(params) {
  return <Send {...params} />;
}
export function RefreshIcon(params) {
  return <Refresh {...params} />;
}
export function UploadIcon(params) {
  return <Upload {...params} />;
}