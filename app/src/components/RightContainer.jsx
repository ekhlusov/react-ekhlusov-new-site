import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import About from "./About";

// Навыки — перед опытом: рекрутер первым делом сверяет стек с вакансией.
// «Курсы» (Courses.jsx) скрыты, пока курс всего один (2009 год) и резюме
// он не усиливает; вернуть — добавить <Courses /> после <Education />.
const RightContainer = () => {
	return (
		<>
			<Skills />
			<WorkExperience />
			<Education />
			<About />
		</>
	);
};

export default RightContainer;
