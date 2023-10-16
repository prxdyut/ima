import mongoose from "mongoose";

const uri =
  "mongodb+srv://pradyut:97s3ZIC8ujuO3lyM@cluster0.vux1ppq.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "ima",
    });
    console.log("DB Connected");
  } catch (err) {
    console.log("There's an error", err);
  }
};
