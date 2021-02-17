import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/AuthProvider";
import { RoleDto } from "../models/User";
import {
  UserOutlined,
  MenuOutlined,
  CopyrightOutlined,
  LogoutOutlined,
  ShopOutlined,
  BarChartOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import { Drawer, Menu } from "antd";
import { useTitleContext } from "../hooks/TitleProvider";

const MainMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const { user, logout } = useAuthContext();
  const history = useHistory();
  const location = useLocation();
  const { resetTitle } = useTitleContext();

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  useEffect(() => {
    isHome && resetTitle();
  }, [isHome]);

  const goTo = (path: string) => () => {
    history.push(path);
    setMenuOpen(false);
  };

  return (
    <>
      {!user?.role ? (
        <></>
      ) : isHome ? (
        <MenuOutlined onClick={() => setMenuOpen(v => !v)} />
      ) : (
        <ArrowLeftOutlined onClick={goTo("/")} />
      )}
      <Drawer
        title="FlowersBook"
        placement="right"
        onClose={() => setMenuOpen(false)}
        visible={menuOpen}
      >
        <Menu selectable={false} mode="vertical">
          <Menu.Item onClick={goTo("/userProfile")} icon={<UserOutlined />}>
            Moj profil
          </Menu.Item>
          {user?.role !== RoleDto.Worker && (
            <Menu.ItemGroup key="g1" title="Moja cvećara">
              <Menu.Item onClick={goTo("/settings")} icon={<ShopOutlined />}>
                Podešavanja
              </Menu.Item>
              <Menu.Item
                onClick={goTo("/contribution")}
                icon={<BarChartOutlined />}
              >
                Učinak
              </Menu.Item>
              <Menu.Item onClick={goTo("/workers")} icon={<TeamOutlined />}>
                Radnici
              </Menu.Item>
            </Menu.ItemGroup>
          )}
          <Menu.Divider />
          <Menu.Item onClick={goTo("/new-shop")} icon={<AppstoreAddOutlined />}>
            Nova cvećara
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={logout}
            icon={<LogoutOutlined />}
            style={{ marginTop: 20 }}
          >
            ODJAVA
          </Menu.Item>

          <Menu.Item style={{ marginTop: 40 }}>
            <CopyrightOutlined />
            2021 FlowersBook
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default MainMenu;
