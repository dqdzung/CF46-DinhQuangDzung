import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import storage from "../firebase";
import client from "../api";
import "./create.style.css";

const Create = () => {
	const [form, setForm] = useState({ title: "", description: "" });
	const [images, setImages] = useState([]);
	const isHidden = images.length > 0;
	const toggleHiddenClass = isHidden ? "hidden" : "";

	const handleSubmit = async (e) => {
		e.preventDefault();
		const image = images[0];
		if (image && form.title) {
			try {
				const imageUrl = await uploadFile(image.file);

				const res = await client({
					url: "api/post",
					method: "POST",
					data: {
						title: form.title,
						description: form.description,
						imageUrl: imageUrl,
					},
				});

				if (res.data.success) {
					alert("Uploaded");
					setForm({ title: "", description: "" });
					setImages([]);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleFormChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
	};

	const uploadFile = (file) => {
		return new Promise((resolve, reject) => {
			const uploadTask = storage.ref().child(file.name).put(file);

			const onProgress = () => {};
			const onError = (err) => reject(err);
			const onSuccess = () => {
				uploadTask.snapshot.ref
					.getDownloadURL()
					.then((downloadURL) => resolve(downloadURL));
			};

			uploadTask.on("state_changed", onProgress, onError, onSuccess);
		});
	};

	const onImageChange = (imageList, addUpdateIndex) => {
		setImages(imageList);
	};

	return (
		<div className="create-post">
			<Row>
				<Col
					xs="12"
					md="4"
					className="d-flex justify-content-center align-items-center"
				>
					<ImageUploading
						value={images}
						maxNumber={1}
						onChange={onImageChange}
						dataURLKey="data_url"
					>
						{({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
							return (
								<div className="upload-wrapper">
									<Button className={toggleHiddenClass} onClick={onImageUpload}>
										Upload image
									</Button>
									{imageList.map((image, index) => {
										return (
											<div key={index} className="image-item">
												<div className="image-wrapper" onClick={onImageUpdate}>
													<img src={image.data_url} alt="" width="100%" />
												</div>
												<span className="remove-btn" onClick={onImageRemove}>
													X
												</span>
											</div>
										);
									})}
								</div>
							);
						}}
					</ImageUploading>
				</Col>
				<Col xs="12" md="8">
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								placeholder="Enter title"
								value={form.title}
								name="title"
								onChange={handleFormChange}
							/>
						</Form.Group>
						<Form.Group controlId="textarea">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={form.description}
								name="description"
								onChange={handleFormChange}
							/>
						</Form.Group>
						<Button className="mt-4" variant="primary" type="submit" block>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default Create;
