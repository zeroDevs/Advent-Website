import React, { useState, useEffect } from "react";
import * as qs from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

import { Search as SearchIcon } from "@material-ui/icons";

import UserCard from "../components/Card/UserCard.component";
import useUsers from "../hooks/useUsers";

import MetaTags from "../components/MetaTags/MetaTags.component";
import LoadingCard from "../components/LoadingCard/LoadingCard.component";
import NothingToSee from "../components/NothingToSee/NothingToSee.component";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		margin: theme.spacing(0, 2)
	},
	filtersBox: {
		margin: theme.spacing(1)
	},
	usersContainer: {
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

function Leaderboard(props) {
	const queryParams = qs.parse(props.location.search);
	const dataFromApi = useUsers(queryParams.year);
	const [users, setUsers] = useState([]);
	const [isLoadingData, setIsLoadingData] = useState(false);

	const [showSearch, setShowSearch] = useState(false);
	const [searchText, setSearchText] = useState("");

	const handleShowSearch = () => setShowSearch(!showSearch);
	const handleTextInput = event => setSearchText(event.target.value);

	const classes = useStyles();

	useEffect(() => {
		setUsers(dataFromApi);
		setIsLoadingData(!isLoadingData);
	}, [dataFromApi, isLoadingData]);

	const filteredUsers = users.filter(
		user =>
			user.username &&
			user.username.toLowerCase().includes(searchText.toLowerCase())
	);

	//sort the user array in descending order
	filteredUsers.sort((a, b) => b.point - a.point);

	const hasUsersToShow = filteredUsers && filteredUsers.length > 0;

	let { title, description, pageUrl } = props;
	title = "Advent of Code Leaderboard";
	description = "Event Leaderboard.";
	pageUrl = "https://aoc.zerotomastery.io/leaderboard";
	console.log("1111", isLoadingData);
	return (
		<>
			<MetaTags title={title} description={description} pageUrl={pageUrl} />

			{isLoadingData && <LoadingCard>Loading Leaders...</LoadingCard>}

			{!isLoadingData && (
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
					</div>
				</div>
			)}

			{hasUsersToShow && !isLoadingData && (
				<div className={classes.container}>
					<div className={classes.usersContainer}>
						{filteredUsers.map(user => (
							<UserCard
								key={user.username + user._id}
								avatarUrl={user.avatarUrl}
								username={user.username}
								langArray={user.langArray}
								point={user.point}
								isZTM={user.isZTM}
								index={filteredUsers.indexOf(user)}
							/>
						))}
					</div>
				</div>
			)}

			{!hasUsersToShow && !isLoadingData && (
				<NothingToSee year={queryParams.year} />
			)}
		</>
	);
}

export default React.memo(Leaderboard);
