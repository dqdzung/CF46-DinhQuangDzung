import { useState, useEffect } from "react";
import { Col, Image } from "react-bootstrap";
import client from "../api";
import { useParams } from "react-router-dom";

import CommentContainer from "../components/CommentContainer/CommentContainer";

const Detail = () => {
	const [detail, setDetail] = useState({});
	const [comments, setComments] = useState([]);

	const { id } = useParams();

	const fetchPostDetail = async () => {
		try {
			const res = await client({
				url: `api/post/${id}`,
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
			<Col xs={12} md={6} className="d-flex flex-column">
				<Image src={detail.imageUrl} fluid />
				{detail.createdBy && <div>Uploaded by: {detail.createdBy.email}</div>}
			</Col>

			<Col xs={12} md={6}>
				<CommentContainer comments={comments}></CommentContainer>
			</Col>
		</div>
	);
};

export default Detail;
