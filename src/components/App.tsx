import React from "react";
import "../theme/App.less";
import { Modal, Button } from "antd";
import { AuthProvider } from "../hooks/AuthProvider";
import {
  NotificationConsumer,
  NotificationProvider
} from "../hooks/NotificationProvider";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./navigation/Navigation";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="App">
          <NotificationConsumer>
            {({ alert, hideAlert }) => {
              return (
                <>
                  <Modal
                    visible={alert !== undefined}
                    onCancel={hideAlert}
                    onOk={hideAlert}
                    title={alert?.title}
                    footer={alert?.buttons.map(b => (
                      <Button
                        key={b.text}
                        onClick={() => {
                          b.handler && b.handler();
                          hideAlert();
                        }}
                      >
                        {b.text}
                      </Button>
                    ))}
                  >
                    {alert?.message}
                  </Modal>
                </>
              );
            }}
          </NotificationConsumer>

          <Router>
            <Navigation />
          </Router>
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
