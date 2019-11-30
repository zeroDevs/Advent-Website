import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Typography } from "@material-ui/core";
import useRecent from "../../hooks/useRecent";
import useLoved from "../../hooks/useLoved";
import CarouselComponent from "../Carousel/Carousel.component";

const useStyles = makeStyles(theme => ({
	title: {
		padding: "50px 0 0 0",
		textAlign: "center"
	},
	radio: {
		display: "flex",
		justifyContent: "center",
		padding: "10px 50px"
	},
	solutionsContainer: {
		marginBottom: "50px"
	}
}));

const PinkRadio = withStyles({
	root: {
		color: pink[400],
		"&$checked": {
			color: pink[600]
		}
	},
	checked: {}
})(props => <Radio color="default" {...props} />);

function HiglightsSection({ data }) {
	const classes = useStyles();
	const dataObj = {
		"Most Recent": useRecent(),
		"Most Loved": useLoved()
	};

	const [apiData, setApiData] = React.useState(dataObj["Most Recent"]);

	const [radioValue, setRadioValue] = React.useState("Most Recent");
	const handleChange = event => {
		setRadioValue(event.target.value);
		if (event.target.value === "Most Recent")
			setApiData(dataObj["Most Recent"]);
		else setApiData(dataObj["Most Loved"]);
	};

	useEffect(() => {
		setApiData(dataObj[radioValue]);
	}, [dataObj[radioValue]]);

	return (
		<Fragment>
			<Typography className={classes.title} variant="h3" color="textSecondary">
				{radioValue} Submissions
			</Typography>
			<div className={classes.radio}>
				<RadioGroup
					aria-label="position"
					name="position"
					value={radioValue}
					onChange={handleChange}
					row
				>
					<FormControlLabel
						value="Most Recent"
						control={<Radio color="primary" />}
						label="Most Recent"
						labelPlacement="center"
						className={classes.radio}
					/>
					<FormControlLabel
						value="Most Loved"
						control={<PinkRadio color="default" />}
						label="Most Loved"
						labelPlacement="end"
					/>
				</RadioGroup>
			</div>
			<div className={classes.solutionsContainer}>
				<CarouselComponent data={apiData} />
			</div>
		</Fragment>
	);
}

export default HiglightsSection;
