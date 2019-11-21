import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import DateSort from "./DateSort.component";
import NameSort from "./NameSort.component";
import DaySelector from "./DaySelector.component";
import LanguageSelector from "./LanguageSelector.component";

const listOfLangs = require("../../configs/languages.json");

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.background.paper
	},
	flexContainer: {
		display: "flex"
	},
	leftColumn: {
		marginRight: theme.spacing(4)
	},
	applyButton: {
		marginTop: theme.spacing(1)
	}
}));

const defaultConfig = {
	dateRange: [1, 25],
	languages: {}
};

listOfLangs.map(lang => (defaultConfig.languages[lang] = true));

function Filters({ applyFilters }) {
	const [dateRange, setDateRange] = useState(defaultConfig.dateRange);
	const [selectedLangs, setSelectedLangs] = useState(defaultConfig.languages);
	const [dateSort, setDateSort] = useState("");
	const [nameSort, setNameSort] = useState("");
	const classes = useStyles();

	const handleClear = type => {
		switch (type) {
			case "name":
				return () => setNameSort("");
			case "date":
				return () => setDateSort("");
			case "lang":
				return () => setSelectedLangs(defaultConfig.languages);
			default:
				return () => {};
		}
	};

	const handleChangeNameSort = event => setNameSort(event.target.value);

	const handleChangeDateSort = event => setDateSort(event.target.value);

	const handleChangeLangSelect = name => event =>
		setSelectedLangs({ ...selectedLangs, [name]: event.target.checked });

	const handleChangeDaysSelect = (_, newValue) => setDateRange(newValue);

	const handleClearAll = () => {
		setNameSort("");
		setDateSort("");
		setSelectedLangs(defaultConfig.languages);
		setDateRange(defaultConfig.dateRange);
	};

	const handleApplyFilters = () => {
		const languagesArray = Object.keys(selectedLangs).filter(
			lang => selectedLangs[lang]
		);
		applyFilters(dateRange, languagesArray, dateSort, nameSort);
	};

	return (
		<div className={classes.root}>
			<DaySelector
				dateRange={dateRange}
				handleChange={handleChangeDaysSelect}
			/>

			<Divider />

			<div className={classes.flexContainer}>
				<div className={classes.leftColumn}>
					<DateSort
						dateSort={dateSort}
						handleChange={handleChangeDateSort}
						handleClear={handleClear("date")}
					/>
				</div>
				<NameSort
					nameSort={nameSort}
					handleChange={handleChangeNameSort}
					handleClear={handleClear("name")}
				/>
			</div>

			<Divider />

			<LanguageSelector
				selectedLangs={selectedLangs}
				handleChange={handleChangeLangSelect}
				handleClear={handleClear("lang")}
			/>

			<Button
				variant="contained"
				color="secondary"
				onClick={handleClearAll}
				fullWidth
			>
				Reset
			</Button>

			<Button
				className={classes.applyButton}
				variant="contained"
				color="primary"
				onClick={handleApplyFilters}
				fullWidth
			>
				Apply
			</Button>
		</div>
	);
}

export default React.memo(Filters);
