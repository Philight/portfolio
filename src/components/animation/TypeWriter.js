import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"

//import Dot from "../graphic/Dot.js";

import "@css/components/typewriter.css";

const TypeWriter = (props) => {
	let { text, animationDuration, className } = props;

	const containerRef = useRef(null);
	const isInView = useInView(containerRef);

	const charactersArray = text.split('');

  	const characterRef = useRef(null);
  	const [characterDimensions, setCharacterDimensions] = useState({width:0, height:0});

  	const [currentCharacter, setCurrentCharacter] = useState(0);
  	const [charactersVisibility, setCharactersVisibility] = useState(
  		Array.from({ length: charactersArray.length }, (v, i) => 0)
  	);

//console.log(`### TypeWriter | charactersVisibility:`);
//console.log(charactersVisibility);

	const FLICKER_DURATION = 0.8;
  	const [cursorIsVisible, setCursorVisible] = useState(true);
  	const mCursor = useMotionValue(0);
  	const aOpacity = useTransform(
  		mCursor, 
  		[0, 1], 
  		[0, 1]
  	);

	useLayoutEffect(() => {
		if (characterRef.current) {
//console.log(`### TypeWriter characterRef dimensions`);
//console.log(characterRef.current.getBoundingClientRect());
			setCharacterDimensions({
				width: characterRef.current.getBoundingClientRect().width, 
				height: characterRef.current.getBoundingClientRect().height
			});
		}
	}, []);

    useEffect(() => {
console.log(`### TypeWriter | animation START`)
		if (isInView) {
			runAnimation(0);
		} else {
			resetAnimation();
		}
    }, [isInView])

    useEffect(() => {
//  console.log(`### TypeWriter | animation cursor vis: ${cursorIsVisible ? 'T':'F'}`)
	    const animation = animate(mCursor, cursorIsVisible? 0 : 1, {
	      duration: FLICKER_DURATION,
//	      ease: "easeInOut",
	      ease: cursorIsVisible? "easeIn" : "easeOut",
	      onComplete: () => {
	      	setCursorVisible(prevState => !prevState);
	      }
	    });

    	return () => animation.stop();
    }, [cursorIsVisible])

    const runAnimation = (currentIndex) => {
console.log(`### TypeWriter | runAnimation()`)
		if (currentIndex < charactersArray.length) {
			setCurrentCharacter(currentIndex);
			setCharactersVisibility(prevArray => {
				prevArray[currentIndex] = 1;
				return prevArray;
			});

			setTimeout(() => {
				runAnimation(currentIndex+1);
			}, animationDuration)
		}
    }

    const resetAnimation = () => {
    	setCharactersVisibility(Array.from({ length: charactersArray.length }, (v, i) => 0));
	}

    useEffect(() => {
console.log(`### TypeWriter | charactersVisibility`);
console.log(charactersVisibility);
    }, [charactersVisibility])


	return (
		<span ref={containerRef} className={`typewriter__container ${className}`}>

			{charactersArray.map( (character, index) => (
				<span ref={characterRef} index={index} 
					className={`typewriter__character ${charactersVisibility[index]? 'visible' :''}`}>
					{character}
				</span>
			))}

			<motion.canvas className={`typewriter__cursor`} 
				style={{
					width: characterDimensions.width,
					height: characterDimensions.height,
					opacity: aOpacity,
					left: (currentCharacter+1)*characterDimensions.width,
				}} 
			/>
		</span>
	)
}

export default TypeWriter;