import React from "react";
import PropTypes from "prop-types";
import LangIcon from "../LangIcon/LangIcon.component.jsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	List,
	ListItem
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.spacing(30),
		height: "auto",
		margin: theme.spacing(1),
		position: "relative"
	},
	cardMedia: {
		minHeight: 200
	},
	relativeContainer: {
		position: "relative"
	},
	pointsContainer: {
		border: `1px solid ${theme.palette.common.white}`,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(0.5)
	},
	flexContainer: {
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "evenly-spaced"
	},
	list: {
		width: "auto",
		padding: "0% 4% 4% 4%"
	},
	parent: {
		position: "relative"
	},
	overImg: {
		position: "absolute",
		minHeight: 50,
		minWidth: 50,
		top: 10,
		left: 10
	}
}));

function UserCard({ avatarUrl, username, langArray, point, index, ...props }) {
	let classes = useStyles();

	const imageUrl = avatarUrl || `https://robohash.org/${username}`;

	//capitalize first word
	const newLangArray = langArray.map(
		lang => lang[0].toUpperCase() + lang.slice(1)
	);

	//top3 function
	const topThree = index => {
		switch (index) {
			case 0:
				return "/images/gold.png";
			case 1:
				return "/images/silver.png";
			case 2:
				return "/images/bronze.png";
			default:
				break;
		}
	};

	return (
		<Card className={classes.root}>
			<div className={classes.parent}>
				<CardMedia
					className={classes.cardMedia}
					image={imageUrl}
					component="img"
					onError={e => {
						e.target.src = `https://robohash.org/${username}`;
					}}
				/>
				<CardMedia className={classes.overImg} image={topThree(index)} />
			</div>

			{/* {topThree()} */}
			<CardContent>
				<Typography align="center" color="secondary" variant="h6">
					{username}
				</Typography>
				<div className={classes.pointsContainer}>
					<Typography align="center" variant="body1">
						{point} {point === 1 ? "Point" : "Points"}
					</Typography>
				</div>
			</CardContent>

			<List className={classes.flexContainer}>
				{newLangArray.map(lang => {
					return (
						<ListItem key={username + lang} className={classes.list}>
							<LangIcon langName={lang} />
						</ListItem>
					);
				})}
			</List>
		</Card>
	);
}

UserCard.propTypes = {
	username: PropTypes.string.isRequired,
	avatarUrl: PropTypes.string.isRequired,
	langArray: PropTypes.array.isRequired,
	point: PropTypes.number.isRequired
};

export default React.memo(UserCard);
