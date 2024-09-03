import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LoginOutlined,
  MenuOutlined,
  HomeOutlined,
  FolderOpenOutlined,
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
      setIsMobile(window.innerWidth <= 640); // 640px = 40rem
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
              {
                label: authenticated ? "Table" : "Register",
                key: authenticated ? "/table" : "/register",
                icon: <FolderOpenOutlined />,
              },
              // {
              //   label: authenticated ? "Plants" : "Login",
              //   key: authenticated ? "/plants" : "/login",
              //   icon: <ShopOutlined />,
              // },
              ...(authenticated
                ? [
                    {
                      label: "Market",
                      key: "/market",
                      icon: <ShopOutlined />,
                    },
                    {
                      label: "Points",
                      key: "/points",
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
                : []),
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
