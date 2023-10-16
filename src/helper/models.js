const { Schema, default: mongoose } = require("mongoose");
const { ObjectId } = Schema.Types;

const BatchSchema = new Schema({
  grade: String,
  section: String,
  meta_data: Object,
});

const AssignmentSchema = new Schema({
  topic: String,
  content: String,
  subject: String,
  files: Array,
  created: Date,
  expiry: Date,
  teacher: String,
  batch: { type: ObjectId, ref: "batches" },
  submissions: [
    {
      content: String,
      files: Array,
      created: Date,
      remarks: String,
      student: String,
    },
  ],
});

const DoubtSchema = new Schema({
  content: String,
  files: Array,
  created: Date,
  topic: String,
  user: String,
  batch: { type: ObjectId, ref: "batches" },
  responses: [
    {
      content: String,
      files: Array,
      created: Date,
      user: String,
    },
  ],
});

const TestSchema = new Schema({
  created: Date,
  title: String,
  subject: String,
  questions: Array,
  answers: Array,
  total: Number,
  batch: { type: ObjectId, ref: "batches" },
  scores: [{ user: String, obtained: Number }],
});

const ScheduleSchema = new Schema({
  lectures: [{ title: String, in: String, out: String }],
  date: Date,
  teacher: String,
  batch: { type: ObjectId, ref: "batches" },
});

const FileSchema = new Schema({
  title: String,
  url: String,
  type: String,
  created: Date,
  batch: { type: ObjectId, ref: "batches" },
  teacher: String,
});

const RemarkSchema = new Schema({
  remarks: [{ content: String, created: Date }],
  student: String,
  teacher: String,
});

const AttendanceSchema = new Schema({
  user: String,
  punches: [Date],
});

const LogSchema = new Schema({
  user: String,
  action: Number,
  created: Date,
});

export const Users =
  mongoose.models.users || mongoose.model("users", UserSchema);
export const Batches =
  mongoose.models.batches || mongoose.model("batches", BatchSchema);
export const Assignments =
  mongoose.models.assignments ||
  mongoose.model("assignments", AssignmentSchema);
export const Doubts =
  mongoose.models.doubts || mongoose.model("doubts", DoubtSchema);
export const Tests =
  mongoose.models.tests || mongoose.model("tests", TestSchema);
export const Attendances =
  mongoose.models.attendances ||
  mongoose.model("attendances", AttendanceSchema);
export const Files =
  mongoose.models.files || mongoose.model("files", FileSchema);
export const Remarks =
  mongoose.models.remarks || mongoose.model("remarks", RemarkSchema);
export const Schedules =
  mongoose.models.schedules || mongoose.model("schedules", ScheduleSchema);
export const Logs = mongoose.models.logs || mongoose.model("logs", LogSchema);
