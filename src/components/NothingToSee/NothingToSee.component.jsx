import React from "react";
const moment = require("moment");

import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	Container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: "auto",
		minHeight: "50vh"
	},
	Content: {
		display: "flex",
		flexDirection: "column",
		background: "#424242",
		padding: "50px 150px",
		borderRadius: "5px",
		border: "1px solid #5b5b5b",
		boxShadow: "5px 5px 3px 0px rgba(0,0,0,0.5)"
	},
	CircularProgress: {
		margin: "auto"
	},
	year: {
		color: "#455dd3",
		fontWeight: "bold"
	}
}));

function NothingToSee({ year }) {
	const classes = useStyles();
	const currentYear = moment().format("YYYY");
	const aocYear = year || currentYear;
	return (
		<div className={classes.Container}>
			<div className={classes.Content}>
				<Typography variant="h3" color="textPrimary">
					Results Not Found!{" "}
					<span role="img" aria-label="Sad emoji">
						😥
					</span>
				</Typography>

				<Typography variant="h5" color="textSecondary">
					Unfortunately there are no results to show for <br />
				</Typography>
				<Typography className={classes.year} variant="h5">
					Advent of Code {aocYear}
				</Typography>
			</div>
		</div>
	);
}

export default NothingToSee;
