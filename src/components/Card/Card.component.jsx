import React from "react";
import PropTypes from "prop-types";

import {
	Card as MUICard,
	CardMedia,
	Typography,
	CardContent,
	Link,
	Icon
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 300,
		minHeight: 300,
		textAlign: "center",
		position: "relative"
	},
	cardMedia: {
		minHeight: 300
	},
	linkToSolution: {
		border: "1px solid orange",
		display: "inline-block",
		padding: "1rem",
		borderRadius: "0.3em"
	},
	cardBottom: {
		background: theme.palette.common.white,
		color: theme.palette.common.black
	}
}));

/**
 * Card component. Accepts a few params:
 * - `avatar_url`(optional)
 * - `username`(required)
 * - `date`:(required) date of submission. provide it as date string compitable for parsing using `new Date()`
 * - `day`:(required) day number(for example: 20 if the date is 20th nov)
 * - `solution_url`:(required) url to the solution
 */
export default function Card(props) {
	const { avatar_url, username, date, day, solution_url } = props;
	const classes = useStyles({ classes: props.classes });

	return (
		<>
			<MUICard className={classes.card}>
				<CardMedia
					style={{
						position: "absolute",
						display: "inline",
						background: "#fff",
						top: 15,
						left: 10,
						borderRadius: "0.3em"
					}}
					image=""
				>
					<Typography
						style={{
							fontWeight: "bold",
							color: "#424242",
							height: "50px",
							width: "50px",
							lineHeight: "50px" // keep it same as `height`
						}}
					>
						{day || 1}
					</Typography>
				</CardMedia>
				<CardMedia
					className={classes.cardMedia}
					image={avatar_url || "https://www.ark-ir.org/images/img_avatar5.png"}
					title="Contemplative Reptile"
				/>

				<CardContent>
					<Typography style={{ fontSize: "1.9em" }}>
						{username || "notAnkur"}
					</Typography>
				</CardContent>

				<CardContent>
					<Typography className={classes.linkToSolution}>
						<Link
							href={solution_url}
							style={{ color: "inherit", textDecoration: "none" }}
							target="_blank"
						>
							Solution
						</Link>
					</Typography>
				</CardContent>

				<CardContent className={classes.cardBottom}>
					<Typography>Submitted 11 Months Ago</Typography>
				</CardContent>
			</MUICard>
		</>
	);
}

Card.propTypes = {
	username: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	day: PropTypes.number.isRequired,
	avatar_url: PropTypes.string,
	solution_url: PropTypes.string.isRequired
};
