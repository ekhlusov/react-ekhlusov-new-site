import React from "react";
import WorkPeriod from "./WorkPeriod";
import parse from "html-react-parser";

import { DataContext } from "./helpers/data-context";
import { TitleWithLines } from "./helpers/helpers";

const WorkExperience = () => {
  const data = React.useContext(DataContext);

  return (
    <>
      <div className="right-container__work-experience">
        <TitleWithLines text="Опыт работы" exp={data.experience_total} />

        {data.experiences.map((item, index) => (
          <div
            key={index}
            className="right-container__work-experience--info-block"
          >
            <div className="right-container__work-experience--info-block--item">
              <WorkPeriod
                period={{ from: item.start_date, to: item.end_date }}
              />

              <p className="right-container__work-experience--info-block--item-cn">
                {item.company_name}
              </p>

              <p className="right-container__work-experience--info-block--item-city">
                {item.location.city}
              </p>

              <p className="right-container__work-experience--info-block--item-pos">
                {item.position}
              </p>

              <div className="right-container__work-experience--info-block--item-desc">
                {parse(item.description, {
                  replace: function(domNode) {
                    if (domNode.data === "\n") {
                      return <br />;
                    }
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkExperience;
