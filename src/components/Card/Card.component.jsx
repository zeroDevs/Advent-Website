import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
	red,
	blue,
	purple,
	yellow,
	pink,
	brown
} from "@material-ui/core/colors";
import {
	Card,
	CardMedia,
	CardContent,
	Button,
	CardHeader,
	Avatar,
	Typography
} from "@material-ui/core";

import UserRating from "../UserRating/UserRating.component";

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.spacing(30),
		height: theme.spacing(52),
		margin: theme.spacing(1),
		position: "relative"
	},
	cardMedia: {
		minHeight: 200
	},
	relativeContainer: {
		position: "relative"
	},
	badgeContainer: {
		position: "absolute",
		top: theme.spacing(2),
		left: theme.spacing(1)
	},
	langBackgroundColor: props => ({
		backgroundColor: props.langColor,
		color: theme.palette.getContrastText(props.langColor)
	}),
	dayContainer: {
		border: `1px solid ${theme.palette.common.white}`,
		marginBottom: theme.spacing(1),
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(0.5)
	}
}));

const languageMap = require("../../configs/languages.json");

function SolutionCard({
	avatarUrl,
	username,
	date,
	day,
	solutionUrl,
	langName,
	...props
}) {
	const languageShortName =
		(languageMap[langName] && languageMap[langName].shortName) || "?";
	const languageColor =
		(languageMap[langName] && languageMap[langName].background) || red[500];

	const classes = useStyles({
		classes: props.classes,
		langColor: languageColor
	});

	const imageUrl = avatarUrl || `https://robohash.org/${username}`;

	console.log(langName);

	return (
		<Card className={classes.root}>
			<CardHeader
				title={username}
				subheader={moment(date).format("MM/DD, hh:mm a")}
				avatar={
					<Avatar className={classes.langBackgroundColor} title={langName}>
						{languageShortName}
					</Avatar>
				}
			/>

			<CardMedia className={classes.cardMedia} image={imageUrl} />

			<CardContent>
				<div className={classes.dayContainer}>
					<Typography align="center" variant="body1">
						Day {day}
					</Typography>
				</div>

				<Button
					target="_blank"
					component="a"
					href={solutionUrl}
					variant="contained"
					color="secondary"
					fullWidth
				>
					Solution
				</Button>
				{/* TODO: implement ratings */}
				<UserRating value={0} onChange={() => {}} />
			</CardContent>
		</Card>
	);
}

SolutionCard.propTypes = {
	username: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	day: PropTypes.string.isRequired,
	avatarUrl: PropTypes.string,
	solutionUrl: PropTypes.string.isRequired
};

export default React.memo(SolutionCard);
