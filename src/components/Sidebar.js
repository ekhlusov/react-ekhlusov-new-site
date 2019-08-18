import React from "react";
import striptags from "striptags";
import HeaderSocialBlock from "./HeaderSocialBlock";
import { DataContext } from "./helpers/data-context";

function Sidebar(props) {
  const data = React.useContext(DataContext);

  return (
    <div className="sidebar">
      <div className="sidebar__photo">
        <img
          src="https://habrastorage.org/getpro/moikrug/uploads/user/100/011/208/4/avatar/medium_b8a19ae5277b9324ce7ce8e7ac20c2a2.jpg"
          alt={data.full_name}
        />
      </div>

      <hr />

      <div className="sidebar__info">
        <h1>{data.full_name}</h1>
        <h2>{data.resume_headline}</h2>
        <p>
          {data.location.city}, {data.age} лет
        </p>
        <p className="sidebar__info--about">{striptags(data.about)}</p>
      </div>

      <hr />

      <HeaderSocialBlock />
    </div>
  );
}

export default Sidebar;
