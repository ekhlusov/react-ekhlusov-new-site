import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";

import Fade from "react-reveal/Fade";
import Courses from "./Courses";

const RightContainer = () => {
	return (
		<>
			<Fade>
				<Skills />
				<WorkExperience />
				<Courses />
			</Fade>
			<Education />
		</>
	);
};

export default RightContainer;
