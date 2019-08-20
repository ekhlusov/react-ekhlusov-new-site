import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";

function RightContainer(props) {
  return (
    <>
      <Skills />
      <WorkExperience />
      <Education />
    </>
  );
}

export default RightContainer;
