import React from "react";
import { SectionTitle } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";
import { groupSkills } from "./helpers/skill-groups";

const Skills = () => {
	const data = React.useContext(DataContext);

	if (!data?.skills?.length) {
		return null;
	}

	return (
		<section id="skills" className="section section--skills">
			<SectionTitle text="Ключевые навыки" />

			{groupSkills(data.skills).map(({ title, items }) => (
				<div key={title} className="skills">
					<h3 className="skills__title">{title}</h3>
					<ul className="skills__list" translate="no">
						{items.map(skill => (
							<li key={skill} className="skills__item">
								{skill}
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
};

export default Skills;
