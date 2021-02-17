import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Spin } from "antd";
import { UserProfileDto } from "../models/User";
import useApi from "../hooks/useApi";
import { useHistory } from "react-router";
import { useNotificationContext } from "../hooks/NotificationProvider";
import { useTitleContext } from "../hooks/TitleProvider";

const UserProfile: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileDto | undefined>();
  const { apiGet, apiPost } = useApi();
  const { handleError, showSuccessToast } = useNotificationContext();
  const history = useHistory();
  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Moj profil");
  }, []);

  useEffect(() => {
    apiGet<UserProfileDto>("user").then(setUserProfile).catch(handleError);
  }, []);

  const goHome = () => history.push("");

  const save = (values: UserProfileDto) => {
    setSubmitting(true);
    apiPost("user", values)
      .then(() => {
        showSuccessToast("Uspešno sačuvano!");
        goHome();
      })
      .catch(e => {
        handleError(e);
        setSubmitting(false);
      });
  };

  return (
    <Spin spinning={userProfile === undefined} size="large">
      {userProfile && (
        <Form initialValues={userProfile} layout="vertical" onFinish={save}>
          <Form.Item
            label="Ime i prezime"
            name="name"
            rules={[{ required: true }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ime i prezime" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled type="email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={submitting}>
              Sačuvaj
            </Button>
          </Form.Item>
        </Form>
      )}
    </Spin>
  );
};

export default UserProfile;
