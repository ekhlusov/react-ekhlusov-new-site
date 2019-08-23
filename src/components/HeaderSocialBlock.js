import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import {
  faTelegramPlane,
  faVk,
  faFacebookF,
  faInstagram,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import mkLogo from "../assets/images/moi_krug_logo.png";

import copy from "copy-to-clipboard";

const copyEmail = () => {
  copy("ekhlusov@gmail.com");
};

const HeaderSocialBlock = () => {
  const social = [
    {
      link: "https://telegram.me/ekhlusov",
      title: "Telegram",
      icon: faTelegramPlane
    },
    { link: "https://vk.com/ekhlusov", title: "VK", icon: faVk },
    {
      link: "https://facebook.com/ekhlusov",
      title: "Facebook",
      icon: faFacebookF
    },
    {
      link: "https://www.instagram.com/ekhlusov/",
      title: "Instagram",
      icon: faInstagram
    },
    {
      link: "https://www.linkedin.com/ekhlusov",
      title: "LinkedIn",
      icon: faLinkedinIn
    },
    {
      link: "mailto:ekhlusov@gmail.com",
      title: "Email",
      icon: faAt,
      copy: true
    }
    // TODO - сделать копирование в буфер
  ];

  return (
    <>
      <div className="sidebar__social">
        {/* TODO: поменять класс */}
        <a
          href="https://moikrug.ru/ekhlusov"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={mkLogo}
            alt="Мой круг"
            className="sidebar__social--mkLogo"
          />
        </a>

        {social.map((item, index) => (
          <a
            href={item.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            {...(item.copy === true
              ? { onClick: copyEmail, target: "_self" }
              : {})}
          >
            <FontAwesomeIcon icon={item.icon} />
          </a>
        ))}
      </div>

      <div className="sidebar__social--print-block">
        {social.map((item, index) => (
          <p className="no-bottom-margin" key={index}>
            <b>{item.title}</b>:{" "}
            {item.title === "Email" ? "ekhlusov@gmail.com" : "ekhlusov"}
          </p>
        ))}
      </div>
    </>
  );
};

export default HeaderSocialBlock;
