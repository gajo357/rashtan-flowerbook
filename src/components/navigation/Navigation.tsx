import { Col, Layout, Row, Spin } from "antd";
import Icon, { MenuOutlined } from "@ant-design/icons";
import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import NonAuthRoute from "./NonAuthRoute";
import ForgotPassword from "../auth/ForgotPassword";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useAuthContext } from "../../hooks/AuthProvider";
import FlowerIcon from "../../assets/FlowerIcon";
import Home from "../Home";
import VerifyEmail from "../auth/VerifyEmail";
import AuthRoute from "./AuthRoute";
import MainMenu from "../MainMenu";
import UserProfile from "../UserProfile";
import { TitleConsumer, TitleProvider } from "../../hooks/TitleProvider";
import NewShop from "../NewShop";
import AcceptInvitation from "../AcceptInvitation";

const { Header, Content } = Layout;

const Navigation: React.FC = () => {
  const { authenticated, loadingAuthState, user, logout } = useAuthContext();

  if (!loadingAuthState && user && !user.emailVerified) {
    return <VerifyEmail />;
  }

  return (
    <TitleProvider>
      <TitleConsumer>
        {({ title }) => (
          <Layout>
            <Header>
              <Row>
                <Col flex="1">
                  <Icon component={FlowerIcon} className="icon-logo" />
                </Col>
                <Col flex="4">
                  <p>{title}</p>
                </Col>
                {authenticated && (
                  <Col flex="1">
                    <MainMenu />
                  </Col>
                )}
              </Row>
            </Header>
            <Content>
              <Switch>
                <NonAuthRoute path="/login" component={Login} />
                <NonAuthRoute path="/register" component={Register} />
                <NonAuthRoute
                  path="/forgot-password"
                  component={ForgotPassword}
                />

                <Route path="/accept-invitation" component={AcceptInvitation} />

                <AuthRoute path="/new-shop" component={NewShop} exact />
                <AuthRoute path="/userProfile" component={UserProfile} exact />

                <AuthRoute path="/" component={Home} />
              </Switch>
            </Content>
          </Layout>
        )}
      </TitleConsumer>
    </TitleProvider>
  );
};

export default Navigation;
