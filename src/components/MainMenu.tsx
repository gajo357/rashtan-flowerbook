import React, { useState } from "react";
import { useAuthContext } from "../hooks/AuthProvider";
import { RoleDto } from "../models/User";
import {
  UserOutlined,
  MenuOutlined,
  CopyrightOutlined,
  LogoutOutlined,
  SettingOutlined,
  BarChartOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { Drawer, Menu } from "antd";

const MainMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const history = useHistory();

  return (
    <>
      <MenuOutlined onClick={() => setMenuOpen(v => !v)} />
      <Drawer
        title="FlowersBook"
        placement="right"
        onClose={() => setMenuOpen(false)}
        visible={menuOpen}
      >
        <Menu selectable={false} mode="vertical">
          <Menu.Item
            onClick={() => history.push("/userProfile")}
            icon={<UserOutlined />}
          >
            Moj profil
          </Menu.Item>
          {user?.role !== RoleDto.Worker && (
            <>
              <Menu.Item
                onClick={() => history.push("/settings")}
                icon={<SettingOutlined />}
              >
                Podešavanja
              </Menu.Item>
              <Menu.Item
                onClick={() => history.push("/contribution")}
                icon={<BarChartOutlined />}
              >
                Učinak
              </Menu.Item>
              <Menu.Item
                onClick={() => history.push("/workers")}
                icon={<TeamOutlined />}
              >
                Radnici
              </Menu.Item>
            </>
          )}
          <Menu.Divider />
          <Menu.Item onClick={logout} icon={<LogoutOutlined />}>
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
