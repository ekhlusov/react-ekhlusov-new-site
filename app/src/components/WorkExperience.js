import React from "react";
import WorkPeriod from "./WorkPeriod";
import parse from "html-react-parser";
import SberLogo from "../assets/images/sber_logo.svg";

import { DataContext } from "./helpers/data-context";
import { TitleWithLines } from "./helpers/helpers";

const WorkExperience = () => {
	const data = React.useContext(DataContext);

	const replaceNewLineHTML = html => {
		const regex = /\\n/gi;
		return parse(html.replaceAll(regex, "<br />"));
	};

	return (
		<>
			<div className="right-container__work-experience">
				<TitleWithLines text="Опыт работы" exp={data?.experience_total} />

				{data?.experiences?.map((item, index) => {
					console.log(item);
					return (
						<div
							key={index}
							className="right-container__work-experience--info-block"
						>
							<div className="right-container__work-experience--info-block--item">
								<WorkPeriod
									period={{ from: item?.startDate, to: item?.endDate }}
								/>

								<p className="right-container__work-experience--info-block--item-cn">
									{item?.companyName === "СБЕР" && (
										<img
											src={SberLogo}
											alt={item?.companyName}
											className="sber_logo"
										/>
									)}
									{item?.companyName}
								</p>

								<p className="right-container__work-experience--info-block--item-city">
									{item?.location}
								</p>

								<p className="right-container__work-experience--info-block--item-pos">
									{item?.position}
								</p>

								<div className="right-container__work-experience--info-block--item-desc">
									{replaceNewLineHTML(item?.description)}
								</div>

								{item?.technologies?.length > 0 && (
									<div
										className="right-container__work-experience--info-block--item-tech"
										style={{ marginBottom: 0 }}
									>
										<strong>Технологии:</strong>
										<br />
										{item?.technologies?.join(" • ")}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default WorkExperience;
