import React, { forwardRef } from "react";

//import chevronLeftIcon from "../../assets/icons/chevron-left.svg";

//import Dot from "../graphic/Dot.js";

import "@css/components/heading.css";

const Heading = (props) => {
	let { numbering, label, className } = props;

	return (
		<h3 className={`heading__container flex-center-v ${className}`}>
			{numbering}
			<canvas className={`heading__divider`}/>
			{label}
		</h3>
	)
}

export default Heading;