import React from "react";
import WorkPeriod from "./WorkPeriod";
import { TitleWithLines } from "./helpers/helpers";

const Education = (props) => {
  const data = {
    university_educations: [
      {
        start_date: "2010-09-01",
        end_date: "2015-07-01",
        university_name: "Белгородский государственный университет",
        faculty_name: "Педагогический",
        location: {
          city: "Белгород",
          country: "Россия",
        },
        description: "Учитель английского",
      },
    ],
  };

  return (
    <>
      <div className="right-container__education">
        <TitleWithLines text="Образование" />

        {data?.university_educations &&
          data?.university_educations.map((item, index) => (
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
