import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"

import Icon from "@components/graphic/Icon.js";
import LanguageSelector from "@components/LanguageSelector.js";
import TypeWriter from "@components/animation/TypeWriter.js";

import { openLink } from "@utils/utilFunctions.js";

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

	const ANIM_TYPING_DURATION = 120;


	const containerRef = useRef(null);
	const isInView = useInView(containerRef);

	const mBorder = useMotionValue(0);
	const aBorderWidth = useTransform(
		mBorder, 
		[0, 1], 
		['0%', `100%`]
	);

  useEffect(() => {
console.log(`### Footer | animation`)
  	if (isInView) {
    	animate(mBorder, 1, {
				duration: 1.5,
	    	ease: "easeIn",
		    onUpdate(value) {
	        //node1.textContent = value.toFixed(0)[value.toFixed(0).length-1];
		    },
	    	onComplete: () => {
	      	
	    	}
	    });
  	} 
  }, [isInView])

	return (
		<footer ref={containerRef} className={`
			footer__container flex-col flex-center-v
		`}>
			<motion.canvas className={`footer__border`} style={{width: aBorderWidth}}/>

			<div className={`footer__authors flex-col flex-center`}>
				<a rel="author" href="mailto:lai.filip@gmail.com" className={`footer__author developedby`}>
					<span className={`footer__author-title`}>Developed By: </span>
					<TypeWriter text={`Filip Lai.`} animationDuration={ANIM_TYPING_DURATION} refreshAnimation />
				
				</a>
				<a rel="author" href="mailto:lai.filip@gmail.com" className={`footer__author designedby`}>
					<span className={`footer__author-title`}>Designed By: </span>
					<TypeWriter text={`Filip Lai.`} animationDuration={ANIM_TYPING_DURATION} refreshAnimation />
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