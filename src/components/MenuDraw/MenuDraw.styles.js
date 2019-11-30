import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
	drawer: {
		"& .menuUserContainer": {
			marginLeft: "auto",
			flexGrow: 0
		},
		"& .menu": {
			flexGrow: 1
		}
	},
	menu: {
		display: "flex",
		flexDirection: "column"
	},
	spacer: {
		marginTop: "auto"
	},
	clearLink: {
		textDecoration: "none",
		color: theme.palette.text.primary
	},
	menuUserContainer: {
		marginLeft: "auto",
		"&> :not(:last-child)": {
			marginRight: ".75rem"
		}
	}
}));
