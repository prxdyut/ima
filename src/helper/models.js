const { Schema, default: mongoose } = require("mongoose");
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  name: { first: String, last: String },
  role: String,
  batch: { type: ObjectId, ref: "" },
  ref_id: String,
  card_id: String,
  meta_data: Object,
});

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
  teacher: { type: ObjectId, ref: "" },
  batch: { type: ObjectId, ref: "" },
  submissions: [
    {
      content: String,
      files: Array,
      created: Date,
      remarks: String,
      student: { type: ObjectId, ref: "" },
    },
  ],
});

const DoubtSchema = new Schema({
  content: String,
  files: Array,
  created: Date,
  topic: String,
  user: { type: ObjectId, ref: "" },
  batch: { type: ObjectId, ref: "" },
  responses: [
    {
      content: String,
      files: Array,
      created: Date,
      user: { type: ObjectId, ref: "" },
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
  batch: { type: ObjectId, ref: "" },
  scores: [{ user: { type: ObjectId, ref: "" }, obtained: Number }],
});

const ScheduleSchema = new Schema({
  title: String,
  timing: { in: String, out: String },
  date: Date,
  teacher: { type: ObjectId, ref: "" },
  batch: { type: ObjectId, ref: "" },
});

const FileSchema = new Schema({
  title: String,
  url: String,
  type: String,
  created: Date,
  batch: { type: ObjectId, ref: "" },
  teacher: { type: ObjectId, ref: "" },
});

const RemarkSchema = new Schema({
  remarks: [{ content: String, created: Date }],
  student: { type: ObjectId, ref: "" },
  teacher: { type: ObjectId, ref: "" },
});

const AttendanceSchema = new Schema({
  user: { type: ObjectId, ref: "" },
  punches: [Date],
});

const LogSchema = new Schema({
  user: { type: ObjectId, ref: "" },
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
export const schedules =
  mongoose.models.schedules || mongoose.model("schedules", ScheduleSchema);
export const Logs = mongoose.models.logs || mongoose.model("logs", LogSchema);
