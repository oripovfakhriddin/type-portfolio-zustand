import { Button, Card, Flex, FormInstance } from "antd";

import {
  AndroidOutlined,
  BarcodeOutlined,
  IdcardOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

import useEducationStoreOfClient from "../../../zustand/client/education";

import "./style.scss";
const EducationCard = ({
  _id,
  name,
  description,
  level,
  startDate,
  endDate,
  form,
}: {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  level: string;
  form: FormInstance;
}) => {
  const { loading, editData, deleteData } = useEducationStoreOfClient();
  return (
    <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
      <div>
        <p>
          {" "}
          <span>
            <AndroidOutlined />
          </span>{" "}
          Education name:
        </p>
        <h3>{name}</h3>
      </div>
      <div>
        <p>
          <span>
            <IdcardOutlined />
          </span>{" "}
          Level:
        </p>
        <h3>{level}</h3>
      </div>
      <Flex justify="space-between">
        <div>
          <p>
            <span>
              <ScheduleOutlined />
            </span>{" "}
            Start date:
          </p>
          <h3>{startDate?.split("T")[0]}</h3>
        </div>
        <div>
          <p>
            <span>
              <ScheduleOutlined />
            </span>{" "}
            End date:
          </p>
          <h3>{endDate?.split("T")[0]}</h3>
        </div>
      </Flex>
      <div>
        <p>
          {" "}
          <span>
            <BarcodeOutlined />
          </span>{" "}
          Description
        </p>
        <p className="edu__description__text">{description}</p>
      </div>
      <Flex justify="space-between">
        <Button
          onClick={() => {
            editData(_id, form);
          }}
          type="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            deleteData(_id);
          }}
          danger
          type="primary"
        >
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

export default EducationCard;
