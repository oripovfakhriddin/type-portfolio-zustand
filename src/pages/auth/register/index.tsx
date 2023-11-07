import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Form, Input, Spin } from "antd";

import useRegisterStore from "../../../zustand/auth/register";

import "./style.scss";

const RegisterPage = () => {
  const { register, loading } = useRegisterStore();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  return (
    <Fragment>
      <Spin spinning={loading}>
        <h1 className="register__title">Register</h1>
        <Flex className="form__register__box" align="center" justify="center">
          <Form
            form={form}
            onFinish={() => {
              register(form, navigate);
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
              label="Firstname"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your firstname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Lastname"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your lastname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

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
                Register
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Spin>
    </Fragment>
  );
};

export default RegisterPage;
