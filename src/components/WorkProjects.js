import React, { useLayoutEffect, useEffect, useState, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useViewportScroll, useMotionValue, useTransform } from "framer-motion"

import Image from "@components/graphic/Image.js";

import "@css/components/workprojects.css";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const WorkProjects = (props) => {
	let { projects, className } = props;

	const PROJECTS_GAP = 40;
	const PROJECTS_COUNT = projects.length;

	const [isMobile, setIsMobile] = useState(false);
	const [projectHeight, setProjectHeight] = useState(0);
	const [containerTop, setContainerTop] = useState(0);

  const containerRef = useRef();
  const projectRef = useRef();


  useLayoutEffect(() => {
    if (projectRef.current) {
console.log(`### WorkProjects Project dimensions`);
console.log(projectRef.current.getBoundingClientRect());
    	setProjectHeight(projectRef.current.getBoundingClientRect().height);
    }
  }, []);

  useLayoutEffect(() => {
    const onScroll = () => {
console.log(`### WorkProjects scrolling.. Container elem:`);
console.log(containerRef.current.getBoundingClientRect());

    	setContainerTop(containerRef.current.getBoundingClientRect().top);
    };

    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);


//	const Project = ( {data} ) => {
	const Project = forwardRef(( props, ref ) => {
		let { index, projectsContainerTop, data, className } = props;

  	const testRef = useRef(null);
		const { scrollYProgress } = useScroll({
		  target: ref,
//		  offset: ["start start", "end end"]
//		  offset: ["end end", "start start"]
//		  offset: ["center center", "start start"]
		})
		const { scrollY } = useScroll({
		  target: ref,
		})


		const PROJECTHEIGHT = projectHeight+PROJECTS_GAP;
		const SCALEBASE = index*(PROJECTHEIGHT);	// Animate Current Card 
		const SHADOWBASE = (index-1)*(PROJECTHEIGHT); // Animate Next Card

  	const containerY = useMotionValue(projectsContainerTop);
  	const scaleXYZ = useTransform(
  		containerY, 
  		[-(SCALEBASE+PROJECTHEIGHT*2/3), -(SCALEBASE+PROJECTHEIGHT/3)], 
  		[0.7, 1]
  	);

  	const boxShadow = useTransform(
  		containerY, 
  		[-(SHADOWBASE+PROJECTHEIGHT), -(SHADOWBASE+PROJECTHEIGHT*1/3)], 
//  		["0 -30px 30px 0 rgba(0, 0, 0, 0.3)", "0 0px 0px 0 rgba(0, 0, 0, 0.1)"]
  		["0 -24px 24px 0 rgba(0, 0, 0, 0.24)", "0 0px 0px 0 rgba(0, 0, 0, 0.1)"]
  	);

		return (
			<motion.div ref={ref} className={`workprojects__project flex-col flex-center-v`}
				style={{ 
					scale: (index==PROJECTS_COUNT-1) ? 1 : scaleXYZ,
					boxShadow: boxShadow,
				}}
			>

				<div className={`workprojects__project-meta flex-col flex-center-v`}>
					<span className={`workprojects__project-year`}>{data['year']}</span>
					<span className={`workprojects__project-type`}>[ {data['type']} ]</span>
				</div>

				<div className={`workprojects__project-content flex-col`}>
					<div className={`workprojects__project-features flex-center-v`}>
						{data['features'].map(feature => (
							<span className={`workprojects__project-feature`}>{feature}</span>
						))}
					</div>

					<h3 className={`workprojects__project-title`}>{data['title']}</h3>
					<h4 className={`workprojects__project-subtitle`}>{data['subtitle']}</h4>
					<p className={`workprojects__project-description`}>{data['description']}</p>

				</div>

				<a role="button" href="#" className={`workprojects__project-button flex-center-v`}>View Project</a>
				<Image source={data['imageSrc']} className={`workprojects__project-image`}/>
				
			</motion.div>
		)
	})


	return (
		<div ref={containerRef} className={`
			workprojects__container ${className}
			
		`}>
			{projects.map((project, index) => (
				<Project ref={projectRef} data={project} index={index} projectsContainerTop={containerTop} />
			))}
		</div>
	)
}

export default WorkProjects;