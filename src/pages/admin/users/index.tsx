import { Fragment, useEffect } from "react";

import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  // Select,
  Space,
  Table,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { LIMIT } from "../../../constants";
import { getUsersImage } from "../../../utils";
import useUsersStoreOfAdmin from "../../../zustand/admin/users";

import "./style.scss";

const UsersPage = () => {
  const {
    loading,
    loadingPhoto,
    total,
    data: users,
    search,
    selected,
    activePage,
    isModalLoading,
    isModalOpen,
    photoUserData,
    getData,
    setActivePage,
    showModal,
    closeModal,
    handleSearch,
    handleUserPhoto,
    editData,
    deleteData,
    addData,
  } = useUsersStoreOfAdmin();

  useEffect(() => {
    getData();
  }, [getData]);

  const [form] = Form.useForm();

  const newUsers = users.map((el) => ({ ...el, key: el._id }));

  return (
    <Fragment>
      <Flex
        justify="space-between"
        gap={36}
        className="users__header__box"
        align="center"
      >
        <h1 className="users__title">Users</h1>
        <Input
          className="users__search"
          type="text"
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        {/* <Select
          className="users__role__filter"
          value={isRole}
          onChange={(value) => {
            handleChange(value);
          }}
          style={{
            width: 120,
          }}
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "admin",
              label: "Admin",
            },
            {
              value: "client",
              label: "Client",
            },
            {
              value: "user",
              label: "User",
            },
          ]}
        /> */}
        <Button
          onClick={() => {
            showModal(form);
          }}
          type="primary"
        >
          Add users
        </Button>
      </Flex>
      <Flex className="users__search__box">
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "100%", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="users__role__filter__box">
        {/* <Select
          value={isRole}
          onChange={(value) => {
            handleChange(value);
          }}
          style={{
            width: 120,
          }}
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "admin",
              label: "Admin",
            },
            {
              value: "client",
              label: "Client",
            },
            {
              value: "user",
              label: "User",
            },
          ]}
        /> */}
      </Flex>
      <Flex className="users__count__box">
        {total === 0 ? <p>Users not</p> : <p>All users count: {total}</p>}
      </Flex>

      <Table
        scroll={{ x: 1000 }}
        loading={loading}
        pagination={false}
        dataSource={newUsers}
      >
        <Column
          title="User Photo"
          dataIndex="photo"
          key="photo"
          render={(data) => {
            return <Image className="users__photo" src={getUsersImage(data)} />;
          }}
        />
        <ColumnGroup title="Full Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Role" dataIndex="role" key="role" />
        <Column title="Username" dataIndex="username" key="username" />

        <Column
          title="Action"
          dataIndex="_id"
          key="action"
          render={(data) => {
            return (
              <Space size="middle">
                <Button
                  type="primary"
                  onClick={() => {
                    editData(data, form);
                  }}
                >
                  Edit
                </Button>
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      title: "Do you want to delete this user?",
                      onOk: () => {
                        deleteData(data);
                      },
                    });
                  }}
                >
                  Delete
                </Button>
              </Space>
            );
          }}
        />
      </Table>

      <Flex justify="center" style={{ marginTop: "40px" }}>
        {total > LIMIT ? (
          <Pagination
            total={total}
            pageSize={LIMIT}
            current={activePage}
            onChange={(page) => setActivePage(page)}
          />
        ) : null}
      </Flex>

      <Modal
        title={selected === null ? `Add new users` : "Save users"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add users" : "Save users"}
        open={isModalOpen}
        onOk={() => {
          addData(form);
        }}
        onCancel={closeModal}
      >
        <Form
          name="users"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader upload__photo"
            showUploadList={false}
            onChange={handleUserPhoto}
          >
            {photoUserData ? (
              <img
                src={getUsersImage(photoUserData)}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                {loadingPhoto ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>

          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please fill!",
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
                message: "Please fill!",
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
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Info"
            name="info"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
