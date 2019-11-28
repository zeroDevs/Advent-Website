import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
	clearLink: {
		textDecoration: "none",
		fontSize: "small",
		color: theme.palette.text.secondary
	},
	icon: {
		paddingLeft: "20px",
		paddingRight: "50px"
	}
}));
