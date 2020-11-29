import React, { useState, useEffect } from "react";

import {
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

import Card from "../Card/Card.component";
import LoadingCard from "../LoadingCard/LoadingCard.component";
import useSolutions from "../../hooks/useSolutions";

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
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dataFromApi = useSolutions(props.year);

  useEffect(() => {
    setSolutions(dataFromApi);
    console.log(dataFromApi);
    setIsLoading(!isLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFromApi]);

  return (
    <div>
      {isLoading && <LoadingCard>Loading Solutions...</LoadingCard>}
      {!isLoading && (
        <div className={classes.container}>
          <div className={classes.solutionsContainer}>
            {solutions.map(user => (
              <Card
                key={user.userName + user._id}
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
    </div>
  );
}

export default ArchiveTabComponent;