import { useState, useEffect } from "react";
import { Col, Image } from "react-bootstrap";
import client from "../api";

import CommentContainer from "../components/CommentContainer/CommentContainer";

const Detail = () => {
	const [detail, setDetail] = useState({});
	const [comments, setComments] = useState([]);

	const postId = window.location.pathname.split("/").pop();

	const fetchPostDetail = async () => {
		try {
			const res = await client({
				url: `api/post/${postId}`,
				method: "GET",
			});

			if (res.data.success) {
				// console.log(res.data.data.comments);
				setDetail(res.data.data);
				setComments(res.data.data.comments);
				return;
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchPostDetail();
	}, []);

	return (
		<div className="d-flex mt-3">
			<Col xs={6} md={5}>
				<Image src={detail.imageUrl} fluid />
			</Col>
			<Col xs={6} md={5}>
				<CommentContainer comments={comments}></CommentContainer>
			</Col>
		</div>
	);
};

export default Detail;
