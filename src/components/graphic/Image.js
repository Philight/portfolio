import React, { forwardRef } from "react";

//import Dot from "../graphic/Dot.js";

//import "../../assets/css/components/image.css";

const Image = forwardRef((props, ref) => {
	let { source, width, height, className, onClick } = props;

	return (
		<figure className={`image__container ${className}`} 
			ref={ref} onClick={onClick}
		>
			<img src={source} />
		</figure>
	)
})

export default Image;