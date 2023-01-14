import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "@components/graphic/Icon.js";
import LanguageSelector from "@components/LanguageSelector.js";
import TypeWriter from "@components/animation/TypeWriter.js";

import "@css/components/footer.css";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Footer = (props) => {
//	let { className, redirectUrl, socialFacebookUrl, socialInstagramUrl, title, subtitle, description, subdescription } = props;

	const ANIM_DURATION = 120;

	const [isMobile, setIsMobile] = useState(false);

	const openLink = (URL) => {
		window.open(URL, '_blank', 'noreferrer');
	}

	return (
		<footer className={`
			footer__container
		`}>
			<div className={`footer__authors flex-col flex-center`}>
				<a rel="author" href="mailto:lai.filip@gmail.com" className={`footer__author developedby`}>
					<span className={`footer__author-title`}>Developed By: </span>
					<TypeWriter text={`Filip Lai.`} animationDuration={ANIM_DURATION} />
				
				</a>
				<a rel="author" href="mailto:lai.filip@gmail.com" className={`footer__author designedby`}>
					<span className={`footer__author-title`}>Designed By: </span>
					<TypeWriter text={`Filip Lai.`} animationDuration={ANIM_DURATION} />
				</a>
			</div>

			<div className={`footer__socials flex-center`}>
				<Icon icon="github" color="var(--primarygray)" onClick={() => openLink('https://github.com/Philight')} className={`footer__social github`} />
				<Icon icon="linkedin" color="var(--primarygray)" onClick={() => openLink('https://www.linkedin.com/in/truong-lai-11670685/')} className={`footer__social linkedin`} />
{/*				
				<Icon icon="behance" className={`footer__social-behance`} />
*/}
			</div>

			<div className={`footer__bottom flex-center-v`}>
				<p className={`footer__bottom-copyright flex-center-v`}>
					<span className={`footer__bottom-copyright__symbol`}>&copy;</span>
					<span className={`footer__bottom-copyright__text`}>Copyright {new Date().getFullYear()} - All Rights Reserved</span>
				</p>
				<LanguageSelector />
			</div>
		</footer>
	)
}

export default Footer;