import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";

import Avatar from "../Avatar/Avatar.component";


const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		height: "100%",
		display: "flex"
	},
	form: ({ isMobile }) => ({
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		flexDirection: "column",
		...theme.shape,
		padding: theme.spacing(2, 4),
		position: "relative",
		margin: "auto",
		minWidth: `${isMobile ? "auto" : "600px"}`,
		width: `${isMobile ? "100%" : "auto"}`
	}),
	title: {
		...theme.typography.h6,
		textAlign: "center",
		marginBottom: theme.spacing(2)
	},
	content: {
		...theme.typography.body1
	},
	closeIcon: {
		color: theme.palette.error.main,
		cursor: "pointer"
	},
	infoContainer: {
		minHeight: theme.spacing(12),
		marginTop: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		"& :not(:first-child)": {
			marginTop: theme.spacing(2)
		}
	}
}));

const LoginCard = props => {

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles({
		isMobile,
		classes: props.classes
	});

	return(
		<div className={classes.root}>
			<div className={classes.form}>
				<div id="login-modal-title" className={classes.title}>
					Login
				</div>

				<div className={classes.content}>
					<Avatar />
					<div className={classes.infoContainer}>
						<Button
							variant="contained"
							color="secondary"
							to={{
								pathname: "/login",
								state: { from: `/${props.pathname}` }
							}}
							component={Link}
						>
							Please Login
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginCard;