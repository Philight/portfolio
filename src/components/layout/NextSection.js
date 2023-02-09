import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "@components/graphic/Icon.js";

import "@css/components/nextsection.css";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const NextSection = (props) => {
	let { className, label, sectionRef, onClick } = props;

	const [isMobile, setIsMobile] = useState(false);

	const moveToSection = () => {
console.log(`### NextSection | moveToSection()`)
		if (sectionRef.current) {
//			sectionRef.current.scrollIntoView({behavior: "smooth", block: "nearest"})   
console.log(`### NextSection | sectionRef.current.getBoundingClientRect().top`)
//console.log(sectionRef.current)
//console.log(sectionRef.current.getBoundingClientRect())
//console.log(sectionRef.current.clientY)

			window.scrollTo({
				left: 0, 
				top: window.pageYOffset + sectionRef.current.getBoundingClientRect().top - 40,
				behavior: 'smooth'
			})
		}
	}

	return (
		<div className={`
			nextsection__container 
			flex-center
			${className}
		`}
			onClick={() => moveToSection()}
		>
			<a role="button" className={`nextsection__button flex-center-v`}>
				{label||"Click"}
				<Icon icon={`arrow-down-rounded`} width={18} height={18} className={`nextsection__icon`} />
			</a>
		</div>
	)
}

export default NextSection;