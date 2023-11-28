import React from "react";
import moment from "moment";

import * as qs from "query-string";
import { Badge, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "./Logo.styles";

function Logo({ location }) {
	const queryParams = qs.parse(location.search);
	const classes = useStyles();
	const currentYear = moment().format("YYYY");

	return (
		<Link to="/" className={classes.clearLink}>
			<Badge
				className={classes.margin}
				badgeContent={queryParams.year ? queryParams.year : currentYear}
				color="primary"
				max={3000}
			>
				<Typography className={classes.logo} variant="h5">
					Advent of Code{" "}
				</Typography>
			</Badge>
		</Link>
	);
}

export default Logo;
