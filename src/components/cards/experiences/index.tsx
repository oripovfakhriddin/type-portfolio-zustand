import { Fragment } from "react";
import "./style.scss";
import { Button, Card, Flex, FormInstance } from "antd";
import {
  ScheduleOutlined,
  IdcardOutlined,
  AndroidOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import useExperiencesStoreOfClient from "../../../zustand/client/experiences";
const ExperiencesCard = ({
  _id,
  workName,
  description,
  companyName,
  startDate,
  endDate,
  form,
}: {
  _id: string;
  workName: string;
  startDate: string;
  endDate: string;
  description: string;
  companyName: string;
  form: FormInstance;
}) => {
  const { loading, editData, deleteData } = useExperiencesStoreOfClient();
  return (
    <Fragment>
      <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
        <div>
          <p>
            {" "}
            <span>
              <AndroidOutlined />
            </span>{" "}
            Work name:
          </p>
          <h3>{workName}</h3>
        </div>
        <div>
          <p>
            <span>
              <IdcardOutlined />
            </span>{" "}
            Company name:
          </p>
          <h3>{companyName}</h3>
        </div>
        <Flex justify="space-between">
          <div>
            <p>
              <span>
                <ScheduleOutlined />
              </span>{" "}
              Start date:
            </p>
            <h3>{startDate.split("T")[0]}</h3>
          </div>
          <div>
            <p>
              <span>
                <ScheduleOutlined />
              </span>{" "}
              End date:
            </p>
            <h3>{endDate.split("T")[0]}</h3>
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
          <p>{description}</p>
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
    </Fragment>
  );
};

export default ExperiencesCard;
