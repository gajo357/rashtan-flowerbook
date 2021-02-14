import { Col, Row } from "antd";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

const MiddleBox: React.FC<Props> = ({ children, className, hidden }) => {
  return (
    <Row hidden={hidden}>
      <Col
        className={className}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 6, offset: 3 }}
        xl={{ span: 4, offset: 4 }}
      >
        {children}
      </Col>
    </Row>
  );
};

export default MiddleBox;
