import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import Courses from "./Courses";
import About from "./About";

import Fade from "./helpers/Fade";

// Порядок секций — как в резюме на hh: сначала опыт, «Обо мне» в конце
const RightContainer = () => {
	return (
		<>
			<WorkExperience />
			<Fade>
				<Skills />
				<Education />
				<Courses />
				<About />
			</Fade>
		</>
	);
};

export default RightContainer;
