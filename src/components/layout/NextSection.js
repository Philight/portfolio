import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "@components/graphic/Icon.js";

import "@css/components/nextsection.css";

//const LANGUAGES = ['en', 'sk', 'de'];

const NextSection = (props) => {
	let { className, label, onClick } = props;

	const [isMobile, setIsMobile] = useState(false);
	const [activeLang, setLang] = useState(0);

	function usePrevious(value) {
	  const ref = useRef();
	  useEffect(() => {
	    ref.current = value;
	  });
	  return ref.current;
	}

	return (
		<div className={`
			nextsection__container 
			flex-center
			${className}
		`}
			onClick={onClick}
		>
			<a role="button" href="#" className={`nextsection__button flex-center-v`}>
				{label||"Click"}
				<Icon icon={`arrow-down-rounded`} width={18} height={18} className={`nextsection__icon`} />
			</a>
		</div>
	)
}

export default NextSection;