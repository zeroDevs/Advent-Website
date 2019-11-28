import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useStyles } from "./NavLink.styles";

function NavLink({ text, link, icon, toggleDrawer }) {
	const classes = useStyles();
	return (
		<Link to={link} className={classes.clearLink}>
			<ListItem button onClick={toggleDrawer} className={classes.icon}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText>{text}</ListItemText>
			</ListItem>
		</Link>
	);
}

export default NavLink;
