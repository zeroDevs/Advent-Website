import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "./style.css";

function ScrollToTop() {
	return (
		<ScrollUpButton
			ContainerClassName="STTContainer"
			TransitionClassName="STTTransition"
			ShowAtPosition={500}
		>
			<div>
				<ArrowUpwardIcon />
			</div>
		</ScrollUpButton>
	);
}

export default ScrollToTop;
