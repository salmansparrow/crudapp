import Layout from "@/component/layout/Layout";
import { useState } from "react";
import { Button, Form } from "reactstrap";
import { useRouter } from "next/router";

function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    try {
      const res = await fetch("/api/topics/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create topic");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Layout>
      <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border-black border-1 mt-3 px-3 py-2"
          type="text"
          placeholder="Topic Title"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border-black border-1 mt-1 px-3 py-2"
          type="text"
          placeholder="Topic Description"
        />

        <Button
          type="submit"
          className="removebtn bg-success fw-bold py-3 px-5 addtopic"
        >
          Add Topic
        </Button>
      </Form>
    </Layout>
  );
}

export default AddTopic;
