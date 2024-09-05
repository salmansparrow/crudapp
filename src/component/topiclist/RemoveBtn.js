// components/RemoveBtn.js
import { useRouter } from "next/router";
import { HiOutlineTrash } from "react-icons/hi";
import { Button } from "reactstrap";

function RemoveBtn({ topicId, onRemove }) {
  const router = useRouter();

  const handleRemove = async () => {
    if (confirm("Are you sure you want to delete this topic?")) {
      try {
        const res = await fetch(`/api/topics/${topicId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          onRemove(topicId);
          alert("Topic deleted successfully!");
        } else {
          const errorData = await res.json();
          alert(`Error: ${errorData.message || "Failed to delete topic"}`);
        }
      } catch (error) {
        console.log("Error deleting topic", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Button className="text-danger removebtn" onClick={handleRemove}>
      <HiOutlineTrash size={24} />
    </Button>
  );
}

export default RemoveBtn;
