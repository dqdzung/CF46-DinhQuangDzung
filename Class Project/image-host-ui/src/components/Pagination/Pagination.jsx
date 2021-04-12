import { Pagination } from "react-bootstrap";
import "./pagination.css";

const PaginationComp = (props) => {
	let items = [];
	for (let number = 1; number <= props.total; number++) {
		items.push(
			<Pagination.Item
				key={number}
				active={number === props.active}
				onClick={() => {
					props.onPageChange(number);
				}}
			>
				{number}
			</Pagination.Item>
		);
	}
	return (
		<div className="pagination-container">
			<Pagination className="mt-5" size="lg">
				{items}
			</Pagination>
		</div>
	);
};

export default PaginationComp;
