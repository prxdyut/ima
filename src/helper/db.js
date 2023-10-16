import mongoose from "mongoose";

const uri = process.env.MONGODB_CONNECTION_URI + "?retryWrites=true&w=majority";

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
