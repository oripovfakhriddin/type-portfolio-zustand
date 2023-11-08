import { Fragment, useEffect } from "react";

import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  message,
  Pagination,
  Spin,
  Table,
  Tabs,
  TabsProps,
  Upload,
} from "antd";
import {
  RcFile,
  // UploadChangeParam,
  // UploadFile,
  // UploadProps,
} from "antd/es/upload";

import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { LIMIT } from "../../../constants";
import { PhotoDataTypes } from "../../../types";
import { getPhoto } from "../../../utils";
import usePortfoliosStoreOfClient from "../../../zustand/client/portfolios";

import "./style.scss";

const ClientPortfoliosPage = () => {
  const [form] = Form.useForm();
  const {
    selected,
    loading,
    data,
    activeTab,
    search,
    activePage,
    total,
    photoData,
    loadingPhoto,
    setActivePage,
    handleSearch,
    getData,
    setActiveTab,
    addData,
    editData,
    deleteData,
    handlePhoto,
  } = usePortfoliosStoreOfClient();

  useEffect(() => {
    getData();
  }, [getData]);

  // const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result as string));
  //   reader.readAsDataURL(img);
  // };

  // const handleChange: UploadProps["onChange"] = (
  //   info: UploadChangeParam<UploadFile>
  // ) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //   }
  //   console.log(info.file.originFileObj);

  //   if (info.file.status === "done") {
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  const newData = data.map((el) => ({ ...el, key: el._id }));

  const columns = [
    {
      title: "Portfolio Photo",
      dataIndex: "photo",
      key: "photo",
      render: (data: PhotoDataTypes) => {
        return (
          <Image className="cli__portfolios__photo" src={getPhoto(data)} />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "URL",
      key: "url",
      dataIndex: "url",
      render: (data: string) => <a href={data}>{data}</a>,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data: string) => <p>{data.slice(0, 20)}</p>,
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data: string) => {
        return (
          <Fragment>
            <Flex gap={36}>
              <Button
                onClick={() => {
                  editData(data, form);
                }}
                icon={<EditOutlined />}
                type="primary"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  deleteData(data);
                }}
                icon={<DeleteOutlined />}
                type="primary"
                danger
              >
                Delete
              </Button>
            </Flex>
          </Fragment>
        );
      },
    },
  ];

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt5M = file.size / 1024 / 1024 < 2;
    if (!isLt5M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt5M;
  };

  const uploadButton = (
    <div>
      {loadingPhoto ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const items: TabsProps["items"] = [
    {
      className: "tabs__skill__first tabs__skill__public",
      key: "1",
      label: "My Portfolios",
      children: (
        <Fragment>
          <section>
            <Spin spinning={loading}>
              <Flex className="skills__search__box">
                <Input
                  value={search}
                  name="search"
                  onChange={handleSearch}
                  style={{ width: "100%", flexGrow: 1, padding: "10px 10px" }}
                  placeholder="Searching..."
                />
              </Flex>
              <Flex className="skills__count__box">
                {total === 0 ? (
                  <p>Portfolios not...</p>
                ) : (
                  <p>All Portfolios count: {total}</p>
                )}
              </Flex>
              <Table
                bordered={true}
                columns={columns}
                pagination={false}
                scroll={{ x: 1000 }}
                dataSource={newData}
              />
              ;
              {total > LIMIT ? (
                <Flex justify="center" style={{ marginTop: "40px" }}>
                  <Pagination
                    total={total}
                    pageSize={LIMIT}
                    current={activePage}
                    onChange={(page) => setActivePage(page)}
                  />
                </Flex>
              ) : null}
            </Spin>
          </section>
        </Fragment>
      ),
    },

    {
      className: "tabs__skill__secoond tabs__skill__public",
      key: "2",
      label: selected === null ? "Add Portfolios" : "Save Portfolios",
      children: (
        <Fragment>
          <Spin spinning={loading}>
            <Flex justify="center" style={{ width: "100% !important" }}>
              <Form
                style={{ maxWidth: "500px", width: "100%" }}
                onFinish={() => {
                  addData(form);
                }}
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
                <Form.Item>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handlePhoto}
                  >
                    {photoData ? (
                      loadingPhoto ? (
                        <LoadingOutlined />
                      ) : (
                        <img
                          src={getPhoto(photoData)}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      )
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>

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
                  label="URL"
                  name="url"
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
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    {selected === null ? " Add Portfolios" : " Save Portfolios"}
                  </Button>
                </Form.Item>
              </Form>
            </Flex>
          </Spin>
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      <Tabs
        centered
        activeKey={activeTab}
        items={items}
        onChange={(key) => {
          setActiveTab(key, form);
        }}
      />
    </Fragment>
  );
};

export default ClientPortfoliosPage;
