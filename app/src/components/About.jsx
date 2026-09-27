import React from "react";
import parse from "html-react-parser";
import { SectionTitle } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

const About = () => {
	const data = React.useContext(DataContext);

	if (!data?.about) {
		return null;
	}

	return (
		<section className="section section--about">
			<SectionTitle text="Обо мне" />
			<div className="about">{parse(data.about)}</div>
		</section>
	);
};

export default About;
