import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
	Card,
	CardMedia,
	CardContent,
	CardHeader,
	Typography
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		width: theme.spacing(32),
		height: theme.spacing(56),
		margin: theme.spacing(1),
		position: "relative"
	},
	cardMedia: {
		minHeight: 240
	},
	cardContent: {
		marginBottom: theme.spacing(1),
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(0.5)
	}
}));

function ProfileCard({
	avatarUrl,
	username,
	submissionCount,
	langCount,
	avgRating,
	...props
}) {
	const classes = useStyles();

	const imageUrl = avatarUrl || `https://robohash.org/${username}`;

	return (
		<Card className={classes.root}>
			<CardHeader title={username} />
			<Divider />
			<div className={classes.imgContainer}>
				<CardMedia
					className={classes.cardMedia}
					onError={(e) => {
						e.target.src = `https://robohash.org/${username}`;
					}}
					image={imageUrl}
					height={80}
					component="img"
				/>
			</div>
			<Divider />
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="body1">
						Total Submissions : {submissionCount}
					</Typography>
				</div>
				<div className={classes.cardContent}>
					<Typography variant="body1">
						Languages used : {langCount}
					</Typography>
				</div>
				<div className={classes.cardContent}>
					<Typography variant="body1">
						Average Rating : {avgRating}
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
}

ProfileCard.propTypes = {
	username: PropTypes.string.isRequired,
	avatarUrl: PropTypes.string,
	submissionCount: PropTypes.number.isRequired,
	langCount: PropTypes.number.isRequired,
	avgRating: PropTypes.number.isRequired
};

export default React.memo(ProfileCard);
