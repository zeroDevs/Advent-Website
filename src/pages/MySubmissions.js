import React,{ useState,useEffect,useRef } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import { useUserContext } from "../contexts/user/user.context";
import { sortByDay } from "../utils/sorts";

import MetaTags from "../components/MetaTags/MetaTags.component";
import LoginCard from "../components/LoginCard/LoginCard.component";
import LoadingCard from "../components/LoadingCard/LoadingCard.component";
import MiniCard from "../components/Card/MiniCard.component";
import ProfileCard from "../components/Card/ProfileCard.component";
import NothingToSee from "../components/NothingToSee/NothingToSee.component";

const useStyles = makeStyles(theme => ({
	profileContainer: {
		display: "flex",
		justifyContent: "center"
	},
	container: {
		margin: theme.spacing(1, 2)
	},
	yearHeading: {
		margin: theme.spacing(0.25, 0.5),
		fontSize: "20px"
	},
	solutionsContainer: {
		margin: theme.spacing(0.5, 1),
		display: "flex",
		[theme.breakpoints.down('xs')]: {
			justifyContent: "center",
		},
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center"
	}
}));

const MySubmissions = () => {

	const classes = useStyles();


	const userInfoRef = useRef(null);
	const userInfo = useUserContext()[0]["user"];

	const [dataFromApi,setDataFromApi] = useState({});
	const [isLoadingData,setIsLoadingData] = useState(true);

	const currentYearRef = useRef(new Date().getFullYear());
	const yearRef = useRef(2018);
	userInfoRef.current = userInfo ? userInfo : null;
	
	const subCountRef = useRef(0);
	const langRef = useRef({});
	const ratingRef = useRef([]);

	let title = "My Submissions | ZTM AoC";
	let description =
		"My Submissions for Advent of Code.";
	let pageUrl = "https://aoc.zerotomastery.io/my-submissions";

	useEffect(() => {
		if (userInfoRef.current) {
			if (yearRef.current < currentYearRef.current-1) {
				fetch(`https://aocbot.zerobot.app/archive/${yearRef.current}`)
				.then(async (response) => {
					let data = await response.json();
					data = yearRef.current === 2018 ? data.solutions : data;
					data = data.filter(user => user.avatarUrl.includes(`avatars/${userInfoRef.current.id}/`));
					data = data.map(user => {
						const updatedUser = {...user};
						updatedUser.Time = typeof updatedUser.Time === "object" ? updatedUser.Time.$date : updatedUser.Time;
						return updatedUser;
					})
					data = sortByDay(data);
					const prevData = {...dataFromApi};
					prevData[yearRef.current] = data;
					subCountRef.current += data.length;
					for (const sub of data) {
						langRef.current[sub.langName] = true;
						if (sub.averageRating) {
							ratingRef.current.push(sub.averageRating);
						}
					}
					setDataFromApi({...prevData});
					yearRef.current += 1;
				});
			}else if (yearRef.current === currentYearRef.current-1) {
				fetch("https://aocbot.zerobot.app/solutions")
				.then(async (response) => {
					let data = await response.json();
					data = data.filter(user => user.avatarUrl.includes(`avatars/${userInfoRef.current.id}/`));
					data = sortByDay(data);
					const prevData = {...dataFromApi};
					prevData[yearRef.current] = data;
					subCountRef.current += data.length;
					for (const sub of data) {
						langRef.current[sub.langName] = true;
						if (sub.averageRating) {
							ratingRef.current.push(sub.averageRating);
						}
					}
					setDataFromApi({...prevData});
					yearRef.current += 1;
					setIsLoadingData(prevValue => !prevValue);
				});
			}else {
				console.log(dataFromApi);
			}
		}
	},[dataFromApi]);

	return(
		<>
			<MetaTags title={title} description={description} pageUrl={pageUrl} />

			{
				userInfoRef.current ?
					isLoadingData ? 
						<LoadingCard>Loading Submissions...</LoadingCard>
						:
						<>
						<div className={classes.profileContainer}>
							<ProfileCard
								avatarUrl={`https://cdn.discordapp.com/avatars/${userInfoRef.current.id}/${userInfoRef.current.avatar}.png?size=1024`}
								username={`${userInfoRef.current.username}#${userInfoRef.current.discriminator}`}
								submissionCount={subCountRef.current}
								langCount={Object.keys(langRef.current).length}
								avgRating={ratingRef.current.length ? Math.round(ratingRef.current.reduce((acc,val) => acc+val,0)*100/ratingRef.current.length)/100 : 0}
							/>
						</div>
						{
							Object.keys(dataFromApi).sort((a,b) => b-a).map(year => (
								<div className={classes.container} key = {year}>
									<div className={classes.yearHeading}>{year}</div>
									<Divider />
									{
										dataFromApi[year].length ?
											<div className={classes.solutionsContainer}>
											{
												dataFromApi[year].map(user => (
													<MiniCard
														key={typeof user._id === "object" ? user.userName+user._id.$oid : user.userName+user._id}
														username={user.userName}
														date={typeof user.Time === "object" ? user.Time.$date : user.Time}
														day={Number(user.dayNumber)}
														solutionUrl={user.url}
														langName={user.langName}
														ratings={typeof user.averageRating === "number" ? user.averageRating : 0}							
													/>
												))
											}
											</div> :
											<NothingToSee year = {year}/>
									}
								</div>
								))
						}
						</>
					:
					<LoginCard pathname="my-submissions" />
			}
		</>
	);
}

export default React.memo(MySubmissions);