import { Fragment,useEffect } from "react";

import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Pagination,
  Row,
  Spin,
  Tabs,
  TabsProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import EducationCard from "../../../components/cards/education";
import { LIMIT } from "../../../constants";
import useEducationStoreOfClient from "../../../zustand/client/education";

import "./style.scss";
const ClientEducationPage = () => {
  const [form] = Form.useForm();
  const {
    selected,
    loading,
    data,
    activeTab,
    search,
    activePage,
    total,
    setActivePage,
    handleSearch,
    getData,
    setActiveTab,
    addData,
  } = useEducationStoreOfClient();

  useEffect(() => {
    getData();
  }, [getData]);

  const items: TabsProps["items"] = [
    {
      className: "tabs__skill__first tabs__skill__public",
      key: "1",
      label: "My Education",
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
                  <p>Education not...</p>
                ) : (
                  <p>All Education count: {total}</p>
                )}
              </Flex>
              <Row>
                {data.map((el) => {
                  return (
                    <Col xs={24} sm={12} md={8} lg={6} key={el._id}>
                      <EducationCard key={el._id} {...el} form={form} />
                    </Col>
                  );
                })}
              </Row>
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
      label: selected === null ? "Add Education" : "Save Education",
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
                <Form.Item
                  label="Education Name"
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
                  name="level"
                  label="Level name:"
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
                  name="description"
                  label="Description:"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <TextArea />
                </Form.Item>

                <Flex justify="space-between">
                  <Form.Item
                    name="startDate"
                    label="Start date:"
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
                    name="endDate"
                    label="End date:"
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

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    {selected === null
                      ? " Add Experiences"
                      : " Save Experiences"}
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

export default ClientEducationPage;
