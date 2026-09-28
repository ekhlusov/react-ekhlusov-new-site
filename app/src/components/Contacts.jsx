import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import copy from "copy-to-clipboard";

// Логотипа MAX нет в FontAwesome — контур взят из официального max.ru/favicon.svg
const MaxIcon = () => (
	<svg
		className="svg-inline--fa fa-fw contacts__icon"
		viewBox="0 0 100 100"
		aria-hidden="true"
		focusable="false"
	>
		<path fill="currentColor" fillRule="evenodd" d="M50.7571 0.261719C78.2929 0.261719 99.8857 22.5974 99.8857 50.1474C99.8857 77.6974 77.6071 99.4903 51.0214 99.4903C41.5857 99.4903 37.0143 98.1617 29.65 92.9474C29.1429 92.5903 28.45 92.6831 28.0214 93.1403C22.3571 99.1831 7.85 103.426 7.18571 95.176C7.18571 80.7903 0 71.4474 0 49.876C0 21.5546 23.2214 0.261719 50.7571 0.261719ZM51.5286 24.8117C38.4643 24.126 28.2643 33.1974 26.0143 47.3831C24.15 59.1332 27.45 73.4546 30.2786 74.176C31.4786 74.4832 34.3571 72.276 36.4571 70.2974C36.85 69.926 37.45 69.8617 37.9071 70.1474C41.1786 72.1474 44.8786 73.6474 48.9571 73.8617C62.3714 74.5617 74.2571 64.0617 74.9643 50.6474C75.6643 37.2331 64.9429 25.5046 51.5286 24.8046V24.8117Z" />
	</svg>
);

const EMAIL = "ekhlusov@gmail.com";

// text — полный адрес без https://: на экране он в подсказке и для скринридера,
// на бумаге печатается рядом с иконкой
const contacts = [
	{
		title: "Почта",
		link: `mailto:${EMAIL}`,
		text: EMAIL,
		icon: faAt,
		onClick: () => copy(EMAIL),
	},
	{
		title: "Telegram",
		link: "https://t.me/ekhlusov",
		text: "t.me/ekhlusov",
		icon: faTelegramPlane,
	},
	{
		title: "MAX",
		link: "https://max.ru/u/f9LHodD0cOLSJeQ9Uq4LUiYNXn3_qxLbPflEWBB-QWcQXgTIwGewqZbJKlQ",
		text: "MAX",
		Icon: MaxIcon,
	},
	{
		title: "GitHub",
		link: "https://github.com/ekhlusov",
		text: "github.com/ekhlusov",
		icon: faGithub,
	},
];

const Contacts = () => (
	<ul className="contacts" translate="no">
		{contacts.map(item => {
			const external = !item.link.startsWith("mailto:");

			return (
				<li key={item.title} className="contacts__item">
					<a
						className="contacts__link"
						href={item.link}
						title={item.text === item.title ? item.title : `${item.title}: ${item.text}`}
						onClick={item.onClick}
						{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
					>
						{item.Icon ? (
							<item.Icon />
						) : (
							<FontAwesomeIcon icon={item.icon} className="contacts__icon" fixedWidth />
						)}
						<span className="contacts__text">{item.text}</span>
					</a>
				</li>
			);
		})}
	</ul>
);

export default Contacts;
