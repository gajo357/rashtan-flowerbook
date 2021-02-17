import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../hooks/AuthProvider";
import { useNotificationContext } from "../hooks/NotificationProvider";
import { useTitleContext } from "../hooks/TitleProvider";
import useApi from "../hooks/useApi";
import ShopDto from "../models/ShopDto";

const NewShop: React.FC = () => {
  const { apiPut } = useApi();
  const { resetUser } = useAuthContext();
  const { handleError, showSuccessToast } = useNotificationContext();
  const history = useHistory();
  const { setTitle, resetTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Nova cvećara");
    return resetTitle;
  }, []);

  const createShop = (shop: ShopDto) =>
    apiPut<number>("shop/createShop", shop)
      .then(() => {
        resetUser().then(() => {
          showSuccessToast("Uspešno napravljeno!");
          history.replace("");
        });
      })
      .catch(handleError);

  return (
    <Form
      onFinish={createShop}
      initialValues={{
        id: 0,
        name: "",
        phone: "",
        email: "",
        website: ""
      }}
    >
      <Form.Item name="id" label="Id" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="Naziv cvećare"
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input placeholder="Unesite naziv cvećare" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input placeholder="Molimo e-poštu" type="email" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Telefon"
        rules={[
          {
            max: 25
          }
        ]}
      >
        <Input placeholder="Unesite telefon" />
      </Form.Item>
      <Form.Item
        name="website"
        label="Website"
        rules={[
          {
            max: 50
          }
        ]}
      >
        <Input placeholder="Website" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Napravi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewShop;
