import style from "./style.module.scss";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={style.footer}>
      <Logo></Logo>
      <Menu></Menu>
      <p>©{currentYear} All rights reserved by Me </p>
    </div>
  );
};

export default Footer;
