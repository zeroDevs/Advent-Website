import React, { useState, useEffect } from "react";
import { CometSpinLoader } from 'react-css-loaders'
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

import UserCard from "../components/Card/UserCard.component";
import useUsers from "../hooks/useUsers";

import MetaTags from '../components/MetaTags/MetaTags.component'

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
	}
}));

function Leaderboard(props) {
	const dataFromApi = useUsers();
	const [users, setUsers] = useState([]);

	const [showSearch, setShowSearch] = useState(false);
	const [searchText, setSearchText] = useState("");

	const handleShowSearch = () => setShowSearch(!showSearch);
	const handleTextInput = event => setSearchText(event.target.value);

	const classes = useStyles();

	useEffect(() => {
		setUsers(dataFromApi);
	}, [dataFromApi]);

	const filteredUsers = users.filter(
		user =>
			user.username &&
			user.username.toLowerCase().includes(searchText.toLowerCase())
	);

	//sort the user array in descending order
	filteredUsers.sort((a, b) => b.point - a.point);

	const hasUsersToShow = filteredUsers && filteredUsers.length > 0;
	
	let { title, description, pageUrl } = props
	title = "Advent of Code Leaderboard"
	description = "Event Leaderboard."
	pageUrl = "https://aoc.zerotomastery.io/leaderboard"

	return (
		<>
			<MetaTags title={title} description={description} pageUrl={pageUrl} />

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

			<div className={classes.container}>
				<div className={classes.usersContainer}>
					{hasUsersToShow &&
						filteredUsers.map(user => (
							<UserCard
								key={user.username + user._id}
								avatarUrl={user.avatarUrl}
								username={user.username}
								langArray={user.langArray}
								point={user.point}
								index={filteredUsers.indexOf(user)}
							/>
						))}

					{!hasUsersToShow && (
						<CometSpinLoader />
					)}
				</div>
			</div>
		</>
	);
}

export default React.memo(Leaderboard);
