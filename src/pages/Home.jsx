import React from "react";
import * as qs from "query-string";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import HeroSection from "../components/HeroSection/HeroSection.component";
import MetaTags from "../components/MetaTags/MetaTags.component";
import { currentYear } from "../utils/siteConfig";
import HiglightsSection from "../components/HighlightsSection/HightlightSection.component";

const useStyles = makeStyles(theme => ({
	root: {},
	heroContentStyleOverride: {
		...theme.typography.h3
	},
	welcomeMessage: {
		textAlign: "center",
		fontSize: "2em"
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
	}
}));

function Home({ location: { search } }) {
	const classes = useStyles();
	const year = qs.parse(search).year;
	const param = year ? `?year=${year}` : "";

	return (
		<>
			<MetaTags />
			<HeroSection classes={{ content: classes.heroContentStyleOverride }}>
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
			</HeroSection>
			<HiglightsSection />
		</>
	);
}

export default Home;
