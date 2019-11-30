import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../Card/Card.component";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		justifyContent: "center"
	}
}));

function CarouselComponent({ data }) {
	const classes = useStyles();
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			slidesToSlide: 4 // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2 // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1 // optional, default to 1.
		}
	};
	return (
		<Carousel
			swipeable={true}
			draggable={false}
			showDots={true}
			responsive={responsive}
			ssr={true} // means to render carousel on server-side.
			infinite={true}
			// autoPlay={this.props.deviceType !== "mobile" ? true : false}
			autoPlay={false}
			autoPlaySpeed={10000000}
			keyBoardControl={true}
			customTransition="all .5"
			transitionDuration={500}
			containerClass="carousel-container"
			removeArrowOnDeviceType={[]}
			deviceType={"desktop"}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
		>
			{data.map(user => {
				return (
					<div
						className={classes.container}
						key={user._id + Math.random * 10000}
					>
						<Card
							key={user.username + user._id}
							avatarUrl={user.avatarUrl}
							username={user.userName}
							date={user.Time}
							day={user.dayNumber}
							solutionUrl={user.url}
							langName={user.langName}
							isCarousel={true}
						></Card>
					</div>
				);
			})}
		</Carousel>
	);
}

export default CarouselComponent;
