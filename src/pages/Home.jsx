import React from "react";
import moment from "moment";

import * as qs from "query-string";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import HeroSection from "../components/HeroSection/HeroSection.component";
import MetaTags from "../components/MetaTags/MetaTags.component";
import HiglightsSection from "../components/HighlightsSection/HightlightSection.component";

import GlobalStats from "../components/GlobalStats/global-stats.component";

const useStyles = makeStyles((theme) => ({
	root: {},
	hero: ({ isMobile }) => ({
		height: `${isMobile ? "200%" : "100%"}`,
		display: "flex",
		flexDirection: "column",
		"&> *": {
			flexBasis: 0,
			flexGrow: 1
		}
	}),
	welcomeMessage: {
		...theme.typography.h3,
		textAlign: "center",
		fontSize: "2em",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		/* height: 100%; */
		/* position: relative; */
		flexDirection: "column"
	},
	year: {
		color: "yellow"
	},
	buttonRow: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		justifyContent: "center",
		marginTop: ".5rem",
		"& > *": {
			margin: "0 .25rem"
		}
	},
	stats: ({ isMobile }) =>
		isMobile
			? {
					background: "rgba(15,15,35,.7)"
			  }
			: {
					position: "absolute",
					bottom: theme.spacing(4)
			  }
}));

function Home({ location: { search } }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles({ isMobile });
	const year = qs.parse(search).year;
	const param = year ? `?year=${year}` : "";
	const currentYear = moment().format("YYYY");

	return (
		<>
			<MetaTags />
			<HeroSection className={classes.hero}>
				<div className={classes.welcomeMessage}>
					<div>Zero-to-Mastery</div>
					<div>
						Advent of Code{" "}
						<span className={classes.year}>{year || currentYear}</span>
					</div>
					<div className={classes.buttonRow}>
						<Button
							variant="contained"
							color="secondary"
							to={`/about${param}`}
							component={Link}
						>
							About
						</Button>
						<Button
							variant="contained"
							color="primary"
							to={`/solutions${param}`}
							component={Link}
						>
							Solutions
						</Button>
					</div>
				</div>
				<GlobalStats className={classes.stats}></GlobalStats>
			</HeroSection>

			<HiglightsSection />
		</>
	);
}

export default Home;
