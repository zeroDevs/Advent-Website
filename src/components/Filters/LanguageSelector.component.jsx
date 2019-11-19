import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
	flexContainer: {
		display: "flex"
	},
	leftLanguages: {
		marginRight: theme.spacing(2)
	},
	label: {
		marginBottom: theme.spacing(1)
	},
	formControlOverride: {
		position: "initial"
	}
}));

function LanguageSelector({ selectedLangs, handleChange, handleClear }) {
	const classes = useStyles();
	const languages = Object.keys(selectedLangs);
	const halfWayPoint = Math.floor(languages.length / 2);
	const columnOne = languages.slice(0, halfWayPoint);
	const columnTwo = languages.slice(halfWayPoint);

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
				className={classes.formControl}
				classes={{ root: classes.formControlOverride }}
			>
				<FormLabel className={classes.label} component="legend">
					Languages
				</FormLabel>
				<div className={classes.flexContainer}>
					<FormGroup className={classes.leftLanguages}>
						{columnOne.map(language => (
							<FormControlLabel
								key={language}
								control={
									<Checkbox
										checked={selectedLangs[language]}
										onChange={handleChange(language)}
										value={language}
									/>
								}
								label={language}
							/>
						))}
					</FormGroup>
					<FormGroup>
						{columnTwo.map(language => (
							<FormControlLabel
								key={language}
								control={
									<Checkbox
										checked={selectedLangs[language]}
										onChange={handleChange(language)}
										value={language}
									/>
								}
								label={language}
							/>
						))}
					</FormGroup>
				</div>
			</FormControl>
		</div>
	);
}

export default LanguageSelector;
