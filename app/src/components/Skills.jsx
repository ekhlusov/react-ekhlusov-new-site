import React from "react";
import { SectionTitle } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

const Skills = () => {
	const data = React.useContext(DataContext);

	if (!data?.skills?.length) {
		return null;
	}

	return (
		<section className="section section--skills">
			<SectionTitle text="Ключевые навыки" />

			<ul className="skills" translate="no">
				{data.skills.map(skill => (
					<li key={skill} className="skills__item">
						{skill}
					</li>
				))}
			</ul>
		</section>
	);
};

export default Skills;
