import React, { useEffect, useRef, useState } from "react";
import Contacts from "./Contacts";
import PrintButton from "./PrintButton";
import { DataContext } from "./helpers/data-context";
import SmoothImage from "react-smooth-image";
import me from "../assets/images/me.jpg";
import { declarationOfNumbers } from "./helpers/helpers";

export const ProfileFacts = ({ className }) => {
	const data = React.useContext(DataContext);
	const age = parseInt(data?.age);

	const facts = [
		[
			data?.location?.city,
			age ? `${age} ${declarationOfNumbers(age, ["год", "года", "лет"])}` : null,
		]
			.filter(Boolean)
			.join(", "),
	].filter(Boolean);

	return (
		<ul className={`facts ${className}`}>
			{facts.map(fact => (
				<li key={fact}>{fact}</li>
			))}
		</ul>
	);
};

/*
 * Шапка всегда сверху (position: fixed). Пока страница в самом верху, она
 * большая — с крупным фото, должностью и фактами; как только начинают
 * прокручивать (служебный блок-«датчик» у верха страницы уходит с экрана),
 * она сжимается в узкую полосу. На узком экране контакты в шапку не
 * помещаются — их показывает блок .intro под ней (App.jsx).
 * На бумаге шапка — заголовок документа с фото (print.scss).
 */
const Profile = () => {
	const data = React.useContext(DataContext);
	const [compact, setCompact] = useState(false);
	const sentinel = useRef(null);

	useEffect(() => {
		const node = sentinel.current;

		if (!node || typeof IntersectionObserver === "undefined") {
			return undefined;
		}

		const observer = new IntersectionObserver(([entry]) =>
			setCompact(!entry.isIntersecting)
		);
		observer.observe(node);

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<div ref={sentinel} className="profile-sentinel" aria-hidden="true" />

			<header className={`profile${compact ? " profile--compact" : ""}`}>
				<div className="profile__inner">
					<div className="profile__photo">
						<SmoothImage src={me} alt={data?.fullName} transitionTime={0.5} />
					</div>

					<div className="profile__id">
						<h1 className="profile__name">{data?.fullName}</h1>
						<p className="profile__position">{data?.cvHeadline}</p>
						<ProfileFacts className="profile__facts" />
					</div>

					<div className="profile__actions">
						<PrintButton />
						<Contacts />
					</div>
				</div>
			</header>
		</>
	);
};

export default Profile;
