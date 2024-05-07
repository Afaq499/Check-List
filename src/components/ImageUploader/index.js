import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ImageViewer from '../ImageViewer'; // Adjust the path accordingly

import { SetRoofTopState } from '../../redux/slices/rooftop-slice';

const ImageUploader = () => {
	const dispatch = useDispatch();
	const { formData } = useSelector((store) => store.rooftop);
	const [selectedImages, setSelectedImages] = useState([]);

	const handleImageChange = (e) => {
		const files = e.target.files;
		const imagesArray = [];


		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();

			reader.onload = (event) => {
				imagesArray.push(event.target.result);

				if (imagesArray.length === files.length) {
					setSelectedImages([...imagesArray, ...selectedImages]);
				}
			};

			reader.readAsDataURL(files[i]);
		}
	};

	useEffect(() => {
		if (selectedImages?.length) {
			dispatch(SetRoofTopState({
				field: 'formData', value: {
					...formData,
					Images: { data: selectedImages }
				}
			}));
		}
	}, [selectedImages]);

	useEffect(() => {
		if (formData?.Images?.data?.length) {
			setSelectedImages(formData?.Images?.data);
		}
	}, [formData]);

	const handleRemove = (index) => {
		const newImages = formData?.Images?.data?.filter((d, i) => i !== index);
		dispatch(SetRoofTopState({
			field: 'formData', value: {
				...formData,
				Images: { data: newImages }
			}
		}));
		setSelectedImages(newImages);
	};

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				component="label"
				style={{ marginBottom: "20px" }}
			>
				Add Images
				<input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
			</Button>
			<ImageViewer
				handleRemove={handleRemove}
				images={selectedImages}
			/>

		</div>
	);
};

export default ImageUploader;
