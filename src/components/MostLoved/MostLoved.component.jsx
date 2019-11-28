import React from "react";
import { useStyles } from "./MostLoved.styles";
import useLoved from "../../hooks/useLoved";
import Card from "../Card/Card.component";
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";

function MostLoved() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles();
	const dataFromApi = useLoved(isMobile);
	return (
		<div className={classes.mostRecentContainer}>
			<Typography className={classes.title} variant="h3" color="textSecondary">
				Most Loved Submissions!
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

export default MostLoved;
