import React from "react";
import { Button, Form, Input, PageHeader } from "antd";
import { useAuthContext } from "../../hooks/AuthProvider";
import { useHistory } from "react-router";
import { useNotificationContext } from "../../hooks/NotificationProvider";
import { RegisterDataDto } from "../../models/User";
import LinkButton from "../LinkButton";
import useQueryParams from "../../hooks/useQueryParams";
import GoogleLogin from "./GoogleLogin";

const Register: React.FC = () => {
  const { register } = useAuthContext();
  const { handleError } = useNotificationContext();
  const history = useHistory();
  const { invitationCode } = useQueryParams();

  const registerLocal = (e: RegisterDataDto) =>
    register(e, invitationCode)
      .then(() => {
        invitationCode && history.push(`/invitation?code=${invitationCode}`);
      })
      .catch(handleError);

  return (
    <PageHeader title="Registruj se">
      <Form onFinish={registerLocal} layout="vertical">
        <Form.Item
          name="name"
          label="Ime i Prezime"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input placeholder="Ime i prezime" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input placeholder="Molimo unsesite adresu e-pošte" type="email" />
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
            Registruj se
          </Button>
        </Form.Item>
      </Form>

      <GoogleLogin />
      <LinkButton
        block
        to={invitationCode ? `login?code=${invitationCode}` : "login"}
        type="link"
      >
        Idi na Login
      </LinkButton>
    </PageHeader>
  );
};

export default Register;
