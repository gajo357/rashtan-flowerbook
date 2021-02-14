import React from "react";
import { Button, Form, Input, PageHeader } from "antd";
import { useAuthContext } from "../../hooks/AuthProvider";
import MiddleBox from "../MiddleBox";
import { useHistory } from "react-router";
import { useNotificationContext } from "../../hooks/NotificationProvider";
import LinkButton from "../LinkButton";
import useQueryParams from "../../hooks/useQueryParams";
import GoogleLogin from "./GoogleLogin";

interface UserPass {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuthContext();
  const { handleError } = useNotificationContext();
  const history = useHistory();
  const { invitationCode } = useQueryParams();

  const loginLocal = (data: UserPass) =>
    login(data.email, data.password)
      .then(() => {
        invitationCode && history.push(`/invitation?code=${invitationCode}`);
      })
      .catch(handleError);

  return (
    <PageHeader title="Login">
      <MiddleBox>
        <Form onFinish={loginLocal}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Lozinka"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Molimo unesite lozinku" type="password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <GoogleLogin />
        <LinkButton to="forgot-password" type="link" block>
          Zaboravili ste lozinku?
        </LinkButton>

        <LinkButton
          to={invitationCode ? `register?code=${invitationCode}` : "register"}
          type="link"
          block
        >
          Nemate nalog?
        </LinkButton>
      </MiddleBox>
    </PageHeader>
  );
};

export default Login;
