import React, { useState } from "react";
import logo from "../assets/logo.svg";
import Flower from "../assets/flower.svg?component";
import Trash from "../assets/trash.svg?component";
import Dollars from "../assets/dollars.svg?component";
import New from "../assets/new.svg?component";
import "../theme/App.less";
import AppButton from "./AppButton";
import { Col, Row } from "antd";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Row gutter={[16, 16]}>
          <Col flex={1}>
            <AppButton
              onClick={() => setCount(count => count + 1)}
              icon={Flower}
            >
              Utrošeno
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
        <Row gutter={[16, 16]} style={{ marginTop: "0.5em" }}>
          <Col flex={1}>
            <AppButton
              onClick={() => setCount(count => count + 1)}
              icon={Dollars}
            >
              Pazar
            </AppButton>
          </Col>
          <Col flex={1}>
            <AppButton onClick={() => setCount(count => count + 1)} icon={New}>
              Novo
            </AppButton>
          </Col>
        </Row>

        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export default App;
