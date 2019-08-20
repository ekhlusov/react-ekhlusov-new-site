import React from "react";
//import { DataContext } from "./helpers/data-context";
import { TitleWithLines } from "./helpers/helpers";

// Думаю этот раздел не очень нужен

function Skills(props) {
  // Не будем получать лучше :-)
  // const data = React.useContext(DataContext);

  const skills = [
    "PHP",
    "Yii2",
    "MySQL",
    "Git",
    "JavaScript",
    "Docker",
    "Linux",
    "Nginx",
    "Bootstrap",
    "Верстка сайтов и Email-писем"
  ];

  return (
    <div className="right-container__skills">
      <TitleWithLines text="Профессиональные навыки" downloadButtons={true} />

      <div className="right-container__skills--block">
        {skills.join(" • ")}
        {/*data.skills.map(skill => (
          <div
            key={skill.alias_name}
            className="right-container__skills--block--item"
          >
            <span>{skill.title}</span>
          </div>
        ))*/}
      </div>
    </div>
  );
}

export default Skills;
