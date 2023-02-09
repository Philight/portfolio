
{/* SCROLL BOTTOM AND TRIGGER EMAIL SEND */}




import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "@components/graphic/Icon.js";
import TypeWriter from "@components/animation/TypeWriter.js";

import "../assets/css/components/contactme.css";

const ContactMe = (props) => {
	let { label, btnLabel, icon, className } = props;

	const ANIM_DURATION = 80;

	const [isMobile, setIsMobile] = useState(false);
	const [activeLang, setLang] = useState(0);

	return (
		<div className={`
			contactme__container ${className} flex-col flex-center
		`}>
			<span className={`contactme__label flex-col flex-center`}>
				<TypeWriter text={label} animationDuration={ANIM_DURATION} refreshAnimation />
				<canvas className={`contactme__underline`}/>
			</span>

			<a href="mailto:lai.filip@gmail.com" target="_blank" className={`contactme__button`} > 
				{btnLabel}{icon&&<Icon icon={icon} className={`contactme__button-icon`} width={32} height={32}/>}
			</a>
		</div>
	)
}

export default ContactMe;