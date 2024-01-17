import React, { forwardRef } from "react";
import { motion } from "framer-motion"

import menuDouble from "@icons/menu-double.svg";
import arrowDownRounded from "@icons/arrow-down-rounded.svg";
import arrowDownThin from "@icons/arrow-down-thin.svg";
import behance from "@icons/behance.svg";
import coffee1 from "@icons/coffee-1.svg";
import coffee2 from "@icons/coffee-2.svg";
import github from "@icons/github.svg";
import linkedin from "@icons/linkedin.svg";
import meta from "@icons/meta.svg";
import salesforce from "@icons/salesforce.svg";
import xMark from "@icons/x-mark.svg";

const Icon = forwardRef((props, ref) => {
	let { icon, width, height, color,
		className, style, onClick 
	} = props;

	const iconName = icon.toLowerCase();

	const getIcon = () => {
		switch(iconName) {

		    case 'arrow-down-rounded':
		      return arrowDownRounded;
		    case 'arrow-down-thin':
		      return arrowDownThin;
		    case 'behance':
		      return behance;			      
		    case 'coffee-1':
		      return coffee1;		
  		    case 'github':
		      return github;	
  		    case 'coffee-2':
		      return coffee2;  	 
  		    case 'linkedin':
		      return linkedin;  			           
  		    case 'meta':
		      return meta; 
		    case 'menu-double':
		      return menuDouble;	
		    case 'salesforce':
		      return salesforce;	
		    case 'x-mark':
		      return xMark;	

		    case 'build':
		      return 'https://ik.imagekit.io/0ovzivqyfai/kinokuke/icon/process/build.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1655761512997';

		    default:
		      return '';
	  	}
	}

	const isMultiColor = () => {
		switch(iconName) {
			case 'coffee-1': 
			case 'coffee-2': 
				return true;

			default: 
				return false;
		}
	}

	const renderingStyle = isMultiColor() 
		? { src: getIcon(), }
		: {
			style: {
				WebkitMask: `url(${getIcon()}) no-repeat center`, 
				mask: `url(${getIcon()}) no-repeat center`,
				backgroundColor: color||'#000',
			}
		};

	return (
		<motion.figure className={`icon__container icon-${iconName} flex-center ${className}`} 
			style={{ width: width, height: height, ...style }}
			ref={ref} onClick={onClick}
		>	
			<img className="icon"
				{...renderingStyle}
			/>
		</motion.figure>
	)
})

export default Icon;