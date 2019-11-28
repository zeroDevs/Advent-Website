import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
	mostRecentContainer: {
		padding: "50px 0",
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		background: "#282828"
	},
	solutionsContainer: {
		marginTop: "50px",
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-evenly"
	}
}));
