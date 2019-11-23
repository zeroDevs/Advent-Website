import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch, withRouter } from "react-router-dom";
// import MetaTags from './components/MetaTags/MetaTags.component'

import {
	useUserContext,
	USER_ACTION_TYPES
} from "./contexts/user/user.context";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import FourZeroFour from "./pages/FourZeroFour";

import Nav from "./components/Navigation/Navigation.component";

import { parseUrlParams } from "./utils/utils";
import endPoints from "./configs/endpoints.json";
import "./App.css";

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.default
	}
}));

function App({ location, location: { search }, history }) {
	const classes = useStyles();
	const [{ user }, userDispatch] = useUserContext();

	useEffect(() => {
		userDispatch({ type: USER_ACTION_TYPES.LOGIN });
	}, [userDispatch]);

	useEffect(() => {
		if (search) {
			const params = parseUrlParams(search);
			if (params.token) {
				userDispatch({ type: USER_ACTION_TYPES.LOGIN, payload: params.token });
			}
		}
	}, [search, userDispatch]);

	return (
		<React.Fragment>
			<CssBaseline />
			{/* <MetaTags /> */}
			<main className={classes.root}>
				<Nav className='navbar' />
				<section className='main-section'>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/about' component={About} />
						<Route exact path='/solutions' component={Solutions} />
						<Route
							from='/login'
							component={({ location }) => {
								window.location.replace(
									`${endPoints.backend}${endPoints.login}${
										location ? `?location=${location.state.from}` : ""
									}`
								);
								return null;
							}}
						/>
						<Route path='*' component={FourZeroFour} />
					</Switch>
				</section>
			</main>
		</React.Fragment>
	);
}

export default withRouter(App);
