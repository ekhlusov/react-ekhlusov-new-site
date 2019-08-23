import React from "react";
import HeaderSocialBlock from "./HeaderSocialBlock";
import { DataContext } from "./helpers/data-context";
import SmoothImage from "react-smooth-image";
import parse from "html-react-parser";
import me from "../assets/images/me.jpg";

const Sidebar = () => {
  const data = React.useContext(DataContext);

  return (
    <div className="sidebar">
      <div className="sidebar__photo">
        <SmoothImage src={me} alt={data.full_name} transitionTime={0.5} />
      </div>

      <hr />

      <div className="sidebar__info">
        <h1>{data.full_name}</h1>
        <h2>{data.resume_headline}</h2>
        <p>
          {data.location.city}, {data.age} лет
        </p>
        <div className="sidebar__info--about">{parse(data.about)}</div>
      </div>

      <hr />

      <HeaderSocialBlock />
    </div>
  );
};

export default Sidebar;
