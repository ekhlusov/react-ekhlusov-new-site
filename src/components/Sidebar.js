import React from "react";
import HeaderSocialBlock from "./HeaderSocialBlock";
import { DataContext } from "./helpers/data-context";
import SmoothImage from "react-smooth-image";
import parse from "html-react-parser";
import me from "../assets/images/me.jpg";
import { declarationOfNumbers } from "./helpers/helpers";

const Sidebar = () => {
	const data = React.useContext(DataContext);
	const { info = {} } = data;
	const age = parseInt(info?.age);

	return (
		<div className="sidebar">
			<div className="sidebar__photo">
				<SmoothImage src={me} alt={data?.fullName} transitionTime={0.5} />
			</div>

			<hr />

			<div className="sidebar__info">
				<h1>{info?.fullName}</h1>
				<h2>{info?.headline}</h2>
				<p>
					{info?.city}, {age}{" "}
					{declarationOfNumbers(age, ["год", "года", "лет"])}
				</p>
				{info?.about && (
					<div className="sidebar__info--about">{parse(info?.about)}</div>
				)}
			</div>

			<hr />

			<HeaderSocialBlock />
		</div>
	);
};

export default Sidebar;
