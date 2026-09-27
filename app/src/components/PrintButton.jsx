import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

// Печать и есть «экспорт в PDF»: вёрстку для бумаги задаёт print.scss
const PrintButton = () => (
	<button
		type="button"
		className="print-button"
		title="Откроется печать — выберите «Сохранить как PDF»"
		onClick={() => window.print()}
	>
		<FontAwesomeIcon icon={faArrowDown} />
		<span className="print-button__label">Скачать PDF</span>
	</button>
);

export default PrintButton;
