import React from "react";
import WorkPeriod from "./WorkPeriod";
import { TitleWithLines } from "./helpers/helpers";
import { DataContext } from "./helpers/data-context";

const Education = props => {
	const data = React.useContext(DataContext);

	return (
		<>
			<div className="right-container__education">
				<TitleWithLines text="Образование" />

				{data?.education &&
					data?.education.map((item, index) => (
						<div key={index} className="right-container__education--info-block">
							<div className="right-container__education--info-block--item">
								<WorkPeriod
									period={{ from: item?.startDate, to: item?.endDate }}
									show={false}
								/>

								<p className="right-container__education--info-block--item-un">
									{item?.name}
								</p>

								<p className="right-container__education--info-block--item-faculty">
									{item?.faculty} - {item?.description}
								</p>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Education;
