import React from "react";
import moment from "../moment-ru";
import { normalizedCompanyDuration } from "./helpers/helpers";

const formatMonth = date => moment(date).format("MMMM YYYY");

const WorkPeriod = ({ period, show }) => {
	return (
		<>
			<div className="right-container__work-experience--info-block--item-period">
				<span>{formatMonth(period.from)}</span>
				{" - "}
				<span>
					{period.to ? formatMonth(period.to) : "по настоящее время"}
				</span>
				{show !== false &&
					" (" +
						normalizedCompanyDuration({
							from: period.from,
							to: period.to,
						}) +
						")"}
			</div>
		</>
	);
};

export default WorkPeriod;
