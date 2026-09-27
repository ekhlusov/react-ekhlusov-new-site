import React, { useEffect, useRef, useState } from "react";
import { SECTIONS } from "./helpers/sections";

/*
 * Липкое оглавление слева. Показывает только те секции, что реально
 * отрисовались (пустые секции возвращают null), и подсвечивает ту,
 * что сейчас в верхней части экрана.
 */
const SectionNav = () => {
	const [items, setItems] = useState([]);
	const [active, setActive] = useState(null);
	// После клика по пункту держим его активным, пока идёт плавная прокрутка:
	// внизу страницы иначе подсветка перескочила бы на последнюю секцию
	const lockedUntil = useRef(0);

	useEffect(() => {
		const present = SECTIONS.filter(({ id }) => document.getElementById(id));
		setItems(present);
		setActive(present[0]?.id ?? null);

		if (!present.length || typeof IntersectionObserver === "undefined") {
			return undefined;
		}

		const last = present[present.length - 1].id;
		const inBand = new Set();
		let lastVisible = false;

		// Последняя секция внизу страницы до «активной» полосы не доезжает —
		// считаем её активной, когда она почти целиком на экране. Иначе
		// активна верхняя из секций, попавших в полосу.
		const update = () => {
			if (Date.now() < lockedUntil.current) {
				return;
			}

			if (lastVisible) {
				setActive(last);
				return;
			}

			const top = present.find(({ id }) => inBand.has(id));
			if (top) {
				setActive(top.id);
			}
		};

		const bandObserver = new IntersectionObserver(
			entries => {
				entries.forEach(entry =>
					entry.isIntersecting
						? inBand.add(entry.target.id)
						: inBand.delete(entry.target.id)
				);
				update();
			},
			// «Активная» полоса — от 15% до 45% высоты экрана
			{ rootMargin: "-15% 0px -55% 0px" }
		);

		const lastObserver = new IntersectionObserver(
			([entry]) => {
				lastVisible = entry.intersectionRatio >= 0.75;
				update();
			},
			{ threshold: [0, 0.75, 1] }
		);

		present.forEach(({ id }) => bandObserver.observe(document.getElementById(id)));
		lastObserver.observe(document.getElementById(last));

		return () => {
			bandObserver.disconnect();
			lastObserver.disconnect();
		};
	}, []);

	if (!items.length) {
		return null;
	}

	return (
		<nav className="toc" aria-label="Разделы резюме">
			<ul className="toc__list">
				{items.map(({ id, label }) => (
					<li key={id}>
						<a
							href={`#${id}`}
							className={`toc__link${active === id ? " toc__link--active" : ""}`}
							aria-current={active === id ? "true" : undefined}
							onClick={() => {
								lockedUntil.current = Date.now() + 1000;
								setActive(id);
							}}
						>
							{label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default SectionNav;
