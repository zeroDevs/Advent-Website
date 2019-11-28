import { makeStyles } from "@material-ui/styles";

const convertHex3To6 = hex =>
	hex.length === 4
		? hex
				.split("")
				.reduce((acc, item, index) => acc + (index > 0 ? item : "") + item, "")
		: hex;

export const useStyles = makeStyles(theme => ({
	root: {},
	navToolBar: {
		justifyContent: "center",
		paddingRight: "0px"
	},
	clearLink: {
		textDecoration: "none",
		color: theme.palette.text.primary
	},
	logo: ({ isMobile }) => ({
		marginRight: `${isMobile ? "0px" : "auto"}`,
		fontFamily: "Kaushan Script"
	}),
	linkContainer: ({ isMobile }) =>
		isMobile ? { display: "none" } : { position: "absolute" },
	userContainer: {
		marginLeft: "auto",
		"&> :not(:last-child)": {
			marginRight: ".75rem"
		}
	},
	avatar: {
		cursor: "pointer"
	},
	link: {
		padding: ".1rem",
		margin: "0px .4rem",

		"&:hover": {
			borderBottom: `1.5px solid ${convertHex3To6(
				theme.palette.text.primary
			)}66`
		},
		"&.current": {
			borderBottom: `1.5px solid ${convertHex3To6(theme.palette.text.primary)}`
		}
	}
}));
