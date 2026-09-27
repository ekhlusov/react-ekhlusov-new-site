import React from "react";
import WorkPeriod from "./WorkPeriod";
import parse from "html-react-parser";

import { DataContext } from "./helpers/data-context";
import {
	SectionTitle,
	normalizedDuration,
	totalExperienceMonths,
} from "./helpers/helpers";

const replaceNewLineHTML = html => {
	if (!html) {
		return null;
	}

	const regex = /\\n/gi;
	return parse(html.replaceAll(regex, "<br />"));
};

const WorkExperience = () => {
	const data = React.useContext(DataContext);
	const totalMonths =
		totalExperienceMonths(data?.experiences) || data?.experience_total;

	return (
		<section id="experience" className="section section--experience">
			<SectionTitle
				text="Опыт работы"
				aside={totalMonths ? normalizedDuration(totalMonths) : null}
			/>

			{data?.experiences?.map((item, index) => (
				<article
					key={index}
					className={`entry entry--job${item?.endDate ? "" : " entry--current"}`}
				>
					<WorkPeriod period={{ from: item?.startDate, to: item?.endDate }} />

					<div className="entry__body">
						<div className="entry__head">
							<h3 className="entry__title">{item?.companyName}</h3>
							{item?.location && (
								<span className="entry__place">{item.location}</span>
							)}
							<p className="entry__position">{item?.position}</p>
						</div>

						<div className="entry__desc">
							{replaceNewLineHTML(item?.description)}
						</div>

						{item?.technologies?.length > 0 && (
							<p className="entry__tech">
								<span className="entry__label">Технологии:</span>{" "}
								<span translate="no">{item.technologies.join(", ")}</span>
							</p>
						)}
					</div>
				</article>
			))}
		</section>
	);
};

export default WorkExperience;
