import { Fragment, useEffect } from "react";

import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { LIMIT } from "../../../constants";
import { PhotoDataTypes } from "../../../types";
import { getPhoto } from "../../../utils";
import usePortfoliosStoreOfAdmin from "../../../zustand/admin/portfolios";
import { UserLoginType } from "../../../zustand/auth/login";

import "./style.scss";

const PortfoliosPage = () => {
  const [form] = Form.useForm();

  const {
    loading,
    data: portfolios,
    isModalLoading,
    isModalOpen,
    total,
    search,
    activePage,
    selected,
    photoData,
    loadingPhoto,
    getData,
    handlePhoto,
    showModal,
    closeModal,
    handleSearch,
    setActivePage,
    addData,
    editData,
    deleteData,
  } = usePortfoliosStoreOfAdmin();

  useEffect(() => {
    getData();
  }, [getData]);

  const newPortfolios = portfolios.map((el) => ({ ...el, key: el._id }));

  // const selectBefore = (
  //   <Select onChange={handleProtocol} value={urlProtocol}>
  //     <Select.Option value="http://">http://</Select.Option>
  //     <Select.Option value="https://">https://</Select.Option>
  //   </Select>
  // );

  return (
    <Fragment>
      <Flex
        justify="space-between"
        gap={36}
        className="portfolios__header__box"
        align="center"
      >
        <h1 className="portfolios__title">Portfolios</h1>
        <Input
          className="portfolios__search"
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
          Add porfolios
        </Button>
      </Flex>
      <Flex className="portfolios__search__box">
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "100%", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="portfolios__count__box">
        {total === 0 ? (
          <p>Portfolios not</p>
        ) : (
          <p>All portfolios count: {total}</p>
        )}
      </Flex>

      <Table
        scroll={{ x: 1000 }}
        loading={loading}
        pagination={false}
        dataSource={newPortfolios}
      >
        <Column
          title="Site Photo"
          dataIndex="photo"
          key="Photos"
          render={(data: PhotoDataTypes) => {
            return <Image src={getPhoto(data)} />;
          }}
        />
        <ColumnGroup title="Name">
          <Column
            title="First Name"
            dataIndex="user"
            key="firstName"
            render={(data: UserLoginType) => {
              return <h3>{data?.firstName}</h3>;
            }}
          />
          <Column
            title="Last Name"
            dataIndex="user"
            key="lastName"
            render={(data: UserLoginType) => {
              return <h3>{data?.lastName}</h3>;
            }}
          />
        </ColumnGroup>
        <Column title="Project name" dataIndex="name" key="name" />
        <Column
          title="URL"
          dataIndex="url"
          key="url"
          render={(data: string, { name }: { name: string }) => (
            <a href={data} target="_blank" rel="noreferrer">
              See {name} website
            </a>
          )}
        />

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
                      title: "Do you want to delete this portfolio?",
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
        title={selected === null ? `Add new portfolio` : "Save portfolio"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add portfolio" : "Save portfolio"}
        open={isModalOpen}
        onOk={() => {
          addData(form);
        }}
        onCancel={closeModal}
      >
        <Form
          name="Portfolios"
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
            onChange={handlePhoto}
          >
            {photoData ? (
              <img
                src={getPhoto(photoData)}
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
            name="url"
            label="URL"
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortfoliosPage;
