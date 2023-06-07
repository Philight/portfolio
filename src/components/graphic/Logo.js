import React, { forwardRef } from "react";

//import chevronLeftIcon from "../../assets/icons/chevron-left.svg";

import Dot from "../graphic/Dot.js";

import "../../assets/css/components/logo.css";

const Logo = forwardRef((props, ref) => {
	let { icon, width, height, className, onClick } = props;

	return (
		<figure className={`logo__container ${className}`} 
			ref={ref} onClick={onClick}
		>
			<h1>FL</h1>
			<Dot size={6} left={2.4} bottom={2.4} />
		</figure>
	)
})

export default Logo;