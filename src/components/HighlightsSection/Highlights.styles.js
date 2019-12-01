import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { pink, blue } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

export const useStyles = makeStyles(theme => ({
	title: {
		padding: "50px 0 20px 0",
		textAlign: "center"
	},
	radio: {
		display: "flex",
		justifyContent: "center"
	},
	solutionsContainer: {
		marginTop: "50px",
		marginBottom: "80px"
	}
}));

export const PinkRadio = withStyles({
	root: {
		color: pink[400],
		marginLeft: "5px",
		"&$checked": {
			color: pink[600]
		}
	},
	checked: {}
})(props => <Radio color="default" {...props} />);

export const BlueRadio = withStyles({
	root: {
		color: blue[400],
		marginRight: "5px",
		"&$checked": {
			color: blue[600]
		}
	},
	checked: {}
})(props => <Radio color="default" {...props} />);
