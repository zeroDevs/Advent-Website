import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import useStats from "../../hooks/useStats";

import { FileCodeOutline, CalendarMonth, AccountGroup } from "mdi-material-ui";
import { useTheme } from "@material-ui/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import CountUp from "react-countup";

const convertHex3To6 = hex =>
	hex.length === 4
		? hex
				.split("")
				.reduce((acc, item, index) => acc + (index > 0 ? item : "") + item, "")
		: hex;

const useStyles = makeStyles(theme => ({
	root: {},
	stat: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	icon: {
		...theme.typography.h2,
		color: `${convertHex3To6(theme.palette.text.primary)}55`
	},
	number: {
		...theme.typography.h4,
		color: theme.palette.secondary.main
	},
	text: {
		fontSize: "1rem",
		color: `${convertHex3To6(theme.palette.text.primary)}aa`
	}
}));

const GlobalStatsComponent = ({ className }) => {
	const classes = useStyles();
	const { stats, updateStats, isLoading } = useStats();

	return (
		<Grid
			container
			spacing={2}
			justify="space-evenly"
			className={`${classes.root} ${className}`}
		>
			{" "}
			<Grid item md={3}></Grid>
			<Grid item xs={12} sm={"auto"} className={classes.stat}>
				<FileCodeOutline className={classes.icon} />
				<WaitingNum isLoading={isLoading} className={classes.number}>
					{stats.totalSolutions}
				</WaitingNum>
				<div className={classes.text}>Total Submissions</div>
			</Grid>
			<Grid item xs={12} sm={"auto"} className={classes.stat}>
				<CalendarMonth className={classes.icon} />
				<WaitingNum isLoading={isLoading} className={classes.number}>
					{stats.todaysSolutions}
				</WaitingNum>
				<div className={classes.text}>{`${new Date().toLocaleDateString(
					undefined,
					{
						month: "short",
						day: "numeric"
					}
				)} Submissions`}</div>
			</Grid>
			<Grid item xs={12} sm={"auto"} className={classes.stat}>
				<AccountGroup className={classes.icon} />
				<WaitingNum isLoading={isLoading} className={classes.number}>
					{stats.totalUsers}
				</WaitingNum>
				<div className={classes.text}>Total Students</div>
			</Grid>
			<Grid item md={3}></Grid>
		</Grid>
	);
};

const WaitingNum = ({ isLoading, children: num, className }) => (
	<div className={className}>
		{isLoading ? (
			<CircularProgress color="secondary" size={25} />
		) : (
			<CountUp start={0} end={num} duration={3} />
		)}
	</div>
);

export default GlobalStatsComponent;
