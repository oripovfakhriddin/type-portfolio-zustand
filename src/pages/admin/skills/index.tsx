import { Fragment, useEffect } from "react";

import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";

import { LIMIT } from "../../../constants";
import useSkillsStoreOfAdmin from "../../../zustand/admin/skills";

import "./style.scss";

const AdminSkillsPage = () => {
  const {
    search,
    total,
    loading,
    data: skills,
    selected,
    isModalOpen,
    isModalLoading,
    activePage,
    showModal,
    closeModal,
    handleSearch,
    getData,
    addData,
    editData,
    setActivePage,
    deleteData,
  } = useSkillsStoreOfAdmin();

  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, [getData]);

  const newSkills = skills?.map((el) => ({ ...el, key: el?._id }));

  return (
    <Fragment>
      <Flex
        justify="space-between"
        gap={36}
        className="skills__header__box"
        align="center"
      >
        <h1 className="skills__title">Skills</h1>
        <Input
          className="skills__search"
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
          type="dashed"
        >
          Add skill
        </Button>
      </Flex>
      <Flex className="skills__search__box">
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "100%", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="skills__count__box">
        {total === 0 ? <p>Skills not</p> : <p>All skills count: {total}</p>}
      </Flex>

      <Table
        scroll={{ x: 800 }}
        loading={loading}
        pagination={false}
        dataSource={newSkills}
      >
        <ColumnGroup title="Name">
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
        <Column title="Skill" dataIndex="name" key="name" />
        <Column title="Percent" dataIndex="percent" key="percent" />

        <Column
          title="Action"
          key="action"
          dataIndex="_id"
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
                      title: "Do you want to delete this skill?",
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
        title={selected === null ? `Add new skill` : "Save skill"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={() => {
          addData(form);
        }}
        onCancel={closeModal}
      >
        <Form
          name="skills"
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
            name="percent"
            label="Percent"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                max: 100,
                message: "Please fill!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AdminSkillsPage;
