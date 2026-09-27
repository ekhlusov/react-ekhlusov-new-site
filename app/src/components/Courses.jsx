import React from "react";
import { SectionTitle } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

const Courses = () => {
	const data = React.useContext(DataContext);

	if (!data?.courses?.length) {
		return null;
	}

	return (
		<section id="courses" className="section section--courses">
			<SectionTitle text="Курсы и повышение квалификации" />

			{data.courses.map(({ year = null, title = null, url = null, description = null }) => (
				<article key={title} className="entry">
					<div className="entry__period">
						<span className="entry__date">{year}</span>
					</div>

					<div className="entry__body">
						<h3 className="entry__title">{title}</h3>

						{description && <p className="entry__text">{description}</p>}

						{url && (
							<a
								className="entry__link"
								href={url}
								target="_blank"
								rel="noreferrer"
							>
								Сертификат
							</a>
						)}
					</div>
				</article>
			))}
		</section>
	);
};

export default Courses;
