import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as qs from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, CircularProgress } from "@material-ui/core";

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
import useInfiniteScroll from "../hooks/useInfiniteScroll";

import MetaTags from "../components/MetaTags/MetaTags.component";
import NothingToSee from "../components/NothingToSee/NothingToSee.component";
import LoadingCard from "../components/LoadingCard/LoadingCard.component";

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
		[theme.breakpoints.down('xs')]: {
			justifyContent: "center",
		},
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
	},
	circularProgress: {
		color: "#fff",
		margin: "auto",
		borderRadius: "50%",
		boxShadow: "0 0 20px 5px rgba(255, 255, 255, .45)",
	},
}));

function Solutions(props) {
	const queryParams = qs.parse(props.location.search);
	const dataFromApi = useSolutions(queryParams.year);
	const { isOpen, handleClose, toggle: toggleFiltersDrawer } = useDrawer();
	const [solutions, setSolutions] = useState([]);

	const [showSearch, setShowSearch] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [isLoadingData, setIsLoadingData] = useState(false);

	const [listItems, setListItems] = useState([]);
	const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreSolutions);
	const [currentPointer, setCurrentPointer] = useState(0);

	function fetchMoreSolutions() {
		console.log('ping')
		setListItems((prevState) => [
			...prevState,
			...solutions.slice(currentPointer, currentPointer + 20)
		]);
		setCurrentPointer(currentPointer + 20);

		setIsFetching(false);
	}

	const handleShowSearch = () => setShowSearch(!showSearch);
	const handleTextInput = event => setSearchText(event.target.value);

	const classes = useStyles();

	useEffect(() => {
		setSolutions(dataFromApi);
		console.log(dataFromApi)
		setIsLoadingData(!isLoadingData);

		if(dataFromApi) {
			console.log('ping22')
			setListItems((prevState) => [
				...prevState,
				...dataFromApi.slice(0, 20)
			]);
			setCurrentPointer(20);
		}

		// eslint-disable-next-line
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
	
	const filteredSolutions = listItems.filter(
		solution =>
			solution.userName &&
			solution.userName.toLowerCase().includes(searchText.toLowerCase())
	);

	console.log(listItems)
	console.log(filteredSolutions)

	const hasSolutionsToShow = filteredSolutions && filteredSolutions.length > 0;

	let { title, description, pageUrl } = props;
	title = "Advent of Code Solutions";
	description =
		"Solutions to Advent of Code from the Zero to Mastery Community.";
	pageUrl = "https://aoc.zerotomastery.io/solutions";

	return (
		<>
			<MetaTags title={title} description={description} pageUrl={pageUrl} />

			{isLoadingData && <LoadingCard>Loading Solutions...</LoadingCard>}

			{!isLoadingData && (
				<div>
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
				</div>
			)}

			{hasSolutionsToShow && !isLoadingData && (
				<div className={classes.container}>
					<div className={classes.solutionsContainer}>
						{filteredSolutions.map(user => (
							<Card
								key={user.username + user._id}
								avatarUrl={user.avatarUrl}
								username={user.userName}
								userid={user.userid}
								date={user.Time}
								day={user.dayNumber}
								solutionUrl={user.url}
								langName={user.langName}
								ratings={user.averageRating}
								solutionId={user._id}
								isCarousel={false}
							/>
						))}
						{isFetching && (
							<CircularProgress
							className={classes.circularProgress}
								size={64}
								disableShrink
								thickness={4}
							/>
						)}
					</div>
				</div>
			)}

			{!hasSolutionsToShow && !isLoadingData && (
				<NothingToSee year={queryParams.year} />
			)}
		</>
	);
}

export default React.memo(Solutions);
