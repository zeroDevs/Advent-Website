import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormControl, MenuItem, InputLabel } from "@material-ui/core";
import { Link } from "react-router-dom";

import makeStyles from "@material-ui/core/styles/makeStyles";

const listOfLangs = require("../../configs/languages.json");

const useStyles = makeStyles(theme => ({
	input: {
		margin: theme.spacing(2, 0)
	},
	infoContainer: {
		height: theme.spacing(12),
		marginTop: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		"& :not(:first-child)": {
			marginTop: theme.spacing(2)
		}
	},
	statusMessage: {
		color: theme.palette.error.main
	},
	row: ({ isMobile }) =>
		isMobile
			? {
					display: "flex",
					flexDirection: "column",
					"&> *": {
						width: "100%"
					}
			  }
			: {
					display: "flex",

					"&> *": {
						flexBasis: 0,
						flexGrow: 1
					},
					"&> :not(:last-child)": {
						marginRight: theme.spacing(2)
					}
			  },
	name: {
		...theme.typography.h5,
		textAlign: "center"
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

function SubmitForm({ user }) {
	const [date, setDate] = useState(Date.now());
	const [url, setUrl] = useState("");
	const [langName, setLangName] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

	const userName = user ? `${user.username}#${user.discriminator}` : "";
	const avatarUrl = user
		? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`
		: "images/user-unknown.png";

	const classes = useStyles({ isMobile });

	const handleSubmit = async event => {
		event.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		setErrorMessage("");

		if (!validateURL(url)) {
			setIsLoading(false);
			return setErrorMessage(
				"Invalid URL. Please use GitHub or GitHub Gist or repl.it to submit code."
			);
		}

		let body;

		try {
			body = JSON.stringify({
				userName,
				url,
				date,
				langName,
				avatarUrl,
				userId: user.id
			});
		} catch (error) {
			setErrorMessage("Invalid input");
			return setIsLoading(false);
		}

		const submissionEndpoint = "https://aocbot.zerobot.xyz/api/submit";
		const { isSuccessful, error } = await fetch(submissionEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("token")} `
			},
			body
		});

		if (isSuccessful) {
			console.log("isSuccessful", isSuccessful);
		} else {
			console.log("isNotSuccessful", error);
			setErrorMessage(error);
			setIsLoading(false);
		}
	};

	const handleUrlInputChange = event => {
		setUrl(event.target.value);
	};
	const handleLangNameInputChange = event => {
		setLangName(event.target.value);
	};
	const handleDateChange = date => {
		setDate(date);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={classes.infoContainer}>
					{user ? (
						<>
							<div className={classes.name}>{userName}</div>
							{errorMessage ? (
								<div className={classes.statusMessage}>{errorMessage}</div>
							) : null}
						</>
					) : (
						<Button
							variant="contained"
							color="secondary"
							to={{
								pathname: "/login",
								state: { from: "/submit" }
							}}
							component={Link}
						>
							Please Login
						</Button>
					)}
				</div>
				{/* <TextField
					className={classes.input}
					label="Username"
					type="text"
					value={userName}
					disabled
					fullWidth
				/> */}{" "}
				<div className={classes.row}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
							format="MM/dd/yyyy"
							id="date-picker-inline"
							label="Advent Challenge Date"
							value={date}
							onChange={handleDateChange}
						/>
					</MuiPickersUtilsProvider>
					{/* <TextField
						className={classes.input}
						label="Advent Challenge Date"
						type="date"
						value={date}
						onChange={handleDateChange}
						InputLabelProps={{
							shrink: true
						}}
						fullWidth
					/> */}
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-placeholder-label-label">
							Language
						</InputLabel>
						<Select
							labelId="demo-simple-select-placeholder-label-label"
							id="demo-simple-select-placeholder-label"
							value={langName}
							onChange={handleLangNameInputChange}
							// displayEmpty
							className={classes.selectEmpty}
						>
							{Object.keys(listOfLangs).map(lang => (
								<MenuItem key={lang} value={lang}>
									{lang}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{/* <Select
						native
						label="Language"
						value={langName}
						className={classes.input}
						onChange={handleLangNameInputChange}
						fullWidth
					>
						{Object.keys(listOfLangs).map(lang => (
							<option key={lang} value={lang}>
								{lang}
							</option>
						))}
					</Select> */}
				</div>
				<TextField
					className={classes.input}
					label="Solution Url"
					type="text"
					value={url}
					onChange={handleUrlInputChange}
					fullWidth
				/>
			</form>
			<Button
				variant="contained"
				color="secondary"
				onClick={handleSubmit}
				fullWidth
				disabled={!user}
			>
				{isLoading ? (
					<CircularProgress color="secondary" size={25} />
				) : (
					"Submit"
				)}
			</Button>
		</>
	);
}

export default SubmitForm;

/**
 * Validate URL. Allow form tobe submitted if the URL is from
 * github repository or github gist or repl.it
 */

function validateURL(url = "") {
	if (
		!url.match(
			/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
		)
	) {
		return false;
	}

	const { hostname, pathname } = new URL(url);
	let flag = false;

	// eslint-disable-next-line
	switch (hostname) {
		case "www.github.com":
			flag = true;
			break;

		case "github.com":
			flag = true;
			break;

		case "gist.github.com":
			flag = true;
			break;

		case "repl.it":
			flag = true;
			break;

		case "www.repl.it":
			flag = true;
			break;
	}

	if (!pathname || pathname === "/") flag = false;

	return flag;
}
