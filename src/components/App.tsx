import React, { useState } from "react";
import Logo from "../assets/logo.svg?component";
import Flower from "../assets/flower.svg?component";
import Bouquet from "../assets/bouquet.svg?component";
import Trash from "../assets/trash.svg?component";
import Dollars from "../assets/dollars.svg?component";
import New from "../assets/new.svg?component";
import "../theme/App.less";
import AppButton from "./AppButton";
import { Col, Row, Layout, Space } from "antd";
import Icon, { MenuOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Layout>
        <Header>
          <Row>
            <Col flex="1">
              <Icon component={Flower} className="icon-logo" />
            </Col>
            <Col flex="4">
              <p>FlowersBook</p>
            </Col>
            <Col flex="1">
              <MenuOutlined />
            </Col>
          </Row>
        </Header>
        <Content>
          <Icon component={Logo} className="App-logo" />

          <Row gutter={16}>
            <Col flex={1}>
              <AppButton
                onClick={() => setCount(count => count + 1)}
                icon={Bouquet}
              >
                Prodato
              </AppButton>
            </Col>
            <Col flex={1}>
              <AppButton
                onClick={() => setCount(count => count + 1)}
                icon={Trash}
              >
                Bačeno
              </AppButton>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "1em" }}>
            <Col flex={1}>
              <AppButton
                onClick={() => setCount(count => count + 1)}
                icon={Dollars}
              >
                Pazar
              </AppButton>
            </Col>
            <Col flex={1}>
              <AppButton
                onClick={() => setCount(count => count + 1)}
                icon={New}
              >
                Novo
              </AppButton>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
