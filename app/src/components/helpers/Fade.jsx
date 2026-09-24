import React, { useEffect, useRef, useState } from "react";

/*
 * Замена react-reveal (пакет заброшен и не поддерживает React 18).
 * Плавно проявляет блок, когда он попадает во вьюпорт.
 */
const Fade = ({ children }) => {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;

		if (!node || typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return undefined;
		}

		const observer = new IntersectionObserver(
			entries => {
				if (entries.some(entry => entry.isIntersecting)) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "0px 0px -10% 0px" }
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className={`fade-block${visible ? " fade-block--visible" : ""}`}>
			{children}
		</div>
	);
};

export default Fade;
