import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Avatar } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
	langBackgroundColor: props => ({
		backgroundColor: props.langColor,
		color: theme.palette.getContrastText(props.langColor)
	})
}));

const languageMap = require("../../configs/languages.json");

function LangIcon({ langName, ...props }) {
	const languageShortName =
		(languageMap[langName] && languageMap[langName].shortName) || "?";
	const languageColor =
		(languageMap[langName] && languageMap[langName].background) || red[500];
	const classes = useStyles({
		classes: props.classes,
		langColor: languageColor
	});

	return (
		<Avatar className={classes.langBackgroundColor} title={langName}>
			{languageShortName}
		</Avatar>
	);
}

Avatar.propTypes = {
	id: PropTypes.string,
	avatar: PropTypes.string,
	userName: PropTypes.string
};

export default LangIcon;
