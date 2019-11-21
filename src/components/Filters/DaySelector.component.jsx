import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(0, 2)
	},
	rangeNumbersContainer: {
		display: "flex",
		justifyContent: "space-between"
	},
	rangeNumbers: {
		color: "yellow"
	}
}));

function DaySelector({ dateRange, handleChange }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.rangeNumbersContainer}>
				<Typography variant="body1" color="textSecondary">
					Day range
				</Typography>
				<Typography variant="body1" className={classes.rangeNumbers}>
					{`${dateRange[0]} - ${dateRange[1]}`}
				</Typography>
			</div>
			<Slider
				name="daySlider"
				color="secondary"
				value={dateRange}
				onChange={handleChange}
				valueLabelDisplay="auto"
				max={25}
				min={1}
				marks
			/>
		</div>
	);
}

export default DaySelector;
