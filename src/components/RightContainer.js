import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";

import Fade from "react-reveal/Fade";
import Achievements from "./Achievments";

const RightContainer = () => {
	return (
		<>
			<Fade>
				<Skills />
				<WorkExperience />
				<Achievements />
			</Fade>
			<Education />
		</>
	);
};

export default RightContainer;
