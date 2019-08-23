import React from "react";
import WorkPeriod from "./WorkPeriod";

import { DataContext } from "./helpers/data-context";
import { TitleWithLines } from "./helpers/helpers";

const Education = props => {
  const data = React.useContext(DataContext);

  return (
    <>
      <div className="right-container__education">
        <TitleWithLines text="Образование" />

        {data.university_educations.map((item, index) => (
          <div key={index} className="right-container__education--info-block">
            <div className="right-container__education--info-block--item">
              <WorkPeriod
                period={{ from: item.start_date, to: item.end_date }}
                show={false}
              />

              <p className="right-container__education--info-block--item-un">
                {item.university_name}
              </p>

              <p className="right-container__education--info-block--item-faculty">
                {item.faculty_name} - {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Education;
