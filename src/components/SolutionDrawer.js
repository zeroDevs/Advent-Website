import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Drawer, IconButton, Divider } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	root: {
		width: "300px",
		flexShrink: 0
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}
}));

function SolutionDrawer({ isOpen, handleDrawerClose, children }) {
	const classes = useStyles();
	return (
		<Drawer
			className={classes.root}
			variant="persistent"
			anchor="left"
			open={isOpen}
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeft />
				</IconButton>
			</div>
			<Divider />
			{children}
		</Drawer>
	);
}

export default SolutionDrawer;
