import React, { forwardRef, useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"


//import Dot from "../graphic/Dot.js";

import "@css/components/heading.css";

const Heading = (props) => {
	let { numbering, label, animationDuration, refreshAnimation, className } = props;

	refreshAnimation = true;

	const containerRef = useRef(null);
	const isInView = useInView(containerRef);

	const digit1Ref = useRef(null);
	const digit2Ref = useRef(null);
  	const [animDigitsFinished, setAnimDigitsFinished] = useState(false);
  	const mNumbering = useMotionValue(0);
  	const aTranslateY = useTransform(
  		mNumbering, 
  		[0, 0.7, 0.9, 1], 
  		[-18, 8, -4, 0]
  	);
  	const aNumberingOpacity = useTransform(
  		mNumbering, 
  		[0, 0.25, 0.7, 0.9, 1], 
  		[0,    0, 	0.1, 	  0.8, 1]
//  		[0, 0.7, 1], 
//  		[0, 0.7, 1]
  	);

  	const mDivider = useMotionValue(0);
  	const aWidth = useTransform(
  		mDivider, 
  		[0, 1], 
  		[`0%`, `100%`]
  	);

  	const mLabel = useMotionValue(0);
  	const aTranslateX = useTransform(
  		mLabel, 
  		[0, 0.75, 1], 
  		[-30, -30, 0]
  	);
	const aLabelOpacity = useTransform(
  		mNumbering, 
  		[0, 0.25, 0.5, 0.75, 1], 
  		[0,    0, 	0, 	  0.75, 1]
  	);

    useEffect(() => {
console.log(`### Heading | animation`)
    	if (isInView) {
    		runNumberingAnim();
    		runDividerAnim();
    		runLabelAnim();

    	} else if (refreshAnimation) {
    		mNumbering.set(0);
    		mDivider.set(0);
    		mLabel.set(0);
    		setAnimDigitsFinished(false);
    	}
    }, [isInView])

    const runNumberingAnim = () => {
console.log(`### Heading | runDividerAnim`)

		const node1 = digit1Ref.current;
		const node2 = digit2Ref.current;
		
    	const digit1Anim = animate(0, 100, {
			duration: 1,
	      	ease: "easeInOut",
//	      	ease: cursorIsVisible? "easeIn" : "easeOut",
      	    onUpdate(value) {
		        node1.textContent = value.toFixed(0)[value.toFixed(0).length-1];
		    },
	      	onComplete: () => {
	      		setTimeout(() => {
	      			setAnimDigitsFinished(true);
	      		}, 200)
		      	animate(mNumbering, 1, {
					duration: 0.5,
			      	ease: "easeInOut",
			    })
	      	}
	    });

    	const digit2Anim = animate(0, 100, {
			duration: 1.5,
	      	ease: "easeInOut",
//	      	ease: cursorIsVisible? "easeIn" : "easeOut",
      	    onUpdate(value) {
		        node2.textContent = value.toFixed(0)[value.toFixed(0).length-1];
		    },
	      	onComplete: () => {
	      	}
	    });

//    	return () => animation.stop();
    }

    const runDividerAnim = () => {
console.log(`### Heading | runDividerAnim`)
    	const animation = animate(mDivider, 1, {
			duration: 1.5,
	      	ease: "easeInOut",
	    });
    	return () => animation.stop();
    }

    const runLabelAnim = () => {
console.log(`### Heading | runLabelAnim()`)
    	const animation = animate(mLabel, 1, {
			duration: 1.5,
	      	ease: "easeOut",
	    });
    	return () => animation.stop();
    }

	return (
		<h3 ref={containerRef} className={`heading__container flex-center-v ${className}`}>

			<span className={`heading__numbering-container`}>
				<motion.span className={`heading__numbering-number`} style={{ translateY: aTranslateY, opacity: aNumberingOpacity }}>{numbering}</motion.span>
				<span className={`heading__numbering-placeholder ${animDigitsFinished? 'finished' :''}`}>
					<motion.span ref={digit1Ref} className={`heading__numbering-digit`} />
					<motion.span ref={digit2Ref} className={`heading__numbering-digit`} />
				</span>
			</span>

			<div className={`heading__divider-container flex-center-v`}>
				<motion.canvas className={`heading__divider`} style={{ width: aWidth }} />
			</div>

			<motion.span className={`heading__label`} style={{ translateX: aTranslateX, opacity: aLabelOpacity }}>
				{label}
			</motion.span>
		</h3>
	)
}

export default Heading;