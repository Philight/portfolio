import React, { forwardRef } from "react";

//import Dot from "../graphic/Dot.js";
import TypeWriter from "@components/animation/TypeWriter.js";

import "@css/components/quote.css";

const Quote = (props) => {
	let { label, className } = props;

	const ANIM_DURATION = 40;

	return (
		<h3 className={`quote__container ${className}`}>
			<TypeWriter text={label} animationDuration={ANIM_DURATION} />
		</h3>
	)
}

export default Quote;