import React from "react";
//import { DataContext } from "./helpers/data-context";
import { TitleWithLines } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

// Думаю этот раздел не очень нужен

const Skills = () => {
	const data = React.useContext(DataContext);

	return (
		<div className="right-container__skills">
			<TitleWithLines text="Профессиональные навыки" printButton={true} />

			<div className="right-container__skills--block">
				{data?.skills?.join(" • ")}
			</div>
		</div>
	);
};

export default Skills;
