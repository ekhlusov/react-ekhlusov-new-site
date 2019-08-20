import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "reactstrap";

export default function FloatingButton(props) {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  return (
    <>
      <Tooltip
        placement="left"
        isOpen={tooltipIsOpen}
        autohide={true}
        target="download-button"
        toggle={() => setTooltipIsOpen(!tooltipIsOpen)}
      >
        Скачать резюме
      </Tooltip>

      <div class="download-button" id="download-button">
        <a href="#downloadPdf">
          <FontAwesomeIcon icon={faFilePdf} size="2x" />
        </a>
      </div>
    </>
  );
}
