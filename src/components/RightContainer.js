import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";

import Fade from "react-reveal/Fade";

const RightContainer = () => {
  return (
    <>
      <Fade>
        <Skills />
        <WorkExperience />
      </Fade>
      <Education />
    </>
  );
};

export default RightContainer;
