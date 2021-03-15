import { Button, Form, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { useAuthContext } from "../hooks/AuthProvider";
import { useNotificationContext } from "../hooks/NotificationProvider";
import { useTitleContext } from "../hooks/TitleProvider";
import useApi from "../hooks/useApi";
import useQueryParams from "../hooks/useQueryParams";
import LinkButton from "./LinkButton";
import Logo from "./Logo";

interface Accept {
  code: string;
}

const AcceptInvitation: React.FC = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { resetUser, authenticated } = useAuthContext();
  const { apiPost } = useApi();
  const history = useHistory();
  const { showSuccessToast, handleError } = useNotificationContext();
  const { setTitle, resetTitle } = useTitleContext();
  const { invitationCode } = useQueryParams();

  useEffect(() => {
    setTitle("Pozivnica");
    return resetTitle;
  }, []);

  useEffect(() => {
    if (isSubmitting) return;
    if (!authenticated) {
      history.replace(
        invitationCode ? `/login?code=${invitationCode}` : "/login"
      );
      return;
    }

    if (invitationCode) {
      setSubmitting(true);
      acceptInvitation({ code: invitationCode });
    }
  }, [isSubmitting, authenticated, invitationCode]);

  const acceptInvitation = (data: Accept) =>
    apiPost<string>(`invitation/accept?code=${data.code}`, {})
      .then(() => {
        resetUser().then(() => {
          showSuccessToast("Uspešno ste prihvatili pozivnicu!");

          history.replace("");
        });
      })
      .catch(e => {
        setSubmitting(false);
        handleError(e);
      });

  return (
    <Spin spinning={isSubmitting} tip="Prihvatanj u toku">
      <Logo />

      <Form
        onFinish={acceptInvitation}
        initialValues={{ code: invitationCode ? invitationCode : "" }}
        layout="vertical"
      >
        <Form.Item
          name="code"
          label="Kod za pristup"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input placeholder="Molimo unesite kod za pristup" type="text" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Prihvati
          </Button>
        </Form.Item>
      </Form>
      <LinkButton to="new-shop" block>
        Napravi svoju cvećaru
      </LinkButton>
    </Spin>
  );
};

export default AcceptInvitation;
