import { Button, Form, Input, PageHeader } from "antd";
import React from "react";
import { useAuthContext } from "../../hooks/AuthProvider";
import LinkButton from "../LinkButton";
import MiddleBox from "../MiddleBox";

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuthContext();

  const sendResetPasswordEmail = (e: { email: string }) =>
    forgotPassword(e.email)
      .then(() => {
        alert("email is sent");
      })
      .catch((error: any) => {
        alert(error.message);
      });

  return (
    <PageHeader title="Zaboravili ste lozinku?">
      <MiddleBox>
        <Form onFinish={sendResetPasswordEmail}>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Pošalji reset lozinke
            </Button>
          </Form.Item>
        </Form>

        <LinkButton type="link" to="/login" block>
          Idi na Login stranicu
        </LinkButton>
      </MiddleBox>
    </PageHeader>
  );
};

export default ForgotPassword;
