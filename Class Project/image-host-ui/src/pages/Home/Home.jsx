import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PostContainer from "../../components/PostContainer/PostContainer";
import PaginationComp from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import client from "../../api";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activePage, setActivePage] = useState(1);
	const [total, setTotal] = useState(0);

	//useEffect is a combination of componentDidMount() and componentDidUpdate()
	//syntax: useEffect(arg1, arg2)
	//  arg1: function to run
	//  arg2: dependency to run the function
	// useEffect runs after render() once, and then only run if there's change in the dependency array

	const fetchPosts = async (page = 1, pageSize = 4) => {
		setLoading(true);
		try {
			const res = await client({
				url: "api/post",
				method: "GET",
				params: {
					page: page,
					pageSize: pageSize,
				},
			});
			setLoading(false);
			// console.log(res.data);
			if (res.data.success) {
				setPosts(res.data.data.data);
				const totalPage = res.data.data.total;
				setTotal((totalPage + pageSize - 1) / pageSize);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// console.log("Run effect");
		fetchPosts(activePage);
	}, [activePage]);

	const renderPosts = () => {
		if (loading) return <Loading></Loading>;

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

	const handlePageChange = (pageNumber) => {
		setActivePage(pageNumber);
	};

	return (
		<div>
			<Row className="mt-4">{renderPosts()}</Row>
			<PaginationComp
				active={activePage}
				total={total}
				onPageChange={handlePageChange}
			></PaginationComp>
		</div>
	);
};

export default Home;
