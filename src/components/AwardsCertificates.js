

import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "@components/graphic/Icon.js";

import { openLink } from "@utils/utilFunctions.js";

import "@css/components/awardscertificates.css";

const AwardsCertificates = (props) => {
	let { awards, icon, iconColor, className } = props;

	const [isMobile, setIsMobile] = useState(false);

	return (
		<div className={`
			awardscertificates__container ${className}
		`}>
			{awards.map(award => (
				<div className={`awardscertificates__award flex-center-v`}>
					<Icon icon={award['icon']} 
						width={32} height={32}
						className={`awardscertificates__icon`} 
						color={award['iconColor']}
					/>
					<div className={`awardscertificates__award-name`}>
						<h4 className={`awardscertificates__award-title`}>{award['title']}</h4>
						<h4 className={`awardscertificates__award-subtitle`}> {award['subtitle']}</h4>
					</div>
					<Icon icon={`arrow-down-rounded`} 
						width={22} height={22} 
						className={`awardscertificates__link`} 
						onClick={() => openLink(award['link'])}
					/>
				</div>
			))}
		</div>
	)
}

export default AwardsCertificates;