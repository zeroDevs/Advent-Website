import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LangIcon from "../LangIcon/LangIcon.component";
import LazyLoad from "react-lazy-load";
import {
	Card,
	CardMedia,
	CardContent,
	Button,
	CardHeader,
	Typography
} from "@material-ui/core";

import {
	useUserContext,
	USER_ACTION_TYPES
} from "../../contexts/user/user.context";

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
	},
	imgContainer: {
		minHeight: 200
	}
}));

function SolutionCard({
	avatarUrl,
	username,
	userid,
	date,
	day,
	solutionUrl,
	langName,
	ratings,
	solutionId,
	isCarousel,
	...props
}) {
	const classes = useStyles();

	const [value, setValue] = React.useState(ratings);

	const [{ user }, userDispatch] = useUserContext();

	const imageUrl = avatarUrl || `https://robohash.org/${username}`;

	return (
		<Card className={classes.root}>
			<CardHeader
				title={username}
				subheader={moment(date).format("MM/DD, hh:mm a")}
				avatar={<LangIcon langName={langName} />}
			/>
			<div className={classes.imgContainer}>
				{/*temporary fix*/}
				{
					isCarousel ? 
						(
							<CardMedia
								className={classes.cardMedia}
								onError={e => {
									e.target.src = `https://robohash.org/${username}`;
								}}
								image={imageUrl}
								height={80}
								component="img"
							/>
						) : (
							<LazyLoad debounce={false} offset={100}>
								<CardMedia
									className={classes.cardMedia}
									onError={e => {
										e.target.src = `https://robohash.org/${username}`;
									}}
									image={imageUrl}
									height={80}
									component="img"
								/>
							</LazyLoad>
						)
				}
			</div>
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

					<UserRating value={value} isDisabled={user===null?true:false} username={username} onChange={
						(event, newRating) => {
							setValue(newRating);
							console.log(`Rated with value ${newRating}`);

							const response = fetch("https://aocbot.zerobot.xyz/solutions/vote", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									"Authorization": `Bearer ${window.localStorage.getItem("token")}`
								},
								body: JSON.stringify({
									solutionId,
									userId: user.id,
									ratingScore: newRating
								})
							})
						}
					} />
				}
			</CardContent>
		</Card>
	);
}

SolutionCard.propTypes = {
	username: PropTypes.string.isRequired,
	userid: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	day: PropTypes.number.isRequired,
	avatarUrl: PropTypes.string,
	solutionUrl: PropTypes.string.isRequired,
	ratings: PropTypes.number.isRequired,
	solutionId: PropTypes.string.isRequired,
	isCarousel: PropTypes.bool.isRequired
};

export default React.memo(SolutionCard);
