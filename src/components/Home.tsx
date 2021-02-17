import { Col, Row } from "antd";
import React, { useState } from "react";
import BouquetIcon from "../assets/BouquetIcon";
import DollarsIcon from "../assets/DollarsIcon";
import NewIcon from "../assets/NewIcon";
import TrashIcon from "../assets/TrashIcon";
import withRole from "../hooks/withRole";
import { RoleDto } from "../models/User";
import AppButton from "./AppButton";
import Logo from "./Logo";

const Home: React.FC = () => {
  const [, setCount] = useState(0);

  return (
    <>
      <Logo />

      <Row gutter={16}>
        <Col flex={1}>
          <AppButton
            onClick={() => setCount(count => count + 1)}
            icon={BouquetIcon}
          >
            Prodato
          </AppButton>
        </Col>
        <Col flex={1}>
          <AppButton
            onClick={() => setCount(count => count + 1)}
            icon={TrashIcon}
          >
            Bačeno
          </AppButton>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "1em" }}>
        <Col flex={1}>
          <AppButton
            onClick={() => setCount(count => count + 1)}
            icon={DollarsIcon}
          >
            Pazar
          </AppButton>
        </Col>
        <Col flex={1}>
          <AppButton
            onClick={() => setCount(count => count + 1)}
            icon={NewIcon}
          >
            Novo
          </AppButton>
        </Col>
      </Row>
    </>
  );
};

export default withRole(Home, RoleDto.Worker);
