import React from "react";
import { SectionTitle } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

const Languages = () => {
	const data = React.useContext(DataContext);

	if (!data?.languages?.length) {
		return null;
	}

	return (
		<section id="languages" className="section section--languages">
			<SectionTitle text="Иностранные языки" />

			{data.languages.map(item => (
				<article key={item?.name} className="entry">
					<div className="entry__period">
						<span className="entry__date">{item?.level}</span>
					</div>

					<div className="entry__body">
						<h3 className="entry__title">{item?.name}</h3>
						{item?.note && <p className="entry__text">{item.note}</p>}
					</div>
				</article>
			))}
		</section>
	);
};

export default Languages;
