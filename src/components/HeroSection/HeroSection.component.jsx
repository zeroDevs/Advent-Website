import React from "react";
import PropTypes from "prop-types";

import './HeroSection.styles.css'

function HeroSection({ children }) {
	return (
		<div className="root">
			<div className="content">{children}</div>
		</div>
	);
}

HeroSection.propTypes = {
	children: PropTypes.node
};

export default React.memo(HeroSection);
