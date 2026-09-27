import React from "react";
import Contacts from "./Contacts";
import PrintButton from "./PrintButton";
import { DataContext } from "./helpers/data-context";
import SmoothImage from "react-smooth-image";
import me from "../assets/images/me.jpg";
import {
	declarationOfNumbers,
	normalizedDuration,
	totalExperienceMonths,
} from "./helpers/helpers";

// В API этих полей нет, а в резюме по российской традиции они ожидаются
const WORK_FORMAT = "Полная занятость, удалённо или гибрид";
const RELOCATION = "Не готов к переезду, готов к командировкам";

// Шапка резюме: на экране — во всю ширину над контентом, на бумаге — тоже
const Profile = () => {
	const data = React.useContext(DataContext);
	const age = parseInt(data?.age);
	const experience =
		totalExperienceMonths(data?.experiences) || data?.experience_total;

	const facts = [
		[
			data?.location?.city,
			age ? `${age} ${declarationOfNumbers(age, ["год", "года", "лет"])}` : null,
		]
			.filter(Boolean)
			.join(", "),
		experience ? `Опыт ${normalizedDuration(experience)}` : null,
		WORK_FORMAT,
		RELOCATION,
	].filter(Boolean);

	return (
		<header className="profile">
			<div className="profile__photo">
				<SmoothImage src={me} alt={data?.fullName} transitionTime={0.5} />
			</div>

			<div className="profile__head">
				<h1 className="profile__name">{data?.fullName}</h1>
				<p className="profile__position">{data?.cvHeadline}</p>

				<ul className="profile__facts">
					{facts.map(fact => (
						<li key={fact}>{fact}</li>
					))}
				</ul>

				<div className="profile__actions">
					<PrintButton />
					<Contacts />
				</div>
			</div>
		</header>
	);
};

export default Profile;
