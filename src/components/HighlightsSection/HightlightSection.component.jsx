import React, { Fragment, useEffect } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Typography } from "@material-ui/core";
import useRecent from "../../hooks/useRecent";
import useLoved from "../../hooks/useLoved";
import CarouselComponent from "../Carousel/Carousel.component";
import { useStyles, PinkRadio, BlueRadio } from "./Highlights.styles";

function HiglightsSection({ data }) {
	const classes = useStyles();
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
	}, [dataObj, radioValue]);

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
						control={<BlueRadio color="default" />}
						label="Most Recent"
						labelPlacement="start"
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
