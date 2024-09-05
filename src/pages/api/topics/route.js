import topic from "../../../../lib/models/topics";
import ConnectToMongoDB from "../../../../lib/mongodb";

export async function Post(req, res) {
  if (req.method === "POST") {
    const { title, description } = req.body;
    await ConnectToMongoDB();
    await topic.create({ title, description });
    res.status(201).json({ message: "Topic Created" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function Get(req, res) {
  if (req.method === "GET") {
    await ConnectToMongoDB();
    const topics = await topic.find(); // Ensure 'topic' is used here, not 'topics'
    res.status(200).json({ topics });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function Delete(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query; // Assuming the ID is passed as a query parameter
    await ConnectToMongoDB();
    const deletTopic = await topic.findByIdAndDelete(id);

    if (!deletTopic) {
      return res.status(404).json({ message: "Topic Not Found" });
    }
    res.status(200).json({ message: "Topic Deleted", topic: deletTopic });
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`METHOD ${req.method} Not Allowed`);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    return Post(req, res);
  } else if (req.method === "GET") {
    return Get(req, res);
  } else if (req.method === "DELETE") {
    return Delete(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
