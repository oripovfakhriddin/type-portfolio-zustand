import { Fragment, useEffect } from "react";

import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import { LIMIT } from "../../../constants";
import useEducationStoreOfAdmin from "../../../zustand/admin/education";
import { UserLoginType } from "../../../zustand/auth/login";

import "./style.scss";

const AdminEducationPage = () => {
  const {
    loading,
    selected,
    isModalLoading,
    total,
    data: educations,
    search,
    activePage,
    isModalOpen,
    getData,
    editData,
    addData,
    deleteData,
    handleSearch,
    setActivePage,
    showModal,
    closeModal,
  } = useEducationStoreOfAdmin();

  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, [getData]);

  const newEducations = educations.map((el) => ({ ...el, key: el?._id }));

  const columns = [
    {
      title: "Full name",
      dataIndex: "user",
      key: "name",
      render: (data: UserLoginType) => (
        <p>
          {data?.firstName} {data?.lastName}
        </p>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => <time>{date.split("T")[0]}</time>,
    },
    {
      title: "Finish date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => <time>{date.split("T")[0]}</time>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (data: string) => (
        <Space size="middle">
          <Button
            onClick={() => {
              editData(data, form);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              Modal.confirm({
                title: "Do you want to delete this education?",
                onOk: () => {
                  deleteData(data);
                },
              });
            }}
            danger
            type="primary"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Flex
        justify="space-between"
        gap={36}
        className="education__header__box"
        align="center"
      >
        <h1 className="education__title">Education</h1>
        <Input
          className="search__education"
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        <Button
          onClick={() => {
            showModal(form);
          }}
          type="primary"
        >
          Add education
        </Button>
      </Flex>
      <Flex className="education__search__box">
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "100%", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="education__count__box">
        {total === 0 ? (
          <p>Education not</p>
        ) : (
          <p>All education count: {total}</p>
        )}
      </Flex>
      <Table
        pagination={false}
        columns={columns}
        loading={loading}
        dataSource={newEducations}
        scroll={{ x: 1000 }}
      />
      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={activePage}
          onChange={(page) => setActivePage(page)}
        />
      ) : null}
      <Modal
        title={selected === null ? `Add new education` : "Save education"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add education" : "Save education"}
        open={isModalOpen}
        onOk={() => {
          addData(form);
        }}
        onCancel={closeModal}
      >
        <Form
          name="education"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
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
            label="Leve"
            name="level"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Flex justify="space-between" gap={36} align="center">
            <Form.Item
              label="Start date"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Finish date"
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AdminEducationPage;
