import React, { useEffect, useRef, useState } from "react";
import { SECTIONS } from "./helpers/sections";

/*
 * Липкое оглавление слева. Показывает только те секции, что реально
 * отрисовались (пустые секции возвращают null), и подсвечивает ту, что
 * сейчас читают.
 *
 * «Линия чтения» — на 30% высоты экрана под шапкой; активна последняя
 * секция, чей верх выше линии. Короткие секции внизу страницы до этой
 * линии никогда не доезжают, поэтому на последних полэкрана прокрутки
 * линия плавно опускается к низу экрана — и они по очереди становятся
 * активными.
 *
 * Слушаем scroll (passive, не чаще раза в кадр): IntersectionObserver не
 * даёт события, когда внизу все короткие секции уже целиком на экране.
 */
const SectionNav = () => {
	const [items, setItems] = useState([]);
	const [active, setActive] = useState(null);
	// После клика по пункту держим его активным, пока идёт плавная прокрутка
	const lockedUntil = useRef(0);

	useEffect(() => {
		const present = SECTIONS.filter(({ id }) => document.getElementById(id));
		setItems(present);

		if (!present.length) {
			return undefined;
		}

		let frame = 0;

		const compute = () => {
			frame = 0;

			if (Date.now() < lockedUntil.current) {
				return;
			}

			const viewport = window.innerHeight;
			const header = document.querySelector(".profile")?.offsetHeight ?? 0;
			const base = header + (viewport - header) * 0.3;
			const remaining =
				document.documentElement.scrollHeight - viewport - window.scrollY;
			const progress = Math.min(1, Math.max(0, 1 - remaining / (viewport / 2)));
			const line = base + progress * (viewport - 1 - base);

			let current = present[0].id;
			present.forEach(({ id }) => {
				if (document.getElementById(id).getBoundingClientRect().top <= line) {
					current = id;
				}
			});

			setActive(current);
		};

		const schedule = () => {
			if (!frame) {
				frame = requestAnimationFrame(compute);
			}
		};

		compute();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);

		return () => {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			cancelAnimationFrame(frame);
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
