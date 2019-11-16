import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card, CardActions, CardHeader } from "@material-ui/core";

import SocialLinks from "./SocialLinks.component";

const useStyles = makeStyles(theme => ({
	card: {
		width: theme.spacing(40),
		padding: theme.spacing(1),
		margin: theme.spacing(1),
		backgroundColor: theme.palette.background.default
	},
	avatar: {
		height: theme.spacing(30),
		width: theme.spacing(30),
		marginLeft: "auto",
		marginRight: "auto"
	},
	linksContainer: {
		flex: 1,
		display: "flex",
		justifyContent: "space-evenly"
	},
	textCenter: {
		textAlign: "center"
	}
}));

function ContribCard({ person }) {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardHeader
				title={person.tag}
				subheader={person.name}
				classes={{ title: classes.textCenter, subheader: classes.textCenter }}
			/>
			<Avatar className={classes.avatar} src={person.avatarImage} />
			<CardActions disableSpacing>
				<div className={classes.linksContainer}>
					<SocialLinks links={person.links} />
				</div>
			</CardActions>
		</Card>
	);
}

export default React.memo(ContribCard);
