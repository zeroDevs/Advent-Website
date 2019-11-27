import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkIcon from "@material-ui/icons/Link";

const iconMap = new Map([
	["twitter", TwitterIcon],
	["linkedin", LinkedInIcon],
	["facebook", FacebookIcon],
	["instagram", InstagramIcon],
	["github", GitHubIcon],
	["default", LinkIcon]
]);

const useStyles = makeStyles(theme => ({
	socialIcon: {
		color: theme.palette.text.primary
	}
}));

function SocialLinks({ links }) {
	const classes = useStyles();

	if (!links) return null;

	return links.map(link => {
		const { label } = link;
		const SocialIcon = iconMap.has(label)
			? iconMap.get(label)
			: iconMap.get("default");
		return (
			<IconButton 
				component="a" 
				href={link.url} 
				target="_blank"
				rel="noopener noreferrer">
				<SocialIcon className={classes.socialIcon} />
			</IconButton>
		);
	});
}

export default React.memo(SocialLinks);
