import style from "./style.module.scss";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useUser();

  return (
    <div className={style.footer}>
      <Logo></Logo>
      <Menu user={user}></Menu>
      <p>©{currentYear} All rights reserved by Me </p>
    </div>
  );
};

export default Footer;
