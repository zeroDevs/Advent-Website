import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LangIcon from "../LangIcon/LangIcon.component";
import {
	Card,
	CardContent,
	Button,
	CardHeader,
	Typography
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import UserRating from "../UserRating/UserRating.component";

const useStyles = makeStyles((theme) => ({
	root: {
		width: theme.spacing(30),
		height: theme.spacing(27),
		margin: theme.spacing(1),
		position: "relative"
	},
	dayContainer: {
		marginBottom: theme.spacing(1),
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(0.5)
	}
}));

function MiniCard({
	username,
	date,
	day,
	solutionUrl,
	langName,
	ratings,
	...props
}) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader
				title={
						<div className={classes.dayContainer}>
							<Typography variant="body1">
								Day {day}
							</Typography>
						</div>
						}
				subheader={moment(date).format("MM/DD, hh:mm a")}
				avatar={<LangIcon langName={langName} />}
			/>
			<Divider />
			<CardContent>
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
				<UserRating
					value={ratings}
					isDisabled={true}
					username={username}
					onChange={() => {}}
				/>
			</CardContent>
		</Card>
	);
}

MiniCard.propTypes = {
	username: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	day: PropTypes.number.isRequired,
	solutionUrl: PropTypes.string.isRequired,
	ratings: PropTypes.number.isRequired
};

export default React.memo(MiniCard);
