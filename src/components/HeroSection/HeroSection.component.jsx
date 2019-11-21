import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
<<<<<<< HEAD
	root: {
		backgroundColor: "rgb(16, 15, 36)",
		height: "100%",
		display: "grid",
		gridTemplateColumns: "33% 1fr"

		// if (props.isMobile) {
		// 	return {
		// 		backgroundImage: "url('images/advent-mobile.png')",
		// 		backgroundPosition: "center center",
		// 		backgroundRepeat: "no-repeat",
		// 		backgroundColor: "rgb(16, 15, 36)",
		// 		height: "100%"
		// 	};
		// } else {
		// 	return {
		// 		backgroundImage: "url('images/advent.png')",
		// 		backgroundPosition: "center center",
		// 		backgroundSize: "cover",
		// 		backgroundAttachment: "fixed",
		// 		backgroundColor: "rgb(16, 15, 36)",
		// 		height: "100%"
		// 	};
		// }
	},
	content: {
		display: "flex",
		justifyContent: "center",
		justifySelf: "flex-start",
		alignItems: "center",
		height: "100%",
		position: "relative"
	},
	bg: {
		objectFit: "cover",
		height: "96vh",
		position: "fixed"
	},
	bgMobile: {
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
		backgroundColor: "rgb(16, 15, 36)",
		height: "100%"
	}
=======
  root: props => {
    if (props.isMobile) {
      return {
        backgroundImage: "url('images/advent-mobile.png')",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgb(16, 15, 36)",
        height: "100vh"
      };
    } 
    // else if (props.isMobile && props.webP) {
    //   return {
    //     backgroundImage: "url('images/advent-mobile.webp')",
    //     backgroundPosition: "center center",
    //     backgroundRepeat: "no-repeat",
    //     backgroundColor: "rgb(16, 15, 36)",
    //     height: "100vh"
    //   }
    // } else if (props.webP) {
    //   return {
    //     backgroundImage: "url('images/advent.webp')",
    //     backgroundPosition: "bottom center",
    //     backgroundSize: "cover",
    //     backgroundAttachment: "fixed",
    //     height: "100%"
    //   };
    // } 
    else {
      return {
        backgroundImage: "url('images/advent.png')",
        backgroundPosition: "bottom center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%"
      };
    }
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
>>>>>>> 90caad45e31c9690eb17336e1f71703cc09daea7
}));

function HeroSection({ children, ...props }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles({ isMobile, classes: props.classes });
	return (
		<div className={classes.root}>
			<picture>
				<source
					srcSet="images/advent.webp 1170w,
                images/advent.webp 970w,
                images/advent.webp 750w,
                images/advent.webp 320w"
					sizes="100vw"
					type="image/webp"
				/>
				<source
					srcSet="images/advent.png 1170w,
                images/advent.png 970w,
                images/advent.png 750w,
                images/advent.png 320w"
					sizes="100vw"
				/>
				<source
					srcSet="images/advent-mobile.webp"
					media="(max-width: 600px)"
					className={classes.bgMobile}
				/>
				<source
					srcSet="images/advent-mobile.png"
					media="(max-width: 600px)"
					className={classes.bgMobile}
				/>
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
