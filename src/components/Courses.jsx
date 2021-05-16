import React from "react";
import { TitleWithLines } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

const Courses = () => {
	const data = React.useContext(DataContext);

	if (!data?.courses || data.courses.length < 1) {
		return null;
	}

	return (
		<>
			<div className="right-container__achievements">
				<TitleWithLines text="Курсы и достижения" />

				{data?.courses &&
					data?.courses?.map(
						({ year = null, title = null, url = null, description = null }) => {
							return (
								<div
									key={title}
									className="right-container__achievements--info-block"
								>
									<div className="course_item">
										<div className="course_item--year">{year}</div>
										<div className="course_item--title">{title}</div>

										{url && (
											<div className="course_item--url">
												<a href={url} target="_blank" rel="noreferrer">
													Открыть сертификат
												</a>
											</div>
										)}

										{description && (
											<div className="course_item--description">
												{description}
											</div>
										)}
									</div>
								</div>
							);
						}
					)}
			</div>
		</>
	);
};

export default Courses;
