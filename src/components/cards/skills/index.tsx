import { Fragment } from "react";

import { Card, FormInstance, Modal, Progress, Skeleton } from "antd";

import { DeleteOutlined,EditOutlined } from "@ant-design/icons";

import useSkillsStoreOfClient from "../../../zustand/client/skills";

import "./style.scss";

const conicColors = { "0%": "#9f0808", "50%": "#e4c356", "100%": "#0aad07" };

const SkillsCard = ({
  _id,
  name,
  percent,
  form,
}: {
  _id: string;
  name: string;
  percent: string;
  form: FormInstance;
}) => {
  const { loading, editData, deleteData } = useSkillsStoreOfClient();
  return (
    <Fragment>
      <Card
        className="skill__cards__salom"
        style={{
          width: 300,
          marginTop: 16,
        }}
        actions={[
          <DeleteOutlined
            onClick={() => {
              Modal.confirm({
                title: "Do you want to delete this skill?",
                onOk: () => {
                  deleteData(_id);
                },
              });
            }}
            key="setting"
          />,
          <EditOutlined
            onClick={() => {
              editData(_id, form);
            }}
            key="edit"
          />,
          <p className="action__more">More</p>,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <div>
            <Progress
              style={{ width: "100%", textAlign: "center" }}
              type="circle"
              percent={Number(percent)}
              strokeColor={conicColors}
            />
          </div>
          <div className="skills__text__box">
            <h2 className="skills__name__title">Skill name: </h2>
            <h2 className="skills__name__text">{name?.slice(0, 20)}</h2>
          </div>
        </Skeleton>
      </Card>
    </Fragment>
  );
};

export default SkillsCard;
