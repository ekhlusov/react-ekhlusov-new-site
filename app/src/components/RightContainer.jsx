import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import Courses from "./Courses";
import About from "./About";

// Порядок секций — как в резюме на hh: сначала опыт, «Обо мне» в конце
const RightContainer = () => {
	return (
		<>
			<WorkExperience />
			<Skills />
			<Education />
			<Courses />
			<About />
		</>
	);
};

export default RightContainer;
