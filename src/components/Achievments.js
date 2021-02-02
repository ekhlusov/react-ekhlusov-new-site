import React from "react";
import WorkPeriod from "./WorkPeriod";
import { TitleWithLines } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

const Achievements = () => {
	const data = React.useContext(DataContext);

	return (
		<>
			<div className="right-container__achievements">
				<TitleWithLines text="Достижения и курсы" />

				{data?.achievements &&
					data?.achievements?.map(({ title = "Нет заголовка", link = "#" }) => {
						return (
							<div
								key={title}
								className="right-container__achievements--info-block"
							>
								<div className="course_item">
									<a href={link} target="_blank">
										{title}
									</a>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default Achievements;
