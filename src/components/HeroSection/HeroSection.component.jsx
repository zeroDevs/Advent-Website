import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	root: () => { 
		if (window.matchMedia('(max-width: 600px)').matches) {
			return {
				backgroundPosition: "center center",
				height: "100%"
			};
		} else {
			return {
				height: "100%",
				display: "grid",
				gridTemplateColumns: "33% 1fr"
			};
		}
	},
	content: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		position: "relative"
	},
	bg: {
		backgroundColor: "rgb(16, 15, 36)",
		objectFit: "cover",
		height: "100%",
		position: "fixed",
		width: "100vw"
	}
}));

function HeroSection({ children, ...props }) {
	// const theme = useTheme();
	// const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	// console.log(isMobile)
	const classes = useStyles({ classes: props.classes });
	return (
		<div className={classes.root}>
			<picture>
				<source
					srcSet="images/advent.webp"
					type="image/webp"
					media="(min-width: 601px)"
				/>
				<source srcSet="images/advent.png" media="(min-width: 601px)" />
				<source srcSet="images/advent-mobile.webp" media="(max-width: 600px)" />
				<source srcSet="images/advent-mobile.png" media="(max-width: 600px)" />
				<img
					src="images/advent.png"
					alt="Ascii Christmas Tree"
					className={classes.bg}
					loading="lazy"
				/>
			</picture>

			<div className={classes.content}>{children}</div>
		</div>
	);
}

HeroSection.propTypes = {
	children: PropTypes.node
};

export default React.memo(HeroSection);
