import React from "react";
import PrintButton from "../PrintButton";

const monthFormatter = new Intl.DateTimeFormat("ru-RU", { month: "long" });

// "октябрь 2019"
export const formatMonth = date => {
	const d = new Date(date);
	return `${monthFormatter.format(d)} ${d.getFullYear()}`;
};

export const declarationOfNumbers = (n, titles) =>
	titles[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
			? 1
			: 2
	];

// Нормальное отображение общего опыта: "11 лет и 10 месяцев"
export const normalizedDuration = totalMonths => {
	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;

	const parts = [];

	if (years) {
		parts.push(`${years} ${declarationOfNumbers(years, ["год", "года", "лет"])}`);
	}

	if (months) {
		parts.push(
			`${months} ${declarationOfNumbers(months, ["месяц", "месяца", "месяцев"])}`
		);
	}

	return parts.length ? parts.join(" и ") : "меньше месяца";
};

// Нормальное отображение опыта по каждому работадателю
export const normalizedCompanyDuration = ({ from, to }) => {
	const start = new Date(from);
	const end = to ? new Date(to) : new Date();

	let months =
		(end.getFullYear() - start.getFullYear()) * 12 +
		(end.getMonth() - start.getMonth());

	if (end.getDate() < start.getDate()) {
		months -= 1;
	}

	return normalizedDuration(Math.max(months, 0));
};

// Заголовок с линиями
export const TitleWithLines = props => {
	return props.text ? (
		<div className="lines-title">
			<hr />
			<h4>
				{props.text}

				{props.exp && (
					<span className="header-duration">{normalizedDuration(props.exp)}</span>
				)}

				{props.printButton && <PrintButton />}
			</h4>
			<hr />
		</div>
	) : null;
};
