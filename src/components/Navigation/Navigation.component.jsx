import React, { useCallback } from "react";
import { withRouter, Link } from "react-router-dom";

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
	Avatar,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Collapse,
	Tooltip,
	IconButton,
	Zoom
} from "@material-ui/core";

import {
	AccountRemoveOutline,
	AccountOutline,
	HomeOutline,
	InformationOutline,
	LightbulbOnOutline,
	EyeOutline
} from "mdi-material-ui";

import { ExpandMore, ExpandLess, Send } from "@material-ui/icons";

import Treeburger from "./Treeburger.component";
import { makeStyles } from "@material-ui/styles";

const convertHex3To6 = hex =>
	hex.length === 4
		? hex
				.split("")
				.reduce((acc, item, index) => acc + (index > 0 ? item : "") + item, "")
		: hex;

const useStyles = makeStyles(theme => ({
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
	},
	fab: {
		position: "absolute",
		top: "125%",
		right: "1.25rem",
		background: "url('images/submitIconsmall.png')",
		backgroundSize: "contain",
		width: "3rem",
		height: "3rem"
	},
	drawer: {
		"& .menuUserContainer": {
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
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

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

	// const toggleDrawer = useCallback(event => {
	// 	if (anchorRef.current && anchorRef.current.contains(event.target)) {
	// 		return;
	// 	}

	// 	setOpen(false);
	// }, []);

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
					<Link to="/" className={classes.clearLink}>
						<Typography className={classes.logo} variant="h5">
							Advent of Code
						</Typography>
					</Link>
					{/* <div className={classes.linkContainer}>
						<Link to='/about' className={classes.clearLink}>
							<Typography
								variant='button'
								className={`${classes.link} ${
									location.pathname === "/about" ? "current" : ""
								}`}
							>
								About
							</Typography>
						</Link>
						<Link to='/solutions' className={classes.clearLink}>
							<Typography
								variant='button'
								className={`${classes.link} ${
									location.pathname === "/solutions" ? "current" : ""
								}`}
							>
								Solutions
							</Typography>
						</Link>
					</div> */}
					<Toolbar className={classes.userContainer}>
						{token ? (
							<>
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
							</>
						) : (
							<>
								{/* <Link
									to={{
										pathname: "/login",
										state: { from: location.pathname }
									}}
									className={classes.clearLink}
								>
									<Typography variant='button' className={classes.link}>
										Login
									</Typography>
								</Link> */}
								<Treeburger onClick={toggleDrawer} />
							</>
						)}
					</Toolbar>
				</Toolbar>
				{/* <ModalButton>
					<Zoom
						in
						timeout={theme.transitions.duration.enteringScreen}
						style={{ transitionDelay: "1s" }}
					>
						<>
							<Tooltip title="Submit Your Solution">
								<IconButton className={classes.fab}></IconButton>
							</Tooltip>
						</>
					</Zoom>
					<div></div>
				</ModalButton> */}
			</AppBar>

			<Drawer
				open={open}
				onClose={toggleDrawer}
				anchor="right"
				className={classes.drawer}
			>
				{token ? (
					<>
						<Toolbar className={`menuUserContainer ${classes.userContainer}`}>
							<Typography variant="button">{user.username}</Typography>
							<Avatar
								variant={`${user.avatar ? "circle" : "square"}`}
								alt="Avatar"
								src={
									user.avatar
										? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
										: "images/user.png"
								}
								className={classes.avatar}
								onClick={toggleDrawer}
							/>
						</Toolbar>
						<Divider />
					</>
				) : (
					<></>
				)}

				<List className={`menu ${classes.menu}`}>
					<Link to="/" className={classes.clearLink}>
						<ListItem button onClick={toggleDrawer}>
							<ListItemIcon>
								<HomeOutline />
							</ListItemIcon>
							<ListItemText>Home</ListItemText>
						</ListItem>
					</Link>

					<Link to="/about" className={classes.clearLink}>
						<ListItem button onClick={toggleDrawer}>
							<ListItemIcon>
								<InformationOutline />
							</ListItemIcon>
							<ListItemText>About</ListItemText>
						</ListItem>
					</Link>

					<ListItem button onClick={toggleSubmissions}>
						<ListItemIcon>
							<LightbulbOnOutline />
						</ListItemIcon>
						<ListItemText>Solutions</ListItemText>
						{openSubmissions ? <ExpandLess /> : <ExpandMore />}
					</ListItem>

					<Collapse in={openSubmissions} timeout="auto" unmountOnExit>
						<List disablePadding>
							<Link to="/solutions" className={classes.clearLink}>
								<ListItem
									button
									className={classes.nested}
									onClick={toggleDrawer}
								>
									<ListItemIcon>
										<EyeOutline />
									</ListItemIcon>
									<ListItemText>View</ListItemText>
								</ListItem>
							</Link>
							<Link to="/submit" className={classes.clearLink}>
								<ListItem
									button
									className={classes.nested}
									onClick={toggleDrawer}
								>
									<ListItemIcon>
										<Send />
									</ListItemIcon>
									<ListItemText>Submit</ListItemText>
								</ListItem>
							</Link>
						</List>
					</Collapse>

					<Divider className={classes.spacer} />
					{token ? (
						<ListItem button onClick={handleLogout}>
							<ListItemIcon>
								<AccountRemoveOutline />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</ListItem>
					) : (
						<Link
							to={{
								pathname: "/login",
								state: { from: location.pathname }
							}}
							className={classes.clearLink}
						>
							<ListItem button onClick={handleLogout}>
								<ListItemIcon>
									<AccountOutline />
								</ListItemIcon>
								<ListItemText>Login</ListItemText>
							</ListItem>
						</Link>
					)}
				</List>
			</Drawer>
		</>
	);
};

export default withRouter(Nav);
