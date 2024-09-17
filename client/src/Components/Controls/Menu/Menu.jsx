import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

import defaultUserIcon from "../../../assets/images/user.png";

//styling
import styles from "./styles.module.scss";

const CustomMenu = ({ items }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const onClick = (e) => {
    navigate(e.key);
  };

  // Modify items to include custom icons
  const customItems = items.map((item) => ({
    ...item,
    icon: (
      <img
        src={defaultUserIcon}
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
