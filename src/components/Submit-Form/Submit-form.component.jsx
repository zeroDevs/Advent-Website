import React, { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormControl, MenuItem, InputLabel, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
import FaceIcon from "@material-ui/icons/Error";
import { red, purple, orange } from "@material-ui/core/colors";

import makeStyles from "@material-ui/core/styles/makeStyles";

const listOfLangs = require("../../configs/languages.json");

const useStyles = makeStyles(theme => ({
	protip: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "25px",

		"& p": {
			paddingLeft: "15px"
		}
	},
	chip: {
		borderColor: orange[500],
		color: orange[300],

		"& i": {
			color: orange[300]
		}
	},
	input: {
		width: "100%"
	},
	infoContainer: {
		minHeight: theme.spacing(12),
		marginTop: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		"& :not(:first-child)": {
			marginTop: theme.spacing(2)
		}
	},
	error: {
		color: theme.palette.error.main,
		textAlign: "center"
	},
	success: {
		color: "#2ed92e",
		textAlign: "center"
	},
	name: {
		...theme.typography.h5,
		textAlign: "center"
	}
}));

function SubmitForm({ user }) {
	const [date, setDate] = useState(1);
	const [url, setUrl] = useState("");
	const [langName, setLangName] = useState(Object.keys(listOfLangs)[0]);
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

	const userName = user ? `${user.username}#${user.discriminator}` : "";
	const avatarUrl = user
		? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`
		: "images/user-unknown.png";

	const classes = useStyles({ isMobile });

	const setErrorMessage = useCallback(msg => {
		setMessage(msg);
		setIsError(true);
	}, []);

	const setSuccessMessage = useCallback(msg => {
		setMessage(msg);
		setIsError(false);
	}, []);

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
		}).then(res => res.json());

		if (isSuccessful) {
			console.log("isSuccessful", isSuccessful);
			setSuccessMessage(
				`Submission Success!\n${langName} - ${date.toLocaleDateString()}`
			);
		} else {
			console.log("isNotSuccessful", error);
			setErrorMessage(error);
		}
		setIsLoading(false);
	};

	const handleUrlInputChange = event => {
		setUrl(event.target.value);
	};
	const handleLangNameInputChange = event => {
		setLangName(event.target.value);
	};
	const handleDateChange = event => {
		setDate(event.target.value);
	};

	const populateDates = () => {
		let i;
		const list = [];
		for (i = 1; i < 26; i++) {
			list.push(i);
		}
		return list;
	};

	return (
		<>
			<div className={classes.infoContainer}>
				{user ? (
					<>
						<div className={classes.name}>{userName}</div>
						{message ? (
							<div className={`${isError ? classes.error : classes.success}`}>
								{message.split("\n").reduce((acc, item, index, arr) => {
									acc.push(item);
									if (index !== arr.length - 1) acc.push(<br></br>);
									return acc;
								}, [])}
							</div>
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
			{user && (
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<FormControl
							className={classes.input}
							style={{ gridAreas: "lang" }}
						>
							<InputLabel id="daypicker">Challenge Day</InputLabel>
							<Select
								labelId="daypicker"
								id="daypicker-label"
								value={date}
								onChange={handleDateChange}
							>
								{populateDates().map(date => {
									return (
										<MenuItem key={date} value={date}>
											Day {date}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						{
							// 	<MuiPickersUtilsProvider utils={DateFnsUtils}>
							// 	<DatePicker
							// 		format="MM/dd/yyyy"
							// 		id="date-picker-inline"
							// 		label="Advent Challenge Date"
							// 		value={date}
							// 		onChange={handleDateChange}
							// 		className={classes.input}
							// 	/>
							// </MuiPickersUtilsProvider>
						}
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl
							className={classes.input}
							style={{ gridAreas: "lang" }}
						>
							<InputLabel id="demo-simple-select-placeholder-label-label">
								Language
							</InputLabel>
							<Select
								labelId="demo-simple-select-placeholder-label-label"
								id="demo-simple-select-placeholder-label"
								value={langName}
								onChange={handleLangNameInputChange}
							>
								{Object.keys(listOfLangs).map(lang => (
									<MenuItem key={lang} value={lang}>
										{lang}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<TextField
							style={{ gridAreas: "url" }}
							className={classes.input}
							label="Solution Url"
							type="text"
							value={url}
							onChange={handleUrlInputChange}
							fullWidth
						/>

						<div className={classes.protip}>
							<Chip
								className={classes.chip}
								icon={<FaceIcon />}
								label="TIP"
								color="secondary"
								variant="outlined"
							/>

							<p>Part 1 and Part 2 should be submitted in the same link!</p>
						</div>
					</Grid>

					<Grid item xs={12}>
						<Button
							style={{ gridAreas: "sub" }}
							variant="contained"
							color="secondary"
							onClick={handleSubmit}
							fullWidth
							disabled={!user}
							className={classes.input}
						>
							{isLoading ? (
								<CircularProgress color="secondary" size={25} />
							) : (
								"Submit"
							)}
						</Button>
					</Grid>
				</Grid>
			)}
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
			// eslint-disable-next-line
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
