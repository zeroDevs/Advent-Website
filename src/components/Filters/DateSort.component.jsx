import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles(theme => ({
	container: {
		position: "relative",
		margin: theme.spacing(2, 0)
	},
	clear: {
		position: "absolute",
		top: 0,
		right: 0
	},
	clearIcon: {
		color: theme.palette.text.secondary,
		cursor: "pointer",
		zIndex: 2000
	},
	label: {
		marginBottom: theme.spacing(1)
	},
	formControlOverride: {
		position: "initial"
	}
}));

function DateSort({ dateSort, handleChange, handleClear }) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.clear}>
				<CancelIcon
					className={classes.clearIcon}
					onClick={handleClear}
					fontSize="small"
				/>
			</div>

			<FormControl
				component="fieldset"
				color="secondary"
				className={classes.DateSort}
				classes={{ root: classes.formControlOverride }}
			>
				<FormLabel className={classes.label} component="legend">
					Date
				</FormLabel>
				<RadioGroup name="dateAge" value={dateSort} onChange={handleChange}>
					<FormControlLabel value="asc" control={<Radio />} label="Oldest" />
					<FormControlLabel value="desc" control={<Radio />} label="Newest" />
				</RadioGroup>
			</FormControl>
		</div>
	);
}

export default DateSort;
