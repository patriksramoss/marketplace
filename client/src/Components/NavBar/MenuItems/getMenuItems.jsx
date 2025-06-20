import React, { useState, useEffect } from "react";
import {
  SettingOutlined,
  UserOutlined,
  LoginOutlined,
  MenuOutlined,
  ShopOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

const getMenuItems = (authenticated) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1045);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    axios
      .get(`${API_BASE_URL}/api/logout`, { withCredentials: true })
      .then(() => {
        navigate(`/login`);
        location.reload();
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const menuItems = [
    {
      label: "",
      key: "Menu",
      icon: <MenuOutlined />,
      children: [
        ...(isMobile
          ? [
              ...(authenticated
                ? [
                    {
                      label: "Market",
                      key: "/market",
                      icon: <ShopOutlined />,
                    },
                    {
                      label: "Balance",
                      key: "/balance",
                      icon: <DollarOutlined />,
                    },
                    {
                      label: "Settings",
                      key: "/settings",
                      icon: <SettingOutlined />,
                    },
                    {
                      label: "Log out",
                      key: "/",
                      onClick: handleLogout,
                      icon: <LoginOutlined />,
                    },
                  ]
                : [
                    {
                      label: "Log in",
                      key: "/login",
                      icon: <LoginOutlined />,
                    },
                    {
                      label: "Register",
                      key: "/register",
                      icon: <UserOutlined />,
                    },
                  ]),
            ]
          : [
              {
                label: "Settings",
                key: "/settings",
                icon: <SettingOutlined />,
              },
              {
                label: "Log out",
                key: "/",
                onClick: handleLogout,
                icon: <LoginOutlined />,
              },
            ]),
      ],
    },
  ];

  return menuItems;
};

export default getMenuItems;
