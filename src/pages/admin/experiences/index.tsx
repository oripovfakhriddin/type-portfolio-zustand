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
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";

import { LIMIT } from "../../../constants";
import useExperiencesStoreOfAdmin from "../../../zustand/admin/experiences";

import "./style.scss";

const AdminExperiencesPage = () => {
  const [form] = Form.useForm();

  const {
    search,
    selected,
    total,
    loading,
    data: experiences,
    activePage,
    isModalLoading,
    isModalOpen,
    handleSearch,
    setActivePage,
    addData,
    editData,
    getData,
    deleteData,
    showModal,
    closeModal,
  } = useExperiencesStoreOfAdmin();

  useEffect(() => {
    getData();
  }, [getData]);

  const newExperiences = experiences.map((el) => ({ ...el, key: el._id }));

  return (
    <Fragment>
      <Flex
        justify="space-between"
        gap={36}
        className="experience__header__box"
        align="center"
      >
        <h1 className="experience__title">Experiences</h1>
        <Input
          className="search__experience"
          type="text"
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
          Add experiences
        </Button>
      </Flex>
      <Flex className="experience__search__box">
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "100%", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="experience__count__box">
        {total === 0 ? (
          <p>Experiences not</p>
        ) : (
          <p>All Experiences count: {total}</p>
        )}
      </Flex>

      <Table
        scroll={{ x: 1020 }}
        loading={loading}
        pagination={false}
        dataSource={newExperiences}
      >
        <ColumnGroup title="Full name">
          <Column
            title="First Name"
            dataIndex="user"
            key="user"
            render={(data) => {
              return <p>{data?.firstName}</p>;
            }}
          />
          <Column
            title="Last Name"
            dataIndex="user"
            key="user"
            render={(data) => {
              return <p>{data?.lastName}</p>;
            }}
          />
        </ColumnGroup>
        <Column title="Work name" dataIndex="workName" key="workName" />
        <Column
          title="Company name"
          dataIndex="companyName"
          key="companyName"
        />
        <Column
          title="Start date"
          dataIndex="startDate"
          key="startDate"
          render={(data: string) => {
            return <time>{data.split("T")[0]}</time>;
          }}
        />
        <Column
          title="End date"
          dataIndex="endDate"
          key="endDate"
          render={(data: string) => {
            return <time>{data.split("T")[0]}</time>;
          }}
        />

        <Column
          title="Action"
          dataIndex="_id"
          key="_id"
          render={(data: string) => {
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
                      title: "Do you want to delete this experiences?",
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
        title={selected === null ? `Add new experiences` : "Save experiences"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add experiences" : "Save experiences"}
        open={isModalOpen}
        onOk={() => {
          addData(form);
        }}
        onCancel={closeModal}
      >
        <Form
          name="Experiences"
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
            label="Work name"
            name="workName"
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
            label="Company name"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AdminExperiencesPage;
