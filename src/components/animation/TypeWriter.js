import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"

//import Dot from "../graphic/Dot.js";

import "@css/components/typewriter.css";

const TypeWriter = (props) => {
	let { text, animationDuration, refreshAnimation, className } = props;

	const containerRef = useRef(null);
  	const [firstRun, setFirstRun] = useState(true);
  	const [isRunning, setIsRunning] = useState(false);
	const isInView = useInView(containerRef);
  	const [containerWidth, setContainerWidth] = useState(0);

	const charactersArray = text.split('');

  	const characterRef = useRef(null);
  	const [characterDimensions, setCharacterDimensions] = useState({width:0, height:0});

  	const [currentCharacter, setCurrentCharacter] = useState(-1);
  	const [charactersVisibility, setCharactersVisibility] = useState(
  		Array.from({ length: charactersArray.length }, (v, i) => 0)
  	);
  	const [currentNewline, setCurrentNewline] = useState(-1);
  	const [newlineIndexes, setNewlineIndexes] = useState([]);

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


  	/* INITIAL USEEFFECT */

	useLayoutEffect(() => {
		if (containerRef.current) {
//console.log(`### TypeWriter containerRef dimensions`);
//console.log(containerRef.current.getBoundingClientRect());
			setContainerWidth(containerRef.current.getBoundingClientRect().width);
		}
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
//console.log(`### TypeWriter | typing  animation START`)
		
		if ((firstRun || refreshAnimation) && !isRunning) {
			if (isInView) {
				runTypingAnimation(0);
			} else {
				resetTypingAnimation();
			}
		}
    }, [isInView])

    useEffect(() => {
//console.log(`### TypeWriter | useEffect containerWidth changed: ${containerWidth}`)
		countNewlinePosition();
    }, [containerWidth])

    useEffect(() => {
    	if (newlineIndexes.includes(currentCharacter)) {
    		setCurrentNewline(newlineIndexes.indexOf(currentCharacter));
    	} 
    }, [currentCharacter])

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


    const countNewlinePosition = () => {
//console.log(`### TypeWriter | countNewlinePosition()`);
//console.log(`### TypeWriter | characterDimensions.width.toFixed(3) ${characterDimensions.width.toFixed(3)}`);
		const wordsArray = text.split(' ');
//console.log(wordsArray)

		let characterCount = 0;
		let newlineIndexArr = [];
		for (let i=0; i<wordsArray.length; i++) {
			let charsInWord = wordsArray[i].length; // character count 

			// Initial
			if (characterCount==0) {
				characterCount += charsInWord; 
			// word is on next line
			} else if ((characterCount + 1 + charsInWord) * characterDimensions.width.toFixed(3) > containerWidth) { // characters + space + new word
//console.log(`### TypeWriter | countNewlinePosition() | word new line @: ${characterCount}`);
				const addLastCount = newlineIndexArr.length ? newlineIndexArr[newlineIndexArr.length-1] : 0;
				newlineIndexArr.push(characterCount+1+addLastCount);
				characterCount = charsInWord; // start count with word on new line
			// add to count
			} else {
				characterCount += 1 + charsInWord; // add space between
//console.log(`### TypeWriter | countNewlinePosition() | add to count: chars ${characterCount}`);
			}
		}
//console.log(`### TypeWriter | newlineIndexes`);
//console.log(newlineIndexArr);

		setNewlineIndexes(newlineIndexArr);
    }

    const runTypingAnimation = (currentIndex) => {
//console.log(`### TypeWriter | runTypingAnimation()`)
		if (currentIndex < charactersArray.length) {
			setIsRunning(true);
			setCurrentCharacter(currentIndex);
			setCharactersVisibility(prevArray => {
				prevArray[currentIndex] = 1;
				return prevArray;
			});

			setTimeout(() => {
				runTypingAnimation(currentIndex+1);
			}, animationDuration)

		} else {
			setFirstRun(false);
			setIsRunning(false);
		}
    }

    const resetTypingAnimation = () => {
    	setCharactersVisibility(Array.from({ length: charactersArray.length }, (v, i) => 0));
	}

    useEffect(() => {
//console.log(`### TypeWriter | charactersVisibility`);
//console.log(charactersVisibility);
    }, [charactersVisibility])


    const getLeftPos = () => {
    	const offset = currentNewline != -1 ? newlineIndexes[currentNewline] : 0;
    	return currentCharacter - offset +1;
    }

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
					left: getLeftPos()*characterDimensions.width,
					top: (currentNewline+1)*characterDimensions.height,
				}} 
			/>
		</span>
	)
}

export default TypeWriter;