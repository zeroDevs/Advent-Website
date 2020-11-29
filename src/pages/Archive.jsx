import React from "react";

import ArchiveTabComponent from "../components/ArchiveTab/ArchiveTab.component";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#fff",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const TabPanel = (props) => {
  const { component: Component, year, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Component year={year} />}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: theme.palette.secondary,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  padding: {
    padding: theme.spacing(3),
  },
  tabCont: {
    backgroundColor: theme.palette.primary,
  },
}));

const Archive = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log("value", newValue);
    setValue(newValue);
  };

  const years = [];
  for(let i=2018; i<(new Date().getFullYear()); i++) {
    years.push(i);
  }

  return (
    <div className={classes.root}>
      <div className={classes.tabCont}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
          variant="scrollable"
          position="fixed"
          scrollButtons="on">
          {
            years.map(year => (
              <StyledTab key={year} label={year} {...a11yProps(year)} />
            ))
          }
        </StyledTabs>
        <Typography className={classes.padding} />
        {
          years.map((year, index) => (
            <TabPanel component={ArchiveTabComponent} key={year} year={year} value={value} index={index} />
          ))
        }
      </div>
    </div>
  );
}

export default Archive;