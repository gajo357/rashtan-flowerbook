import React from "react";
import { Button, PageHeader } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import MiddleBox from "../MiddleBox";
import { useAuthContext } from "../../hooks/AuthProvider";
import { useNotificationContext } from "../../hooks/NotificationProvider";
import useQueryParams from "../../hooks/useQueryParams";

const VerifyEmail: React.FC = () => {
  const { user, logout } = useAuthContext();
  const { showToast } = useNotificationContext();
  const { invitationCode } = useQueryParams();

  return (
    <PageHeader title="Potvrdi adresu e-pošte">
      <MiddleBox>
        <h3>
          Morate potvrditi adresu Vaše e-pošte {user?.email}. Molimo proverite
          Vašu e-poštu i pritisnite dugme za potvrdu! Морате потврдити адресу
          Ваше е-поште {{ user }}. Молимо преверите вашу е-пошту и притисните
          дугме за потврду!
        </h3>
        <Button
          block
          htmlType="submit"
          onClick={() =>
            user
              ?.sendEmailVerification(invitationCode)
              .then(() => showToast({ message: "Poslata poruka za potvrdu!" }))
          }
        >
          Ponovo pošalji poruku za potvrdu
        </Button>
        <Button block type="default" onClick={logout} icon={<LogoutOutlined />}>
          Odjavi se
        </Button>
      </MiddleBox>
    </PageHeader>
  );
};

export default VerifyEmail;
