import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import "../assets/css/components/languageselector.css";

const LANGUAGES = ['en', 'sk', 'de'];

const LanguageSelector = (props) => {
//	let { className, redirectUrl, socialFacebookUrl, socialInstagramUrl, title, subtitle, description, subdescription } = props;

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
			languageselector__container 
		`}>

			<div className={`languageselector__view`}>
				<div className={`languageselector__language`}>
					{LANGUAGES[activeLang]}
				</div>
			</div>

			<div className={`languageselector__list`}>
			</div>
		</div>
	)
}

export default LanguageSelector;