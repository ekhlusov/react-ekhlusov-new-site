import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import Courses from "./Courses";
import About from "./About";

import Fade from "./helpers/Fade";

// Порядок секций — как в резюме на hh: сначала опыт, «Обо мне» в конце.
// Опыт виден сразу, остальные секции проявляются по мере прокрутки.
const RightContainer = () => {
	return (
		<>
			<WorkExperience />
			<Fade>
				<Skills />
			</Fade>
			<Fade>
				<Education />
			</Fade>
			<Fade>
				<Courses />
			</Fade>
			<Fade>
				<About />
			</Fade>
		</>
	);
};

export default RightContainer;
