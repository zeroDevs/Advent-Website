import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import makeStyles from "@material-ui/core/styles/makeStyles";

const listOfLangs = require("../../configs/languages.json");

const useStyles = makeStyles(theme => ({
	input: {
		margin: theme.spacing(2, 0)
	},
	statusMessage: {
		color: theme.palette.error.main,
		height: theme.spacing(8),
		marginTop: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
}));

function SubmitForm({ userName, avatarHash, userId, handleClose }) {
	const [date, setDate] = useState("2019-12-01");
	const [url, setUrl] = useState("");
	const [langName, setLangName] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=1024`;

	const classes = useStyles();

	const handleSubmit = async event => {
		event.preventDefault();
		setIsLoading(true);
		setErrorMessage("");

		if (!validateURL(url)) {
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
				userId
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
			handleClose();
		} else {
			console.log("isNotSuccessful", error);
			setErrorMessage(error);
			setIsLoading(false);
		}
	};

	const handleUrlInputChange = event => setUrl(event.target.value);
	const handleLangNameInputChange = event => setLangName(event.target.value);
	const handleDateChange = event => setDate(event.target.value);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={classes.statusMessage}>{errorMessage}</div>

				<TextField
					className={classes.input}
					label="Username"
					type="text"
					value={userName}
					disabled
					fullWidth
				/>

				<TextField
					className={classes.input}
					label="Advent Challenge Date"
					type="date"
					value={date}
					onChange={handleDateChange}
					className={classes.textField}
					InputLabelProps={{
						shrink: true
					}}
					fullWidth
				/>

				<TextField
					className={classes.input}
					label="Solution Url"
					type="text"
					value={url}
					onChange={handleUrlInputChange}
					fullWidth
				/>

				<Select
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
				</Select>
			</form>
			<Button
				variant="contained"
				color="secondary"
				onClick={handleSubmit}
				fullWidth
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

SubmitForm.propTypes = {
	userName: PropTypes.string.isRequired,
	handleClose: PropTypes.func.isRequired
};

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
