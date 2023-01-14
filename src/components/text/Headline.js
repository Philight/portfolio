import React, { forwardRef } from "react";

//import chevronLeftIcon from "../../assets/icons/chevron-left.svg";

import Dot from "@components/graphic/Dot.js";
import TypeWriter from "@components/animation/TypeWriter.js";

import "@css/components/headline.css";

const Headline = (props) => {
	let { icon, width, height, className, onClick } = props;

	const ANIM_DURATION = 120;

	return (
		<div className={`headline__container ${className}`}>
			<h2><TypeWriter text={`Web Developer`} animationDuration={ANIM_DURATION} /><Dot left={6} bottom={5}/></h2>
			<h2><TypeWriter text={`Web Designer`} animationDuration={ANIM_DURATION} /></h2>
			<h2><TypeWriter text={`UI Designer`} animationDuration={ANIM_DURATION} /></h2>
			<h2><TypeWriter text={`Technologist`} animationDuration={ANIM_DURATION} /></h2>
		</div>
	)
}

export default Headline;