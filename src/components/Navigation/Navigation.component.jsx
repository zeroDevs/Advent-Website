import React, { useCallback, Fragment } from "react";
import { withRouter } from "react-router-dom";

import {
	useUserContext,
	USER_ACTION_TYPES
} from "../../contexts/user/user.context";

import {
	useTheme,
	useMediaQuery,
	AppBar,
	Toolbar,
	Typography,
	Avatar
} from "@material-ui/core";

import Treeburger from "./Treeburger.component";

import { useStyles } from "./Navigation.styles";
import Logo from "../Logo/Logo.component";
import MenuDrawer from "../MenuDraw/MenuDraw.component";

const Nav = ({ location, history, className }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles({ isMobile });

	const [{ user, token }, userDispatch] = useUserContext();

	const [open, setOpen] = React.useState(false);

	const toggleDrawer = useCallback(event => {
		setOpen(prevOpen => !prevOpen);
	}, []);

	const [openSubmissions, setOpenSubmissions] = React.useState(false);
	const toggleSubmissions = useCallback(() => {
		setOpenSubmissions(prevOpen => !prevOpen);
	}, []);

	const handleLogout = useCallback(
		evt => {
			userDispatch({ type: USER_ACTION_TYPES.LOGOUT });
			toggleDrawer(evt);
		},
		[userDispatch, toggleDrawer]
	);

	return (
		<>
			<AppBar
				position="fixed"
				className={`${classes.root} not-scrolled ${className}`}
			>
				<Toolbar className={classes.navToolBar}>
					<Logo location={location} />

					<Toolbar className={classes.userContainer}>
						{token ? (
							<Fragment>
								<Typography variant="button">{user.username}</Typography>
								<Avatar
									alt="Avatar"
									variant={user.avatar ? "circle" : "square"}
									src={
										user.avatar
											? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
											: "images/user.png"
									}
									onClick={toggleDrawer}
									className={classes.avatar}
								/>
							</Fragment>
						) : (
							<Fragment>
								<Treeburger onClick={toggleDrawer} />
							</Fragment>
						)}
					</Toolbar>
				</Toolbar>
			</AppBar>

			<MenuDrawer
				open={open}
				toggleDrawer={toggleDrawer}
				toggleSubmissions={toggleSubmissions}
				handleLogout={handleLogout}
				openSubmissions={openSubmissions}
				location={location}
				user={user}
			/>
		</>
	);
};

export default withRouter(Nav);
