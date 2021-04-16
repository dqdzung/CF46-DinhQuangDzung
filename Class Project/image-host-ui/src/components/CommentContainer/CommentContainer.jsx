import { AuthContext } from "../../App";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import client from "../../api";
import "./commentContainer.css";

const CommentContainer = ({ comments }) => {
	const { user } = useContext(AuthContext);
	const [newComment, setNewComment] = useState("");

	const history = useHistory();

	const renderComments = () => {
		if (!comments.length) return <div>No comments...</div>;
		return comments.map((comment) => (
			<div key={comment._id}>
				{comment.createdBy.email}: {comment.content}
			</div>
		));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const postId = window.location.pathname.split("/").pop();

		try {
			const res = await client({
				url: "api/comment",
				method: "POST",
				data: {
					content: newComment,
					post: postId,
				},
			});
			if (res.data.success) {
				clearInput();
				history.go(0);
			}
		} catch (err) {
			return err.message;
		}
	};

	const handleOnChange = (e) => {
		setNewComment(e.target.value);
	};

	const clearInput = () => {
		setNewComment("");
	};

	return (
		<div className="container">
			<div className="comment-list">{renderComments()}</div>
			{user && (
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formComment" className="d-flex mt-3">
						<Form.Control
							type="comment"
							placeholder="Enter comment..."
							value={newComment}
							onChange={handleOnChange}
						/>
						<Button variant="primary" type="submit">
							Comment
						</Button>
					</Form.Group>
				</Form>
			)}
		</div>
	);
};

export default CommentContainer;
