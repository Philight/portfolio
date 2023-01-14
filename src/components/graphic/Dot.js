import React, { forwardRef } from "react";

import "../../assets/css/components/dot.css";

const Dot = forwardRef((props, ref) => {
	let { size, left, bottom, className, onClick } = props;

	return (
		<canvas className={`dot__container ${className}`} 
			style={{ 
				width: size||6, height: size||6, 
				marginLeft: left||0, marginBottom: bottom||0 
			}}
			ref={ref} onClick={onClick}
		/>
	)
})

export default Dot;