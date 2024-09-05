import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "reactstrap";
import Layout from "../layout/Layout";

function EditTopicForm() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch the existing topic data
      const fetchTopic = async () => {
        try {
          const res = await fetch(`/api/topics/${id}`);
          const data = await res.json();
          if (res.ok) {
            setTitle(data.topic.title);
            setDescription(data.topic.description);
            setLoading(false);
          } else {
            console.error("Failed to fetch topic");
            // Handle error (e.g., redirect or show error message)
          }
        } catch (error) {
          console.error("Error fetching topic:", error);
          // Handle error
        }
      };
      fetchTopic();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle: title, newDescription: description }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to the home page or another page
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update topic");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Or a loading spinner
  }

  return (
    <Layout>
      <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-black border-1 mt-3 px-3 py-2"
          type="text"
          placeholder="Topic Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-black border-1 mt-1 px-3 py-2"
          type="text"
          placeholder="Topic Description"
        />
        <Button
          type="submit"
          className="removebtn bg-success fw-bold py-3 px-5 addtopic"
        >
          Update Topic
        </Button>
      </Form>
    </Layout>
  );
}

export default EditTopicForm;
