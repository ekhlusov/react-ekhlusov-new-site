import React from "react";
import Contacts from "./Contacts";
import PrintButton from "./PrintButton";
import { DataContext } from "./helpers/data-context";
import SmoothImage from "react-smooth-image";
import me from "../assets/images/me.jpg";
import { declarationOfNumbers } from "./helpers/helpers";

// В API этих полей нет, а в резюме по российской традиции они ожидаются
const WORK_FORMAT = "Полная занятость, удалённо или гибрид";
const RELOCATION = "Не готов к переезду, готов к командировкам";

const Sidebar = () => {
	const data = React.useContext(DataContext);
	const age = parseInt(data?.age);

	const cityAndAge = [
		data?.location?.city,
		age ? `${age} ${declarationOfNumbers(age, ["год", "года", "лет"])}` : null,
	]
		.filter(Boolean)
		.join(", ");

	return (
		<header className="profile">
			<div className="profile__photo">
				<SmoothImage src={me} alt={data?.fullName} transitionTime={0.5} />
			</div>

			<div className="profile__head">
				<h1 className="profile__name">{data?.fullName}</h1>
				<p className="profile__position">{data?.cvHeadline}</p>

				<ul className="profile__facts">
					{cityAndAge && <li>{cityAndAge}</li>}
					<li>{WORK_FORMAT}</li>
					<li>{RELOCATION}</li>
				</ul>

				<Contacts />
				<PrintButton />
			</div>
		</header>
	);
};

export default Sidebar;
