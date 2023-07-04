import mongoose, { connect } from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }
  try {
    await connect(process.env.MONGODB_URI, {
      dbName: "social-media-management",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("mongodb is now connected");
  } catch (error) {
    console.log("the error while connecting mongodb: ", error);
  }
};
