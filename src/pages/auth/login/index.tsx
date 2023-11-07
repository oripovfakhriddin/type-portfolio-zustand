import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Form, Input, Spin } from "antd";

import useLoginStore from "../../../zustand/auth/login";

import "./style.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useLoginStore();
  const [form] = Form.useForm();

  return (
    <Fragment>
      <Spin spinning={loading}>
        <h1 className="login__title">Login</h1>
        <Flex className="form__box" align="center" justify="center">
          <Form
            form={form}
            onFinish={() => {
              login(form, navigate);
            }}
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Spin>
    </Fragment>
  );
};

export default LoginPage;
