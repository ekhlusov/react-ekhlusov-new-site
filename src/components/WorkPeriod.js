import React from "react";
import Moment from "react-moment";
import "moment/locale/ru";
import { normalizedCompanyDuration } from "./helpers/helpers";

function WorkPeriod({ period, show }) {
  return (
    <>
      <div className="right-container__work-experience--info-block--item-period">
        <span>
          <Moment format="MMMM YYYY" locale="ru" date={period.from} />
        </span>
        {" - "}
        <span>
          {period.to ? (
            <Moment format="MMMM YYYY" locale="ru" date={period.to} />
          ) : (
            "по настоящее время"
          )}
        </span>
        {show !== false &&
          " (" +
            normalizedCompanyDuration({
              from: period.from,
              to: period.to
            }) +
            ")"}
      </div>
    </>
  );
}

export default WorkPeriod;
