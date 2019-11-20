import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Filters from "../components/Filters/Filters.component";
import Card from "../components/Card/Card.component";
import {
  sortByDate,
  sortByName,
  filterByDates,
  filterByLanguage
} from "../utils/sorts";

import useSolutions from "../hooks/useSolutions";

const useStyles = makeStyles(theme => ({
  root: {},
  spacer: {
    padding: theme.spacing(4, 0)
  },
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
    flexWrap: "wrap"
  },
  emptyMessage: {
    flex: 1,
    textAlign: "center"
  }
}));

function Solutions(props) {
  const dataFromApi = useSolutions();
  const [solutions, setSolutions] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    setSolutions(dataFromApi);
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

  const hasSolutionsToShow = solutions && solutions.length > 0;

  return (
    <>
      <div className={classes.spacer} />
      <div className={classes.container}>
        <div className={classes.filtersBox}>
          <Filters applyFilters={applyFilters} />
        </div>
        <div className={classes.solutionsContainer}>
          {hasSolutionsToShow &&
            solutions.map(user => (
              <Card
                key={user.username + user._id}
                avatarUrl={user.avatarUrl}
                username={user.userName}
                date={user.Time}
                day={user.dayNumber}
                solutionUrl={user.url}
                langName={user.langName}
              />
            ))}

          {!hasSolutionsToShow && (
            <Typography
              className={classes.emptyMessage}
              variant="h6"
              color="textSecondary"
            >
              Nothing to show
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Solutions);
