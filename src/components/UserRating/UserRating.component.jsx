import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		margin: theme.spacing(2, 0)
	}
}));

const StyledRating = withStyles({
	iconFilled: {
		color: "#ff6d75"
	},
	iconHover: {
		color: "#ff3d47"
	}
})(Rating);

function UserRating({ value, onChange }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<StyledRating
				name="solution-rating"
				value={value}
				precision={0.5}
				onChange={onChange}
				icon={<FavoriteIcon fontSize="inherit" />}
			/>
		</div>
	);
}

UserRating.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default React.memo(UserRating);
