import React from "react";

import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import ContactForm from "./ContactForm";

function RightContainer(props) {
  return (
    <>
      <Skills />
      <WorkExperience />
      <Education />
      <ContactForm />
      <hr />
    </>
  );
}

export default RightContainer;
