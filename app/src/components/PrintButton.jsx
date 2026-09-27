import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

// Печать и есть «экспорт в PDF»: вёрстку для бумаги задаёт print.scss
const PrintButton = () => (
	<button type="button" className="print-button" onClick={() => window.print()}>
		<FontAwesomeIcon icon={faPrint} />
		Распечатать / PDF
	</button>
);

export default PrintButton;
