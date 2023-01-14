import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//import Icon from "@components/graphic/Icon.js";

import "@css/components/whatiofferservices.css";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const WhatIOfferServices = (props) => {
	let { services, className } = props;

	const [isMobile, setIsMobile] = useState(false);
	const [activeLang, setLang] = useState(0);

	const Service = ({data}) => {
		return (
			<div className={`whatiofferservices__service `}>
				<h4>{data['title']}</h4>
				<p>{data['description']}</p>
				<div className={`whatiofferservices__features`}>
					{data['features'].map(feature => (
						<span>{feature}</span>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className={`
			whatiofferservices__container 
			${className}
		`}>
			{services.map(service => (
				<Service data={service}/>
			))}
		</div>
	)
}

export default WhatIOfferServices;