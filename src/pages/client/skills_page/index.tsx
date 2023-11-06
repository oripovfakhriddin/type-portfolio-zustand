import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Pagination,
  Row,
  Spin,
  Tabs,
  TabsProps,
} from "antd";
import useSkillsStoreOfClient from "../../../zustand/client/skills";
import "./style.scss";
import { useEffect, Fragment } from "react";
import SkillsCard from "../../../components/cards/skills";
import { LIMIT } from "../../../constants";

const ClientSkillsPage = () => {
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
  } = useSkillsStoreOfClient();

  useEffect(() => {
    getData();
  }, [getData]);

  const items: TabsProps["items"] = [
    {
      className: "tabs__skill__first tabs__skill__public",
      key: "1",
      label: "My skills",
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
                  <p>Skills not...</p>
                ) : (
                  <p>All skills count: {total}</p>
                )}
              </Flex>
              <Row>
                {data.map((skill) => {
                  return (
                    <Col xs={24} sm={12} md={8} lg={6} key={skill._id}>
                      <SkillsCard key={skill._id} {...skill} form={form} />
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
      label: selected === null ? "Add skill" : "Save skill",
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
                  label="Skill Name"
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
                  style={{ width: "100%" }}
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
                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    {selected === null ? " Add Skill" : " Save Skill"}
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

export default ClientSkillsPage;
