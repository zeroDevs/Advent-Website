import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import ContribCard from "./ContribCard.component";
import data from "./contributors.json";

const useStyles = makeStyles(theme => ({
	contributorsContainer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(4, 0)
	},
	cardContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center"
	},
	informationSection: {
		margin: theme.spacing(4, 0),
		marginLeft: "auto",
		marginRight: "auto",
		width: "95%",
		[theme.breakpoints.up("sm")]: {
			width: "80%"
		},
		[theme.breakpoints.up("lg")]: {
			width: "60%"
		},
		"& > p": {
			...theme.typography.body1,
			color: theme.palette.text.primary
		}
	}
}));

function Contributors(props) {
	const classes = useStyles();

	return (
		<>
			<div className={classes.contributorsContainer}>
				<Typography
					align="center"
					color="textPrimary"
					variant="h3"
					gutterBottom
				>
					Contributors
				</Typography>
				<div className={classes.cardContainer}>
					{data.map(person => (
						<ContribCard key={person.name} person={person} />
					))}
				</div>
			</div>
			<div className={classes.informationSection}>
				<Typography
					align="center"
					color="textPrimary"
					variant="h3"
					gutterBottom
				>
					The Project
				</Typography>
				<p>
					Kale chips 3 wolf moon photo booth church-key fashion axe gastropub
					knausgaard seitan. Dreamcatcher forage master cleanse scenester
					cardigan chillwave next level kale chips letterpress tattooed cliche
					fingerstache bespoke everyday carry. Cronut green juice occupy, jean
					shorts migas kogi plaid stumptown hell of organic small batch wolf
					lo-fi enamel pin. Taxidermy chillwave asymmetrical mumblecore,
					chicharrones readymade retro listicle mustache vexillologist.
					Authentic roof party coloring book, bespoke distillery leggings vape
					adaptogen intelligentsia wolf umami tofu +1 beard.
				</p>
				<p>
					Tumeric literally narwhal mlkshk hexagon asymmetrical put a bird on it
					plaid. Schlitz humblebrag VHS, man braid master cleanse banh mi brunch
					locavore semiotics mustache vice vaporware iceland. Chartreuse palo
					santo vape readymade, lumbersexual waistcoat gastropub. Retro
					intelligentsia subway tile, gastropub selvage vaporware 90's.
					Shoreditch before they sold out iPhone polaroid shaman squid chambray
					shabby chic jean shorts butcher direct trade.
				</p>
			</div>
		</>
	);
}

export default React.memo(Contributors);
