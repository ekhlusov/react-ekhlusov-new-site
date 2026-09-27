import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faLinkedinIn,
	faTelegramPlane,
	faVk,
} from "@fortawesome/free-brands-svg-icons";
import copy from "copy-to-clipboard";

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
		title: "GitHub",
		link: "https://github.com/ekhlusov",
		text: "github.com/ekhlusov",
		icon: faGithub,
	},
	{
		title: "Хабр Карьера",
		link: "https://career.habr.com/ekhlusov",
		text: "career.habr.com/ekhlusov",
		icon: faBriefcase,
	},
	{
		title: "LinkedIn",
		link: "https://www.linkedin.com/ekhlusov",
		text: "linkedin.com/ekhlusov",
		icon: faLinkedinIn,
	},
	{
		title: "ВКонтакте",
		link: "https://vk.com/ekhlusov",
		text: "vk.com/ekhlusov",
		icon: faVk,
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
						title={`${item.title}: ${item.text}`}
						onClick={item.onClick}
						{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
					>
						<FontAwesomeIcon icon={item.icon} className="contacts__icon" fixedWidth />
						<span className="contacts__text">{item.text}</span>
					</a>
				</li>
			);
		})}
	</ul>
);

export default Contacts;
