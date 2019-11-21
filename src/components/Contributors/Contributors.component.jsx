import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import ContribCard from "./ContribCard.component";
import data from "./contributors.json";

const useStyles = makeStyles(theme => ({
  contributorsContainer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0)
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}));

function Contributors(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contributorsContainer}>
        <Typography
          align="center"
          color="textPrimary"
          variant="h3"
          gutterBottom
        >
          Contributors
        </Typography>
        <div className={classes.cardContainer}>
          {data.map(person => (
            <ContribCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </>
  );
}

export default React.memo(Contributors);
