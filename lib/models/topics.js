import mongoose from "mongoose";
import { Schema } from "mongoose"; // Importing Schema separately
const topicSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const topic = mongoose.models.topics || mongoose.model("topics", topicSchema);

export default topic;
