import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import useStats from "../../hooks/useStats";

import { FileCodeOutline, CalendarMonth, AccountGroup } from "mdi-material-ui";
import { useTheme } from "@material-ui/styles";
import { CircularProgress, Grid, useMediaQuery } from "@material-ui/core";
import CountUp from "react-countup";

const convertHex3To6 = hex =>
	hex.length === 4
		? hex
				.split("")
				.reduce((acc, item, index) => acc + (index > 0 ? item : "") + item, "")
		: hex;

const useStyles = makeStyles(theme => ({
	root: ({ isMobile }) => ({
		marginTop: theme.spacing(3),
		...(isMobile
			? {
					justifyContent: "space-evenly",
					flexDirection: "column"
			  }
			: {
					justifyContent: "center",
					flexDirection: "row"
			  })
	}),
	stat: ({ isMed }) => ({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		margin: `0px ${theme.spacing(isMed ? 3 : 5)}px`
	}),
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
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const isMed = useMediaQuery(theme.breakpoints.between("sm", "md"));
	const classes = useStyles({ isMed, isMobile });
	// eslint-disable-next-line no-unused-vars
	const { stats, updateStats, isLoading } = useStats();

	return (
		<Grid container justify="center" className={`${classes.root} ${className}`}>
			<Grid className={classes.stat}>
				<FileCodeOutline className={classes.icon} />
				<WaitingNum isLoading={isLoading} className={classes.number}>
					{stats.totalSolutions}
				</WaitingNum>
				<div className={classes.text}>Total Submissions</div>
			</Grid>
			<Grid className={classes.stat}>
				<CalendarMonth className={classes.icon} />
				<WaitingNum isLoading={isLoading} className={classes.number}>
					{stats.todaysSolutions}
				</WaitingNum>
				<div className={classes.text}>{`${new Date(
					new Date().setMonth(11)
				).toLocaleDateString(undefined, {
					month: "short",
					day: "numeric"
				})} Submissions`}</div>
			</Grid>
			<Grid className={classes.stat}>
				<AccountGroup className={classes.icon} />
				<WaitingNum isLoading={isLoading} className={classes.number}>
					{stats.totalUsers}
				</WaitingNum>
				<div className={classes.text}>Total Students</div>
			</Grid>
		</Grid>
	);
};

const WaitingNum = ({ isLoading, children: num, className }) => (
	<div className={className}>
		{isLoading ? (
			<CircularProgress color="secondary" size={25} />
		) : (
			<CountUp start={0} end={num || 0} duration={3} />
		)}
	</div>
);

export default GlobalStatsComponent;
