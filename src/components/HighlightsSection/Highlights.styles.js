import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

export const useStyles = makeStyles(theme => ({
	title: {
		padding: "50px 0 0 0",
		textAlign: "center"
	},
	radio: {
		display: "flex",
		justifyContent: "center",
		padding: "10px 25px"
	},
	solutionsContainer: {
		marginBottom: "50px"
	}
}));

export const PinkRadio = withStyles({
	root: {
		color: pink[400],
		"&$checked": {
			color: pink[600]
		}
	},
	checked: {}
})(props => <Radio color="default" {...props} />);
