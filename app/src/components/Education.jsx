import React from "react";
import { SectionTitle } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

const year = date => (date ? new Date(date).getFullYear() : null);

const Education = () => {
	const data = React.useContext(DataContext);

	if (!data?.education?.length) {
		return null;
	}

	return (
		<section className="section section--education">
			<SectionTitle text="Образование" />

			{data.education.map((item, index) => (
				<article key={index} className="entry">
					{/* Как на hh: для учёбы достаточно лет */}
					<div className="entry__period">
						<span className="entry__date">
							{[year(item?.startDate), year(item?.endDate)]
								.filter(Boolean)
								.join(" — ")}
						</span>
					</div>

					<div className="entry__body">
						<h3 className="entry__title">{item?.name}</h3>
						<p className="entry__text">
							{[item?.faculty, item?.description]
								.filter(Boolean)
								.join(", ")}
						</p>
					</div>
				</article>
			))}
		</section>
	);
};

export default Education;
