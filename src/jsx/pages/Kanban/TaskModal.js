import { Modal, Button, Form, ListGroup } from "react-bootstrap"; // Use React Bootstrap for the modal
import React, { useState } from "react";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";
import { FaTrash } from "react-icons/fa"; // Import trash icon from react-icons

const TaskModal = ({ isOpen, onRequestClose, task }) => {
  const [description, setDescription] = useState(task?.description || ""); // Initialize with task description if available
  const [comments, setComments] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [attachmentFiles, setAttachmentFiles] = useState([]); // For storing actual file objects
  const [replyInput, setReplyInput] = useState(""); // State for replies
  const [replyToIndex, setReplyToIndex] = useState(null); // Index of the comment being replied to

  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const username = decodedToken.payload.user_type;

  const addComment = () => {
    if (comments) {
      setCommentsList((prevComments) => [
        ...prevComments,
        {
          text: comments,
          user: username,
          timestamp: new Date().toLocaleString(),
          replies: [], // Initialize replies array
        },
      ]);
      setComments("");
    }
  };

  const addReply = (index) => {
    if (replyInput) {
      const updatedComments = [...commentsList];
      updatedComments[index].replies.push({
        text: replyInput,
        user: username,
        timestamp: new Date().toLocaleString(),
      });
      setCommentsList(updatedComments);
      setReplyInput(""); // Clear reply input
      setReplyToIndex(null); // Reset the reply state
    }
  };

  const removeComment = (index) => {
    setCommentsList((prevComments) =>
      prevComments.filter((_, i) => i !== index)
    );
  };

  const removeReply = (commentIndex, replyIndex) => {
    const updatedComments = [...commentsList];
    updatedComments[commentIndex].replies = updatedComments[
      commentIndex
    ].replies.filter((_, i) => i !== replyIndex);
    setCommentsList(updatedComments);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachmentFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachmentFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const saveDescription = () => {
    console.log("Saved Description:", description);
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{task?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a more detailed description..."
            />
          </Form.Group>
          <Button variant="primary" onClick={saveDescription} className="mt-2">
            Save
          </Button>

          <hr />

          <Form.Group controlId="formComments">
            <Form.Label>Activity</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Write a comment..."
            />
            <Button variant="success" onClick={addComment} className="mt-2">
              Add Comment
            </Button>
          </Form.Group>

          <ListGroup className="mt-3">
            {commentsList.map((comment, index) => (
              <ListGroup.Item key={index}>
                <strong>{comment.user}</strong>: {comment.text} <br />
                <span style={{ fontSize: "0.8em", color: "gray" }}>
                  {comment.timestamp}
                </span>
                <Button
                  variant="link"
                  onClick={() => {
                    setReplyToIndex(index); // Set index of comment to reply to
                  }}
                >
                  Reply
                </Button>
                <Button
                  variant="link"
                  onClick={() => removeComment(index)} // Remove comment
                  className="float-end"
                  title="Remove Comment"
                >
                  <FaTrash />
                </Button>
                {/* Reply Input */}
                {replyToIndex === index && (
                  <div className="mt-2">
                    <Form.Control
                      type="text"
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="Write a reply..."
                    />
                    <Button
                      variant="info"
                      className="mt-1"
                      onClick={() => addReply(index)}
                    >
                      Submit Reply
                    </Button>
                  </div>
                )}
                {/* Display Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <ListGroup className="mt-2">
                    {comment.replies.map((reply, replyIndex) => (
                      <ListGroup.Item
                        key={replyIndex}
                        style={{ padding: "5px 10px" }}
                      >
                        <strong>{reply.user}</strong>: {reply.text} <br />
                        <span style={{ fontSize: "0.8em", color: "gray" }}>
                          {reply.timestamp}
                        </span>
                        <Button
                          variant="link"
                          onClick={() => removeReply(index, replyIndex)} // Remove reply
                          className="float-end"
                          title="Remove Reply"
                        >
                          <FaTrash />
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <hr />

          <Form.Group controlId="formAttachments">
            <Form.Label>Attachments</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              className="mb-2"
            />
            <ListGroup>
              {attachmentFiles.map((file, index) => (
                <ListGroup.Item key={index}>
                  {file.name}{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeAttachment(index)}
                    className="float-end"
                  >
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
