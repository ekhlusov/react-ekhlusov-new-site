import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import About from "./About";

// Сначала короткое «Обо мне» (кто и что ищет), затем навыки — рекрутер
// сверяет стек с вакансией, — потом опыт.
// «Курсы» (Courses.jsx) скрыты, пока курс всего один (2009 год) и резюме
// он не усиливает; вернуть — добавить <Courses /> после <Education />.
const RightContainer = () => {
	return (
		<>
			<About />
			<Skills />
			<WorkExperience />
			<Education />
		</>
	);
};

export default RightContainer;
