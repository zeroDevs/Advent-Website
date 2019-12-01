import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import * as qs from "query-string";
import {
	Drawer,
	Typography,
	Toolbar,
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@material-ui/core";

import {
	AccountRemoveOutline,
	AccountOutline,
	HomeOutline,
	InformationOutline,
	EyeOutline
} from "mdi-material-ui";

import { Send, EmojiEvents } from "@material-ui/icons";
import { useStyles } from "./MenuDraw.styles";
import NavLink from "../NavLink/NavLink.component";
import { menuLinks } from "../../utils/siteConfig";

function MenuDraw({
	open,
	toggleDrawer,
	toggleSubmissions,
	openSubmissions,
	handleLogout,
	user,
	location,
	token
}) {
	const classes = useStyles();
	const queryParam = qs.parse(location.search).year;
	const yearParam = queryParam ? `?year=${queryParam}` : "";

	return (
		<Drawer
			open={open}
			onClose={toggleDrawer}
			anchor="right"
			className={classes.drawer}
		>
			{token ? (
				<Fragment>
					<Toolbar className={`menuUserContainer ${classes.menuUserContainer}`}>
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
				</Fragment>
			) : null}

			<List className={`menu ${classes.menu}`}>
				{menuLinks.map(link => {
					const IconComponent = {
						EyeOutline: <EyeOutline />,
						HomeOutline: <HomeOutline />,
						InformationOutline: <InformationOutline />,
						Send: <Send />,
						EmojiEvents: <EmojiEvents />
					};
					return (
						<Fragment key={link.name + Math.random * 10000}>
							<NavLink
								text={link.name}
								link={`${link.route}${yearParam}`}
								icon={IconComponent[link.icon]}
								toggleDrawer={toggleDrawer}
							/>

							{link.dividerAfter ? <Divider /> : null}
						</Fragment>
					);
				})}

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
	);
}

export default MenuDraw;
