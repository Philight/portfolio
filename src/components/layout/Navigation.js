import React, { useContext, useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"

import DataContext from '@contexts/DataContext.js';

import Icon from "../graphic/Icon.js";
import Logo from "../graphic/Logo.js";
import LanguageSelector from "../LanguageSelector.js";

import { openURL, usePrevious } from "@utils/utilFunctions.js";

import "@css/layouts/navigation.css";

const Navigation = (props) => {
//	let { className, redirectUrl, socialFacebookUrl, socialInstagramUrl, title, subtitle, description, subdescription } = props;
  	const contextData = useContext(DataContext);

  	const routeNavigate = useNavigate();

		const [isMobile, setIsMobile] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const prevScrollOffset = usePrevious(scrollOffset);

    const [fixedNav, setFixedNav] = useState(false);
    const [scrollDown, setScrollDown] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuShown, setMenuShown] = useState(false);

  	const mMenu = useMotionValue(0);
  	const aRotateOpen = useTransform(
  		mMenu, 
  		[0, 1], 
  		[0, 90]
//  		[0, 180]
  	);
  	const aRotateClosed = useTransform(
  		mMenu, 
  		[0, 1], 
  		[-90, 0]
//  		[0, 180]
  	);

  	const aSubmenuDimension = useTransform(
  		mMenu, 
  		[0, 1], 
  		['1%', '100%']
  	);

  	const aSubmenuCircle = useTransform(
  		mMenu, 
  		[0, 1], 
  		[30, 2000]
  	);

  	const mMenuWrapper = useMotionValue(0);
  	const aWrapperPercentage = useTransform(
  		mMenuWrapper, 
  		[0, 1], 
  		['1%', '100%']
  	);
  	const aWrapperTop = useTransform(
  		mMenuWrapper, 
  		[0, 1], 
  		[20, 0]
  	);

    useLayoutEffect(() => {
        const onScroll = () => {
        	setScrollOffset(window.pageYOffset);
        };

        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
//  console.log(`### Navigation | scrollOffset:${scrollOffset}`)
    	setFixedNav(scrollOffset > 100 ? true : false);

    	setScrollDown(scrollOffset > prevScrollOffset ? true : false);

    }, [scrollOffset])



    useEffect(() => {
//  console.log(`### TypeWriter | animation cursor vis: ${cursorIsVisible ? 'T':'F'}`)
	    const animation = animate(mMenu, menuOpen? 1 : 0, {
	      duration: 0.6,
//	      ease: menuOpen? "easeOut" : "easeIn",
	      ease: menuOpen? "easeInOut" : "easeIn",
	      onComplete: () => {
  	  		if (menuOpen) {
			  		setMenuShown(true);

			  		// Start next Menu Wrapper animation
  					mMenuWrapper.set(0);
			  		animate(mMenuWrapper, menuOpen? 1 : 0, {
	      			duration: 0.7,
	      			ease: "easeInOut",
			  		})
			  	}
	      }
	    });

    	return () => animation.stop();
    }, [menuOpen])

  useEffect(() => {
  	if (menuOpen) {
			document.body.style.overflow = 'hidden';
  	}
		return () => document.body.style.overflow = 'unset';
  }, [menuOpen]);

  const navigateToInternal = (URL) => {
  	routeNavigate(URL);
  }

	const navigateToSection = (sectionRef) => {
console.log(`### Navigation | navigateToSection()`)
		window.scrollTo({
			left: 0, 
			top: window.pageYOffset + sectionRef.getBoundingClientRect().top - 40,
			behavior: 'smooth'
		})
	}

  const toggleMenu = () => {
  	if (menuOpen) {
  		setMenuShown(false);
  	} 
  	setMenuOpen(prevState => !prevState);
  }

  const SubMenu = () => {

  	const MenuItem = (props) => {
  		const { sectionIndex, sectionLabel } = props;

  		return (
				<motion.li className={`navigation__submenu-item`} style={{opacity: aWrapperPercentage, translateY: aWrapperTop}}
	  				onClick={() => {navigateToSection(contextData['SECTIONS'][sectionIndex]['sectionRef']); toggleMenu();} }
				>
					<span>[ {contextData['SECTIONS'] && contextData['SECTIONS'][sectionIndex]['numbering']} ]</span> {sectionLabel? sectionLabel : contextData['SECTIONS'] && contextData['SECTIONS'][sectionIndex]['label']}
				</motion.li>
			)
  	}

  	return (
  		<div className={`navigation__submenu-container flex-center-h ${menuShown? 'open' : 'closed'}`}
//  			style={{ width: aSubmenuDimension, height: aSubmenuDimension }}
  		>
  			<motion.ul className={`navigation__submenu-wrapper flex-col`} style={{ height: aWrapperPercentage }}>

  				<MenuItem sectionIndex={0} />

					<motion.canvas className={`navigation__submenu-item__border `} style={{width: aWrapperPercentage}}/>

  				<MenuItem sectionIndex={1} />

					<motion.canvas className={`navigation__submenu-item__border `} style={{width: aWrapperPercentage}}/>
	  			
  				<MenuItem sectionIndex={2} />

					<motion.canvas className={`navigation__submenu-item__border `} style={{width: aWrapperPercentage}}/>
	  			
  				<MenuItem sectionIndex={3} sectionLabel={`My Awards`}/>

					<motion.canvas className={`navigation__submenu-item__border `} style={{width: aWrapperPercentage}}/>
	  			
  				<MenuItem sectionIndex={4} sectionLabel={`Technologies`} />
	  			
					<motion.canvas className={`navigation__submenu-item__border social`} style={{width: aWrapperPercentage}}/>
	  			<li className={`navigation__submenu-item social`}>
						<Icon icon="github" color="var(--primarygray)" onClick={() => openLink('https://github.com/Philight')} className={`footer__social github`} />
						<Icon icon="linkedin" color="var(--primarygray)" onClick={() => openLink('https://www.linkedin.com/in/truong-lai-11670685/')} className={`footer__social linkedin`} />
{/*				
						<Icon icon="behance" className={`footer__social-behance`} />
*/}
	  			</li>
  			</motion.ul>
  		</div>
  	)
  }

	return (
		<nav className={`
			navigation__container
			
		`}>
			<div className={`navigation__wrapper ${fixedNav && 'fixed'} ${scrollDown&&'hidden'}`}>
				<canvas className={`navigation__background`} />

				<div className={`navigation__inner`}>

					<div className={`navigation__left flex-center-v`}>
						<Logo onClick={() => navigateToInternal("/")} />
					</div>

					<div className={`navigation__right flex-center-v`}>
						<LanguageSelector />

						<SubMenu />

						<div className={`navigation__burger-menu flex-center`}>

							<motion.canvas className={`navigation__burger-menu-circle`}
							style={{ width: aSubmenuCircle, height: aSubmenuCircle, }} />

							<Icon 
								className={`navigation__burger-menu-icon closed`}
								icon="menu-double" 
								color="var(--primarygray)"
								width={22}
								height={22}
								style={{
									rotateX: aRotateOpen, 
									rotateY: aRotateOpen,
//									rotateZ: aRotateOpen 
								}}
								onClick={() => toggleMenu()}
							/>
							<Icon 
								className={`navigation__burger-menu-icon open`}
								icon="x-mark" 
								color="var(--primarygray)"
								width={22}
								height={22}
								style={{
									rotateX: aRotateClosed, 
//									rotateY: aRotateClosed,
									rotateZ: aRotateClosed 
								}}
								onClick={() => toggleMenu()}
							/>
						</div>

					</div>
				</div>

			</div>

		</nav>
	)
}

export default Navigation;