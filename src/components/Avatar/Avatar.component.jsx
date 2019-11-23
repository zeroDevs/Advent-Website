import React from "react";
import PropTypes from "prop-types";
import MaterialAvatar from "@material-ui/core/Avatar";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.spacing(20),
		height: theme.spacing(20),
		margin: [[0, "auto"]],
		background: "rgba(0,0,0,0)"
	}
}));

function Avatar({ id, avatar, userName, ...props }) {
	const classes = useStyles({ classes: props.classes });
	const discordImgUrl =
		id && avatar
			? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=512`
			: "images/user-unknown.png";

	return (
		<MaterialAvatar
			variant={`${id && avatar ? "circle" : "square"}`}
			alt={userName}
			src={discordImgUrl}
			className={classes.root}
		/>
	);
}

Avatar.propTypes = {
	id: PropTypes.string,
	avatar: PropTypes.string,
	userName: PropTypes.string
};

export default Avatar;
