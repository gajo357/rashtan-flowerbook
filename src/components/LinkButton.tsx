import { Button, ButtonProps } from "antd";
import React from "react";
import { useHistory } from "react-router";

interface Props extends ButtonProps {
  to: string;
}

const LinkButton: React.FC<Props> = ({ to, ...rest }) => {
  const history = useHistory();

  const go = () => history.push(to);

  return <Button {...rest} onClick={go} />;
};

export default LinkButton;
