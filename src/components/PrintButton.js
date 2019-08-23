import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "reactstrap";

const PrintButton = () => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  return (
    <>
      <Tooltip
        placement="left"
        isOpen={tooltipIsOpen}
        autohide={true}
        target="print-button"
        toggle={() => setTooltipIsOpen(!tooltipIsOpen)}
      >
        Распечатать резюме
      </Tooltip>

      <div className="print-button" id="print-button" onClick={window.print}>
        <FontAwesomeIcon icon={faPrint} />
      </div>
    </>
  );
};

export default PrintButton;
