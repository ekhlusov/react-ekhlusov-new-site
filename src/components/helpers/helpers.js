import React from "react";
import moment from "moment";
import humanizeDuration from "humanize-duration";
import "moment/locale/ru";
import PrintButton from "../PrintButton";
// Нормальное отображение общего опыта
export const normalizedDuration = months => {
  return humanizeDuration(
    moment
      .duration({ months: months })
      .asMilliseconds()
      .toString(),
    { delimiter: " и ", language: "ru", units: ["y", "mo"], round: true }
  );
};

// Нормальное отображение опыта по каждому работадателю
export const normalizedCompanyDuration = ({ from, to }) => {
  let fromU = moment(from);
  let toU = to ? moment(to) : moment();

  let diffFromTo = fromU.diff(toU);

  return humanizeDuration(diffFromTo, {
    delimiter: " и ",
    language: "ru",
    units: ["y", "mo"],
    round: true
  });
};

// Заголовок с линиями
export const TitleWithLines = props => {
  // перенести в компонент опыт
  return props.text ? (
    <div className="lines-title">
      <hr />
      <h4>
        {props.text}

        {props.exp && (
          <span className="header-duration">
            {normalizedDuration(props.exp)}
          </span>
        )}

        {props.printButton && <PrintButton />}
      </h4>
      <hr />
    </div>
  ) : null;
};
