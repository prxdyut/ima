import mongoose from "mongoose";

const uri =
  "mongodb+srv://admin:Psr3BZ9sUx2EO2EC@cluster0.vux1ppq.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, { dbName: "ima" });
    console.log("DB Connected");
  } catch (err) {
    console.log("There's an error", err);
  }
};