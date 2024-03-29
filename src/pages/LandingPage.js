import React, { useEffect, useRef, useContext } from "react";

import "../assets/css/pages/landingpage.css";

import DataContext from '@contexts/DataContext.js';

import Navigation from "@components/layout/Navigation.js";
import Headline from "@components/text/Headline.js";
import Image from "@components/graphic/Image.js";
import NextSection from "@components/layout/NextSection.js";
import Heading from "@components/text/Heading.js";
import Quote from "@components/text/Quote.js";
import ContactMe from "@components/ContactMe.js";

import AboutMeText from "@components/text/AboutMeText.js";
import AwardsCertificates from "@components/AwardsCertificates.js";
import SkillsTechnologies from "@components/SkillsTechnologies.js";
import WhatIOfferServices from "@components/WhatIOfferServices.js";
import WorkProjects from "@components/WorkProjects.js";

import Footer from "@components/layout/Footer.js";

//import profilePhoto from "@images/Profile-BW-6.png";
import profilePhoto from "@images/Long_Profile--orig--BW.png";

import xotixdesigns from "@images/xotixdesigns.png";
import versushd from "@images/versushd3.png";
import coffee1 from "@icons/coffee-1.svg";


const SECTIONS = [
	{
		id: 'about-me',
		numbering: '01',
		label: 'About Me',
		sectionRef: null
	},
	{
		id: 'what-i-offer',
		numbering: '02',
		label: 'What I Offer',
		sectionRef: null
	},
	{
		id: 'my-work',
		numbering: '03',
		label: 'My Work',
		sectionRef: null
	},		
	{
		id: 'my-awards-certificates',
		numbering: '04',
		label: 'My Awards & Certificates',
		sectionRef: null
	},		
	{
		id: 'skills-technologies-i-use',
		numbering: '05',
		label: 'Skills & Technologies I Use',
		sectionRef: null
	},		
	{
		id: 'testimonials-about-my-work',
		numbering: '06',
		label: 'Testimonials About My Work',
		sectionRef: null
	},	
]

const SERVICES = [
	{
		title: 'ECOMMERCE STORE',
		description: `Manage your products within a content management system, showcase them on the landing page, edit shipping, payment options, expand your presence with affordable advertising and marketing.\nMost stores I worked with are on the Shopify platform.\n\nFaster buying process. Complete online store for your brand.`,
		features: ['product photography', 'storefront setup', 'shopping cart', 'blog', 'web design', 'mobile design',  'seo', 'social media', 'branding', 'content management', ],
	},
	{
		title: 'BRAND WEBSITE',
		description: `Customized website to your needs. Present your company, tell your story, showcase your services, products and attract new customers.\n\nGive your brand an online presence.`,
		features: ['products showcase', 'social media', 'mobile design', 'web design', 'landing', 'branding'],
	},
	{
		title: 'PORTFOLIO DESIGN',
		description: `Personal portfolio webpage to present your work.\n\nYour name as a brand`,
		features: ['web design', 'blog', 'logo design', ],
	},
]

const PROJECTS = [
	{
		title: 'Kinokuke',
		type: 'Brand Website',
		subtitle: 'Real Estate Website',
		features: ['products', 'web design', 'development' ],
		description: `Modern, prefabricated and affordable modular homes in Slovakia`,
		year: 2021,
		imageSrc: 'https://cdn.vox-cdn.com/thumbor/fII7oFYbKBfkfZQ8hV0WVq23CQs=/0x0:3200x2133/1200x675/filters:focal(1688x734:2200x1246)/cdn.vox-cdn.com/uploads/chorus_image/image/66417434/154.0.jpg',
	},
	{
		title: 'Versus HD',
		type: 'Ecommerce Store',
		subtitle: 'Jewellery Store',
		features: ['web design', 'storefront', 'branding' ],
		description: `House of unconventional designs. Custom - made, fashionable skull bracelets store.`,
		year: 2021,
		imageSrc: versushd,
//		imageSrc: 'https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/271448795_129720739519298_1203329097557700124_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=VIH39h35OMgAX9zJGLn&_nc_ht=scontent-lhr8-2.xx&oh=00_AfClrGMoplKZ6y24ltBKOub3y2_Uifi9AjOZAyUD7o3fxg&oe=63C1CAEA',
//		imageSrc: 'https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/271261578_129341899557182_4193318366256447396_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=tqiLEAzXb6kAX9cprvQ&_nc_oc=AQmcRIhkEsRplJILolF5a3PxX7rxwOQmlgopobl5LHgxSuQpjB-B7iUFfBRyVQN9S2s&_nc_ht=scontent-lhr8-1.xx&oh=00_AfAkxnpLJJ23bDTq9GfZU6mRUIlPPCOWbAs9M1MxRBHlCg&oe=63C0E9AD',
//		imageSrc: 'https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/271523919_129721059519266_1023674588112582155_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=_mS_JbUtqlkAX_dAMU3&_nc_ht=scontent-lhr8-2.xx&oh=00_AfDXiUQTt2urdSt2tlhT9fg11TBi7tM9AV_ixsPBMq7BlA&oe=63C21B20',
//		imageSrc: 'https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/262878836_120601233764582_9002272290395223614_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-R-ZvbY7WhwAX8svydC&_nc_ht=scontent-lhr8-1.xx&oh=00_AfD6TgTmSe8ua6aQixCV_8gPx9lVWaHidlcQKzhdkf2r_A&oe=63C10219',
	},
	{
		title: 'X.oti.X Designs',
		type: 'Ecommerce Store',
		subtitle: 'Jewellery Store',
		features: ['branding', 'storefront', 'web design' ],
		description: `Stylish bracelets, accessories made from semi-precious stones & clothing from Africa.`,
		year: 2021,
		imageSrc: xotixdesigns,
	},
]

const AWARDS = [
	{ 
		title: 'Certified Platform App Builder',
		subtitle: 'Salesforce',
		icon: 'salesforce',
		iconColor: '#00a1e0',
		link: 'https://focusonforce.com/salesforce-certifications/platform-app-builder/',
	},
	{ 
		title: 'Meta Front-End Developer Professional',
		subtitle: 'Meta',
		icon: 'meta',
		iconColor: '#0081FB',
		link: 'https://coursera.org/verify/P2NEPK6NENNK',
	},
];

const SKILLS = [
	{ 
		label: 'HTML',
	},
	{ 
		label: 'CSS',
	},
	{ 
		label: 'TailwindCSS',
	},	
	{ 
		label: 'jQuery',
	},	
	{ 
		label: 'Javascript',
	},
	{ 
		label: 'Typescript',
	},	
	{ 
		label: 'React.js',
	},
	{ 
		label: 'Next.js',
	},	
	{ 
		label: 'Node.js',
	},
	{ 
		label: 'Express.js',
	},	
	{ 
		label: 'SQL',
	},
	{ 
		label: 'Shopify',
	},	
	{ 
		label: 'Liquid',
	},
];

const LandingPage = (props) => {
	let { className, } = props;

  	const contextData = useContext(DataContext);

	const aboutMeSectionRef = useRef(null);
	const whatIOfferSectionRef = useRef(null);
	const myWorkSectionRef = useRef(null);
	const myAwardsCertificatesSectionRef = useRef(null);
	const skillsTechnologiesSectionRef = useRef(null);

	useEffect(() => {
//		if (aboutMeSectionRef.current) {
console.log(`### About Me ref`);
//console.log(aboutMeSectionRef.current);
			let updatedSections = SECTIONS;
			updatedSections[0]['sectionRef'] = aboutMeSectionRef.current;
			updatedSections[1]['sectionRef'] = whatIOfferSectionRef.current;
			updatedSections[2]['sectionRef'] = myWorkSectionRef.current;
			updatedSections[3]['sectionRef'] = myAwardsCertificatesSectionRef.current;
			updatedSections[4]['sectionRef'] = skillsTechnologiesSectionRef.current;
      		contextData.setContextData(prevData => ({
      			...prevData,
      			SECTIONS: updatedSections
      		}))
//		}
	}, [])

	return (
		<div className={`landing-page__container page-max-w`}>
			<section className={`landing-page__section-intro`}>
				<Headline />
				<Image source={profilePhoto} className={`profile-photo`} />
				<NextSection label={`About Me`} sectionRef={aboutMeSectionRef} className={`about-me`} />
			</section>

			<section ref={aboutMeSectionRef} className={`landing-page__section about-me`}>
				<Heading numbering={`01`} label={`About Me`} className={`about-me`} />
{/*				
				<Quote label={`I love learning about new things and technologies. Learning is a lifelong process.`} />
*/}				
				<Quote label={`I love learning about new things every day.`} />
				<AboutMeText text={`I am a self-taught developer and designer, focusing both on front-end and back-end development, providing a full package solution for your needs.\nI have worked with a vast amount of technologies throughout my career, creating digital product, brand and e-commerce experiences\nI am fluent in English, Slovak, Vietnamese with a bit of German and love working in an international environment.`}/>
			</section>
	
			<section ref={whatIOfferSectionRef} className={`landing-page__section what-i-offer`}>
				<Heading numbering={`02`} label={`What I Offer`} className={`what-i-offer`} />
				<Quote label={`I put special emphasis on close communication with the client to have a more deep understanding of the brand identity.`} />
				<WhatIOfferServices services={SERVICES}/>
			</section>

			<ContactMe label={`Interested?`} btnLabel={`Let's grab a coffee`} icon="coffee-1" />
			<NextSection label={`Explore My Work`} sectionRef={myWorkSectionRef} className={`my-work`} />

			<section ref={myWorkSectionRef} className={`landing-page__section my-work`}>
				<Heading numbering={`03`} label={`My Work`} className={`my-work`} />
				<Quote label={`I love to craft functional solutions for unique problems.`} />
	 			<WorkProjects projects={PROJECTS} />
			</section>

			<section ref={myAwardsCertificatesSectionRef} className={`landing-page__section my-awards-certificates`}>
				<Heading numbering={`04`} label={`My Awards & Certificates`} className={`my-awards-certificates`} />
				<AwardsCertificates awards={AWARDS} />
			</section>

			<section ref={skillsTechnologiesSectionRef} className={`landing-page__section skills-technologies-i-use`}>
				<Heading numbering={`05`} label={`Skills & Technologies I Use`} className={`skills-technologies-i-use`} />
				<Quote label={`I use a variety of different technologies for specific needs.`} />
				<SkillsTechnologies skills={SKILLS} />
			</section>


{/*
			<Heading numbering={`06`} label={`Testimonials About My Work`} className={`testimonials-about-my-work`} />
*/}

			<ContactMe className={`lets-talk`} label={`Have an idea in mind?`} btnLabel={`Let's talk`} icon="arrow-down-rounded" />

			<Footer />
		</div>
	)
}

export default LandingPage;