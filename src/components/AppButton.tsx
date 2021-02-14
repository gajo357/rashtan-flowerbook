import React from "react";
import { Button, Space } from "antd";
import Icon from "@ant-design/icons";

interface Props {
  icon: React.ComponentType;
  children: React.ReactNode;
  onClick: () => void;
}

const AppButton: React.FC<Props> = ({ children, icon, onClick }) => {
  return (
    <Button className="App-button" onClick={onClick}>
      <Space direction="vertical">
        <Icon component={icon} />
        {children}
      </Space>
    </Button>
  );
};

export default AppButton;
