import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";

import Fade from "react-reveal/Fade";

function RightContainer(props) {
  return (
    <>
      <Fade>
        <Skills />
        <WorkExperience />
      </Fade>
      <Education />
    </>
  );
}

export default RightContainer;
