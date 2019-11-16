import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
	root: {
		width: "300px",
		padding: theme.spacing(2),
		backgroundColor: theme.palette.background.paper,
		position: "sticky",
		top: 80
	},
	rangeNumbersContainer: {
		display: "flex",
		justifyContent: "space-between"
	},
	rangeNumbers: {
		color: "yellow"
	},
	container: {
		position: "relative",
		margin: theme.spacing(2, 0)
	},
	clear: {
		position: "absolute",
		top: 0,
		right: 0
	},
	clearIcon: {
		color: theme.palette.text.secondary,
		cursor: "pointer",
		zIndex: 2000
	},
	flexContainer: {
		display: "flex"
	},
	leftColumn: {
		marginRight: theme.spacing(4)
	},
	applyButton: {
		marginTop: theme.spacing(1)
	},
	label: {
		marginBottom: theme.spacing(1)
	},
	formControlOverride: {
		position: "initial"
	}
}));

const defaultConfig = {
	dateRange: [1, 25],
	languages: {
		// JavaScript: true,
		javascript: true,
		python: true,
		ruby: true,
		// Python: true,
		Java: true,
		C: true,
		"C#": true,
		"C++": true,
		Elixir: true,
		Go: true,
		Rust: true
	}
};

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
					<Divider />
					<NameSort
						nameSort={nameSort}
						handleChange={handleChangeNameSort}
						handleClear={handleClear("name")}
					/>
				</div>
				<div className={classes.rightColumn}>
					<LanguageSelector
						selectedLangs={selectedLangs}
						handleChange={handleChangeLangSelect}
						handleClear={handleClear("lang")}
					/>
				</div>
			</div>

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

function DaySelector({ dateRange, handleChange }) {
	const classes = useStyles();

	return (
		<div className={classes.dateSlider}>
			<div className={classes.rangeNumbersContainer}>
				<Typography variant="body1" color="textSecondary">
					Day range
				</Typography>
				<Typography variant="body1" className={classes.rangeNumbers}>
					{`${dateRange[0]} - ${dateRange[1]}`}
				</Typography>
			</div>
			<Slider
				name="daySlider"
				color="secondary"
				value={dateRange}
				onChange={handleChange}
				valueLabelDisplay="auto"
				max={25}
				min={1}
				marks
			/>
		</div>
	);
}

function LanguageSelector({ selectedLangs, handleChange, handleClear }) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.clear}>
				<CancelIcon
					className={classes.clearIcon}
					onClick={handleClear}
					fontSize="small"
				/>
			</div>
			<FormControl
				component="fieldset"
				color="secondary"
				className={classes.formControl}
				classes={{ root: classes.formControlOverride }}
			>
				<FormLabel className={classes.label} component="legend">
					Languages
				</FormLabel>
				<FormGroup>
					{Object.keys(selectedLangs).map(language => (
						<FormControlLabel
							key={language}
							control={
								<Checkbox
									checked={selectedLangs[language]}
									onChange={handleChange(language)}
									value={language}
								/>
							}
							label={language}
						/>
					))}
				</FormGroup>
			</FormControl>
		</div>
	);
}

function DateSort({ dateSort, handleChange, handleClear }) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.clear}>
				<CancelIcon
					className={classes.clearIcon}
					onClick={handleClear}
					fontSize="small"
				/>
			</div>

			<FormControl
				component="fieldset"
				color="secondary"
				className={classes.DateSort}
				classes={{ root: classes.formControlOverride }}
			>
				<FormLabel className={classes.label} component="legend">
					Date
				</FormLabel>
				<RadioGroup name="dateAge" value={dateSort} onChange={handleChange}>
					<FormControlLabel value="asc" control={<Radio />} label="Oldest" />
					<FormControlLabel value="desc" control={<Radio />} label="Newest" />
				</RadioGroup>
			</FormControl>
		</div>
	);
}

function NameSort({ nameSort, handleChange, handleClear }) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.clear}>
				<CancelIcon
					className={classes.clearIcon}
					onClick={handleClear}
					fontSize="small"
				/>
			</div>
			<FormControl
				component="fieldset"
				color="secondary"
				className={classes.DateSort}
				classes={{ root: classes.formControlOverride }}
			>
				<FormLabel className={classes.label} component="legend">
					Name
				</FormLabel>
				<RadioGroup name="nameSort" value={nameSort} onChange={handleChange}>
					<FormControlLabel value="asc" control={<Radio />} label="A-Z" />
					<FormControlLabel value="desc" control={<Radio />} label="Z-A" />
				</RadioGroup>
			</FormControl>
		</div>
	);
}

export default React.memo(Filters);
