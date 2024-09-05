import topic from "../../../../lib/models/topics"; // Adjust the import path as necessary
import ConnectToMongoDB from "../../../../lib/mongodb";

export async function PUT(req, res) {
  if (req.method === "PUT") {
    await ConnectToMongoDB();

    // Extract the ID from the URL parameters
    const { id } = req.query;

    // Extract the updated data from the request body
    const { newTitle, newDescription } = req.body;

    // Validation: Check if the ID and updated data are provided
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    if (!newTitle && !newDescription) {
      return res.status(400).json({
        message:
          "At least one field (newTitle or newDescription) is required to update",
      });
    }

    // Perform the update operation
    const updatedTopic = await topic.findByIdAndUpdate(
      id,
      { title: newTitle, description: newDescription },
      { new: true } // Return the updated document
    );

    // Handle the case where the topic was not found
    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic Not Found" });
    }

    // Return a success response with the updated document
    return res
      .status(200)
      .json({ message: "Topic Updated", topic: updatedTopic });
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function GET(req, res) {
  if (req.method === "GET") {
    await ConnectToMongoDB();

    // Extract the ID from the URL parameters
    const { id } = req.query;

    // Validation: Check if the ID is provided
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      // Fetch the topic by ID
      const singleTopic = await topic.findById(id);

      // Handle the case where the topic was not found
      if (!singleTopic) {
        return res.status(404).json({ message: "Topic Not Found" });
      }

      // Return a success response with the found topic
      return res.status(200).json({ topic: singleTopic });
    } catch (error) {
      // Handle any errors that occurred during the database operation
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// delete api

export async function DELETE(req, res) {
  if (req.method === "DELETE") {
    await ConnectToMongoDB();

    // Extract the ID from the query parameters
    const { id } = req.query;

    // Validation: Check if the ID is provided
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      // Perform the deletion using the provided ID
      const deletedTopic = await topic.findByIdAndDelete(id);

      if (!deletedTopic) {
        return res.status(404).json({ message: "Topic Not Found" });
      }

      // Return a success message
      return res
        .status(200)
        .json({ message: "Topic Deleted Successfully", topic: deletedTopic });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Default export for the Next.js API route
export default async function handler(req, res) {
  if (req.method === "PUT") {
    return PUT(req, res);
  } else if (req.method === "GET") {
    return GET(req, res);
  } else if (req.method === "DELETE") {
    return DELETE(req, res);
  } else {
    res.setHeader("Allow", ["PUT", "GET", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
