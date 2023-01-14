

import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//import Icon from "@components/graphic/Icon.js";

import "@css/components/skillstechnologies.css";

const SkillsTechnologies = (props) => {
	let { skills, className } = props;

	const [isMobile, setIsMobile] = useState(false);

	return (
		<div className={`
			skillstechnologies__container ${className}
		`}>
			<div className={`skillstechnologies__skills flex-center-v`}>
				{skills.map(skill => (
					<span className={`skillstechnologies__skill`}>{skill['label']}</span>
				))}
			</div>
		</div>
	)
}

export default SkillsTechnologies;