import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { ArrowBack, ArrowForward, CancelTwoTone } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SetRoofTopState } from '../../redux/slices/rooftop-slice';


const ImageViewer = ({ images, handleRemove }) => {
	const dispatch = useDispatch();
	const { formData } = useSelector((store) => store.rooftop);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
		console.log('Updated current index:', currentIndex);

	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		console.log('Updated current index:', currentIndex);

	};

	return (
		<>
			<Card style={{ display: images?.length ? 'flex' : 'none', justifyContent: 'flex-end' }} sx={{ maxWidth: '100%', height: 300, position: 'relative' }}>
				<Grid item style={{ position: 'absolute', right: '48%' }}>
					{currentIndex + 1}/{images.length}
				</Grid>
				<CardMedia component="img" alt={`Image ${currentIndex}`} height="300" src={images[currentIndex]} style={{ display: images?.length ? 'flex' : 'none' }} />
				<CardContent>

					<Typography variant="body2" color="textSecondary" component="div">
						<Grid item style={{ display: images?.length ? 'flex' : 'none', justifyContent: 'flex-end' }}>
							<CancelTwoTone onClick={() => handleRemove(currentIndex)} style={{ position: 'absolute', top: '5%', zIndex: 1 }} />
						</Grid>

						<Grid container justifyContent="space-between">
							<Grid item>
								<ArrowBackIcon onClick={handlePrev} style={{ position: 'absolute', top: '50%', right: '95%' }} />
							</Grid>
							<Grid item style={{ paddingRight: '20px' }}>
								<ArrowForwardIcon onClick={handleNext} style={{ position: 'absolute', top: '50%' }} />
							</Grid>
						</Grid>
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default ImageViewer;
