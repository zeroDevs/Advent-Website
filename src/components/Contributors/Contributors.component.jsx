import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import ContribCard from "./ContribCard.component";
import data from "./contributors.json";

const useStyles = makeStyles(theme => ({
	contributorsContainer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(4, 0)
	},
	cardContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		margin: theme.spacing(4, 0),
		marginLeft: "auto",
		marginRight: "auto",
		width: "95%",
		[theme.breakpoints.up("sm")]: {
			width: "80%"
		},
		[theme.breakpoints.up("md")]: {
			width: "95%"
		},
		[theme.breakpoints.up("lg")]: {
			width: "90%"
		},
		[theme.breakpoints.up("xl")]: {
			width: "70%"
		}
	}
}));

function Contributors(props) {
	const classes = useStyles();

	return (
		<>
			<div className={classes.contributorsContainer}>
				<Typography
					align="center"
					color="textPrimary"
					variant="h3"
					gutterBottom
				>
					Contributors
				</Typography>
				<div className={classes.cardContainer}>
					{data.map(person => (
						<ContribCard key={person.name} person={person} />
					))}
				</div>
			</div>
		</>
	);
}

export default React.memo(Contributors);
