import React, { useState, useEffect } from "react";

import {
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

import Card from "../Card/Card.component";
import LoadingCard from "../LoadingCard/LoadingCard.component";
import NothingToSee from "../NothingToSee/NothingToSee.component";
import useSolutions from "../../hooks/useSolutions";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const useStyles = makeStyles((theme) => ({
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

const ArchiveTabComponent = (props) => {
  const classes = useStyles();

  const [solutions, setSolutions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [currentPointer, setCurrentPointer] = useState(0);
  const dataFromApi = useSolutions(props.year);
  const [isError, setIsError] = useState(false);

  const fetchMoreSolutions = () => {
		console.log('ping')
		setListItems((prevState) => [
			...prevState,
			...solutions.slice(currentPointer, currentPointer + 20)
		]);
		setCurrentPointer(currentPointer + 20);

		setIsFetchingMore(false);
  }
  
  const [isFetchingMore, setIsFetchingMore] = useInfiniteScroll(fetchMoreSolutions);

  useEffect(() => {
    if(dataFromApi.error) setIsError(true);
    else setSolutions(dataFromApi.solutions);
    console.log(dataFromApi);
    setIsLoading(!isLoading);

    if(dataFromApi.solutions) {
			console.log('ping22')
			setListItems((prevState) => [
				...prevState,
				...dataFromApi.solutions.slice(0, 20)
			]);
			setCurrentPointer(20);
		}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFromApi]);

  return (
    <div>
      {isLoading && <LoadingCard>Loading Solutions...</LoadingCard>}
      {!isLoading && !isError && (
        <div className={classes.container}>
          <div className={classes.solutionsContainer}>
          {/* INFO: Rating is not available for 2018: hence hardcoded */}
            {listItems.map(user => (
              <Card
                key={user.userName + user._id}
                avatarUrl={user.avatarUrl}
                username={user.userName}
                userid={parseInt(user.userid)}
                date={user.Time}
                day={parseInt(user.dayNumber)}
                solutionUrl={user.url}
                langName={user.langName}
                ratings={props.year===2018 ? 5 : user.averageRating}
                solutionId={user._id}
                isCarousel={false}
                isArchiveCard={true}
              />
            ))}
            {isFetchingMore && (
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

      {isError && !isLoading && (
        <NothingToSee year={props.year} />
      )}
    </div>
  );
}

export default ArchiveTabComponent;