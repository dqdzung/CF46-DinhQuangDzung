import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PostContainer from "../../components/PostContainer/PostContainer";
import client from "../../api";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	//useEffect is a combination of componentDidMount() and componentDidUpdate()
	//syntax: useEffect(arg1, arg2)
	//  arg1: function to run
	//  arg2: dependency to run the function
	// useEffect runs after render() once, and then only run if there's change in the dependency array

	const fetchPosts = async () => {
		setLoading(true);
		try {
			const res = await client({
				url: "api/post",
				method: "GET",
				query: {
					page: 1,
					pageSize: 4,
				},
			});
			setLoading(false);
			console.log(res.data);
			if (res.data.success) {
				setPosts(res.data.data.data);
			}
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		console.log("Run effect");
		fetchPosts();
	}, []);

	const renderPosts = () => {
		if (loading) return <div>Loading...</div>;

		if (!posts.length) return <div>No posts...</div>;

		return posts.map((post) => (
			<Col xs={12} md={3} key={post._id}>
				<PostContainer
					imageUrl={post.imageUrl}
					title={post.title}
					description={post.description}
					createdBy={post.createdBy.email}
				></PostContainer>
			</Col>
		));
	};

	return <Row className="mt-4">{renderPosts()}</Row>;
};

export default Home;
