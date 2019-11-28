import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
	clearLink: {
		textDecoration: "none",
		color: theme.palette.text.primary
	},
	logo: ({ isMobile }) => ({
		marginRight: `${isMobile ? "0px" : "auto"}`,
		fontFamily: "Kaushan Script"
	})
}));
