import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import Icon from "../graphic/Icon.js";
import Logo from "../graphic/Logo.js";
import LanguageSelector from "../LanguageSelector.js";

import "../../assets/css/components/navigation.css";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Navigation = (props) => {
//	let { className, redirectUrl, socialFacebookUrl, socialInstagramUrl, title, subtitle, description, subdescription } = props;
  const routeNavigate = useNavigate();


	const [isMobile, setIsMobile] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const prevScrollOffset = usePrevious(scrollOffset);

    const [fixedNav, setFixedNav] = useState(false);
    const [scrollDown, setScrollDown] = useState(false);


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

  const navigateToInternal = (URL) => {
  	routeNavigate(URL);
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
						<Icon 
							icon="menu-double" 
							color="var(--primarygray)"
							width={30}
							height={30}
						/>
					</div>
				</div>

			</div>

		</nav>
	)
}

export default Navigation;