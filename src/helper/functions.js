import { useContext } from "react";
import { MathsIcon, PhysicsIcon, ChemistryIcon } from "./icons";
import { ModalContext } from "./modal-context";
import moment from 'moment'

export function getSubjectIcon(sub, params = { height: 24, width: 24 }) {
  return (
    (sub == "ma" && <MathsIcon {...params} />) ||
    (sub == "ph" && <PhysicsIcon {...params} />) ||
    (sub == "ch" && <ChemistryIcon {...params} />)
  );
}

export function getSubjectName(sub) {
  return (
    (sub == "ma" && "Maths") ||
    (sub == "ph" && "Physics") ||
    (sub == "ch" && "Chemistry")
  );
}

export function checkPathMatch(pathname, match) {
  const parts = pathname.split("/");
  const available = parts.includes(match);
  return available;
}

export function getFormattedDate(date) {
  return new Date(date).toDateString();
}

export function getFormattedName(user) {
  return (user?.firstName || "") + " " + (user?.lastName || "");
}

export function getFormattedDateShort(date) {
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();

  return monthNames[monthIndex] + " " + day;
}

export function getFormattedTime(date) {
  const Date_ = new Date(date).toString();
  return moment(Date_).format("HH:mm A");
}

export const subjects = [
  { label: "English", value: "en" },
  { label: "Mathematics", value: "ma" },
  { label: "Physics", value: "ph" },
  { label: "Chemistry", value: "ch" },
  { label: "Biology", value: "bi" },
  { label: "History", value: "hi" },
  { label: "Geography", value: "ge" },
  { label: "Civics", value: "ci" },
  { label: "Economics", value: "ec" },
  { label: "Political Science", value: "po" },
  { label: "Accountancy", value: "ac" },
  { label: "Business Studies", value: "bu" },
  { label: "Home Economics", value: "he" },
  { label: "Computer Science", value: "co" },
  { label: "Art", value: "ar" },
  { label: "Music", value: "mu" },
  { label: "Dance", value: "da" },
  { label: "Theatre", value: "th" },
  { label: "Agriculture", value: "ag" },
  { label: "Vocational Training", value: "vo" },
  { label: "Industrial Arts", value: "in" },
  { label: "Library Science", value: "li" },
  { label: "Nursing", value: "nu" },
  { label: "Physical Education", value: "pe" },
  { label: "Social Studies", value: "so" },
  { label: "Work and Family Studies", value: "wf" },
];

export const fileFormats = [
  { value: "pdf", label: "Adobe Portable Document Format" },
  { value: "zip", label: "Compressed archive" },
  { value: "rar", label: "Compressed archive" },
  { value: "jpeg", label: "Joint Photographic Experts Group" },
  { value: "jpg", label: "Joint Photographic Experts Group" },
  { value: "png", label: "Portable Network Graphics" },
  { value: "mp3", label: "MPEG-1 Audio Layer 3" },
  { value: "wav", label: "Waveform Audio File Format" },
  { value: "mp4", label: "MPEG-4 Part 14" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other" },
];
