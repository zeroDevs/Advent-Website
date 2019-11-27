import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LangIcon from "../LangIcon/LangIcon.component";
import { red } from "@material-ui/core/colors";
import {
	Card,
	CardMedia,
	CardContent,
	Button,
	CardHeader,
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
	dayContainer: {
		border: `1px solid ${theme.palette.common.white}`,
		marginBottom: theme.spacing(1),
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(0.5)
	}
}));

function SolutionCard({
	avatarUrl,
	username,
	date,
	day,
	solutionUrl,
	langName,
	...props
}) {
	const classes = useStyles();

	const imageUrl = avatarUrl || `https://robohash.org/${username}`;

	return (
		<Card className={classes.root}>
			<CardHeader
				title={username}
				subheader={moment(date).format("MM/DD, hh:mm a")}
				avatar={<LangIcon langName={langName} />}
			/>

			<CardMedia
				className={classes.cardMedia}
				onError={e => {
					e.target.src = `https://robohash.org/${username}`;
				}}
				src={imageUrl}
				component="img"
			/>

			<CardContent>
				<div className={classes.dayContainer}>
					<Typography align="center" variant="body1">
						Day {day}
					</Typography>
				</div>

				<Button
					target="_blank"
					rel="noopener noreferrer"
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
