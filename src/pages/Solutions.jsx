import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import {
	Search as SearchIcon,
	FilterList as FiltersIcon,
	Add as AddIcon
} from "@material-ui/icons";

import Filters from "../components/Filters/Filters.component";
import Card from "../components/Card/Card.component";
import SolutionDrawer from "../components/SolutionDrawer";
import {
	sortByDate,
	sortByName,
	filterByDates,
	filterByLanguage
} from "../utils/sorts";
import useSolutions from "../hooks/useSolutions";
import useDrawer from "../hooks/useDrawer";

import MetaTags from '../components/MetaTags/MetaTags.component'
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		margin: theme.spacing(0, 2)
	},
	filtersBox: {
		margin: theme.spacing(1)
	},
	solutionsContainer: {
		flex: 1,
		display: "flex",
		flexWrap: "wrap"
	},
	emptyMessage: {
		flex: 1,
		textAlign: "center"
	},
	optionsContianer: {
		display: "flex",
		justifyContent: "center",
		marginBottom: theme.spacing(4)
	},
	option: {
		margin: theme.spacing(1)
	},
	searchFieldContainer: {
		display: "flex",
		justifyContent: "center",
		margin: theme.spacing(1)
	},
	controlls: {
		margin: theme.spacing(4, 0),
		width: "250px",
		marginLeft: "auto",
		marginRight: "auto"
	},
	loading: {
		display: "flex",
		justifyContent: "center",
		margin: theme.spacing(0, 2)
	}
}));

function Solutions(props) {
	const dataFromApi = useSolutions();
	const { isOpen, handleClose, toggle: toggleFiltersDrawer } = useDrawer();
	const [solutions, setSolutions] = useState([]);

	const [showSearch, setShowSearch] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [isLoadingData, setIsLoadingData] = useState(false)

	const handleShowSearch = () => setShowSearch(!showSearch);
	const handleTextInput = event => setSearchText(event.target.value);

	const classes = useStyles();

	useEffect(() => {
		setSolutions(dataFromApi);
		setIsLoadingData(!isLoadingData)
	}, [dataFromApi]);

	const applyFilters = (dateRange, selectedLangs, dateSort, nameSort) => {
		let copyOfMainData = [...dataFromApi];

		if (dateRange) {
			copyOfMainData = filterByDates(
				dateRange[0],
				dateRange[1],
				copyOfMainData
			);
		}

		if (selectedLangs) {
			copyOfMainData = filterByLanguage(selectedLangs, copyOfMainData);
		}

		if (dateSort) {
			copyOfMainData = sortByDate(copyOfMainData, dateSort);
		}

		if (nameSort) {
			copyOfMainData = sortByName(copyOfMainData, nameSort);
		}

		setSolutions(copyOfMainData);
	};

	const filteredSolutions = solutions.filter(
		solution =>
			solution.userName &&
			solution.userName.toLowerCase().includes(searchText.toLowerCase())
	);

	const hasSolutionsToShow = filteredSolutions && filteredSolutions.length > 0;
	
	let { title, description, pageUrl } = props
	title = "Advent of Code Solutions"
	description = "Solutions to Advent of Code from the Zero to Mastery Community."
	pageUrl = "https://aoc.zerotomastery.io/solutions"

	return (
		<>
			<MetaTags title={title} description={description} pageUrl={pageUrl} />
			<SolutionDrawer isOpen={isOpen} handleDrawerClose={handleClose}>
				<Filters applyFilters={applyFilters} />
			</SolutionDrawer>

			<div className={classes.controlls}>
				{showSearch && (
					<div className={classes.searchFieldContainer}>
						<TextField
							id="nameSearch"
							label="Username"
							margin="normal"
							color="secondary"
							value={searchText}
							onChange={handleTextInput}
							className={classes.textField}
							fullWidth
						/>
					</div>
				)}
				<div className={classes.optionsContianer}>
					<Button
						variant="outlined"
						className={classes.option}
						onClick={handleShowSearch}
					>
						<SearchIcon fontSize="large" />
					</Button>
					<Button
						variant="outlined"
						className={classes.option}
						onClick={toggleFiltersDrawer}
					>
						<FiltersIcon fontSize="large" />
					</Button>
					<Button
						variant="outlined"
						className={classes.option}
						to="/submit"
						component={Link}
					>
						<AddIcon fontSize="large" />
					</Button>
				</div>
			</div>
		
			{isLoadingData && <div className={classes.loading}><CircularProgress color="secondary" thickness={5} size={75} /></div>}
			
			<div className={classes.container}>
				<div className={classes.solutionsContainer}>

					{hasSolutionsToShow &&
						filteredSolutions.map(user => (
							<Card
								key={user.username + user._id}
								avatarUrl={user.avatarUrl}
								username={user.userName}
								date={user.Time}
								day={user.dayNumber}
								solutionUrl={user.url}
								langName={user.langName}
							/>
						))}
						
					{!hasSolutionsToShow && !isLoadingData &&(
						<Typography
							className={classes.emptyMessage}
							variant="h6"
							color="textSecondary"
						>
							Nothing to show
						</Typography>
					)}
				</div>
			</div>
		</>
	);
}

export default React.memo(Solutions);
