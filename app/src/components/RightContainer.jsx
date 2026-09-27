import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import About from "./About";
import Languages from "./Languages";

// Сначала короткое «Обо мне» (кто и что ищет), затем навыки — рекрутер
// сверяет стек с вакансией, — потом опыт. «Иностранные языки» — последними.
// «Курсы» (Courses.jsx) скрыты, пока курс всего один (2009 год) и резюме
// он не усиливает; вернуть — добавить <Courses /> после <Education />.
const RightContainer = () => {
	return (
		<>
			<About />
			<Skills />
			<WorkExperience />
			<Education />
			<Languages />
		</>
	);
};

export default RightContainer;
