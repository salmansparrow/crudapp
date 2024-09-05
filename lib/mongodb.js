import mongoose from "mongoose";

let isConnected = false; // Track the connection status

async function ConnectToMongoDB() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection Failed", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export default ConnectToMongoDB;
