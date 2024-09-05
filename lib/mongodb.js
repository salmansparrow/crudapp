import mongoose from "mongoose";

async function ConnectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Connection Failed", error);
  }
}

export default ConnectToMongoDB;
