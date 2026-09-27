import React from "react";
import { formatMonth, normalizedCompanyDuration } from "./helpers/helpers";

const capitalize = text => (text ? text[0].toUpperCase() + text.slice(1) : text);

// Левая колонка записи: даты в две строки и, если show не false, длительность
const WorkPeriod = ({ period, show }) => {
	return (
		<div className="entry__period">
			<span className="entry__date">{capitalize(formatMonth(period.from))} —</span>
			<span className="entry__date">
				{period.to ? capitalize(formatMonth(period.to)) : "по настоящее время"}
			</span>
			{show !== false && (
				<span className="entry__duration">
					{normalizedCompanyDuration({ from: period.from, to: period.to })}
				</span>
			)}
		</div>
	);
};

export default WorkPeriod;
