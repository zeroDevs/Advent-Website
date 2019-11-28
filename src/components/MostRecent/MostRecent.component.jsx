import React from "react";
import { useStyles } from "./MostRecent.styles";
import useRecent from "../../hooks/useRecent";
import Card from "../Card/Card.component";
import { Typography } from "@material-ui/core";

function MostRecent() {
	const classes = useStyles();
	const dataFromApi = useRecent();

	console.log(dataFromApi);
	return (
		<div className={classes.mostRecentContainer}>
			<Typography className={classes.title} variant="h3" color="textSecondary">
				Most Recent Submissions!
			</Typography>
			<div className={classes.solutionsContainer}>
				{dataFromApi.map(user => {
					return (
						<Card
							key={user.username + user._id}
							avatarUrl={user.avatarUrl}
							username={user.userName}
							date={user.Time}
							day={user.dayNumber}
							solutionUrl={user.url}
							langName={user.langName}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default MostRecent;
