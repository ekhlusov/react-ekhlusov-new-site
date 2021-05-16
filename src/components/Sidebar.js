import React from "react";
import HeaderSocialBlock from "./HeaderSocialBlock";
import { DataContext } from "./helpers/data-context";
import SmoothImage from "react-smooth-image";
import parse from "html-react-parser";
import me from "../assets/images/me.jpg";
import { declarationOfNumbers } from "./helpers/helpers";

const Sidebar = () => {
	const data = React.useContext(DataContext);
	const age = parseInt(data?.age);

	return (
		<div className="sidebar">
			<div className="sidebar__photo">
				<SmoothImage src={me} alt={data?.fullName} transitionTime={0.5} />
			</div>

			<hr />

			<div className="sidebar__info">
				<h1>{data?.fullName}</h1>
				<h2>{data?.cvHeadline}</h2>
				<p>
					{data?.location?.city}, {age}{" "}
					{declarationOfNumbers(age, ["год", "года", "лет"])}
				</p>
				{data?.about && (
					<div className="sidebar__info--about">{parse(data?.about)}</div>
				)}
			</div>

			<hr />

			<HeaderSocialBlock />
		</div>
	);
};

export default Sidebar;
