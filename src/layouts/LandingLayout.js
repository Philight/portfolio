import React from "react";

import Navigation from "../components/layout/Navigation.js";

import "../assets/css/layouts/landinglayout.css";

const LandingLayout = ( {children} ) => {
//	let { className, description } = props;

	return (
		<div className={`
			landinglayout__container page-padding 
		`}>
			<Navigation />
			{children}
		</div>
	)
}

export default LandingLayout;