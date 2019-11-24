import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";

import Avatar from "../components/Avatar/Avatar.component";
import SubmitForm from "../components/Submit-Form/Submit-form.component";

import { useUserContext } from "../contexts/user/user.context";

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
	}
}));

const Submit = props => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles({ isMobile, classes: props.classes });
	// const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

	const [{ user: userInfo }, userDispatch] = useUserContext();

	const userId = userInfo && userInfo.id;
	const userAvatarHash = userInfo && userInfo.avatar;
	const userName = userInfo && `${userInfo.username}#${userInfo.discriminator}`;

	return (
		<div className={classes.root}>
			<div className={classes.form}>
				<div id="submit-modal-title" className={classes.title}>
					Submit Solution
				</div>

				<div className={classes.content}>
					<Avatar id={userId} avatar={userAvatarHash} userName={userName} />
					<SubmitForm user={userInfo} />
				</div>
			</div>
		</div>
	);
};

export default Submit;
