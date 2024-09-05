import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getData } from "../../../lib/api";

function TopicList() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const data = await getData("/api/topics/route"); // Adjust the endpoint path as necessary
        console.log(data);

        setTopics(data.topics); // Adjust based on your API response structure
      } catch (err) {
        setError(err.message);
      }
    }

    fetchTopics();
  }, []);

  // Function to remove a topic from the state after successful deletion

  const handleRemoveTopic = (id) => {
    setTopics(topics.filter((topic) => topic._id !== id));
  };

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {topics.length === 0 ? (
        <p>No topics available.</p>
      ) : (
        topics.map((topic) => (
          <div
            key={topic._id}
            className="p-4 bg-primary-subtle mt-3 mb-3 d-flex justify-content-between"
          >
            <div>
              <h2 className="fw-bold">{topic.title}</h2>
              <div>{topic.description}</div>
            </div>
            <div className="d-flex gap-3 align-items-start">
              <RemoveBtn topicId={topic._id} onRemove={handleRemoveTopic} />
              <Link href={`/edittopic/${topic._id}`}>
                <HiPencilAlt size={24} fill="black" />
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default TopicList;
