import React, { forwardRef } from "react";

//import Dot from "../graphic/Dot.js";

import "../../assets/css/components/aboutmetext.css";

const AboutMeText = (props) => {
	let { text, className } = props;

	return (
		<div className={`aboutmetext_container ${className}`}>
			{text.split('\n').map(paragraph => (
				<p>{paragraph}</p>
			))}
		</div>
	)
}

export default AboutMeText;