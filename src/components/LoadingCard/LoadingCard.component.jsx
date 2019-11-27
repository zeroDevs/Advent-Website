import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	Container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: "auto",
		minHeight: "80vh"
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
	}
}));

function LoadingCard(props) {
	const classes = useStyles();
	return (
		<div className={classes.Container}>
			<div className={classes.Content}>
				<CircularProgress
					className={classes.CircularProgress}
					thickness={5}
					size={75}
				/>
				<h2>{props.children}</h2>
			</div>
		</div>
	);
}

export default LoadingCard;
