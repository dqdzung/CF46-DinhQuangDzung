import { Card, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function PostContainer(props) {
	const history = useHistory();

	const toDetail = (id) => {
		history.push(`/post/${id}`);
	};

	return (
		<Container>
			<Card
				style={{ width: "100%" }}
				onClick={() => {
					toDetail(props.postId);
				}}
			>
				<Card.Img variant="top" src={props.imageUrl} />
				<Card.Body>
					<Card.Title>{props.title}</Card.Title>
					<Card.Text>{props.description}</Card.Text>
					<Card.Text>{props.createdBy}</Card.Text>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default PostContainer;
