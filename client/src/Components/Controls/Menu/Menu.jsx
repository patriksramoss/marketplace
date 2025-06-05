import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

import defaultUserIcon from "../../../assets/images/user.png";
import menuIcon from "../../../assets/images/menu-icon.png";

//styling
import styles from "./styles.module.scss";

const CustomMenu = ({ items, authenticated }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const onClick = (e) => {
    navigate(e.key);
  };

  const customItems = items.map((item) => ({
    ...item,
    icon: (
      <img
        src={!authenticated ? menuIcon : defaultUserIcon}
        alt="custom-icon"
        className={styles.userIcon}
      />
    ),
  }));

  return (
    <div className={styles.customMenu}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={customItems}
        triggerSubMenuAction="click"
      />
    </div>
  );
};

export default CustomMenu;
