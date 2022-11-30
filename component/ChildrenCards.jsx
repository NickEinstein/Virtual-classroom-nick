import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Avatar, Card, Skeleton, Switch } from "antd";

export default function Courses(prop) {

  console.log(prop.details)

  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [subjects, setSubjects] = useState([])
const { Meta } = Card;
  return (
    <div className="d-flex">
      <Card
        style={{
          minWidth: 200,
          marginTop: 16,
          padding: "10px",
          textAlign: "center",
        }}
        hoverable
        // actions={[
        //   <SettingOutlined key="setting" />,
        //   <EditOutlined key="edit" />,
        //   <EllipsisOutlined key="ellipsis" />,
        // ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={prop?.details?.name}
            description={
              <div style={{ fontSize: "10px" }}>
                <p style={{ fontSize: "10px" }}>
                  Next class scheduled for Monday{" "}
                </p>
                <p style={{ fontSize: "10px" }}>27th Dec 9:00PM </p>
              </div>
            }
          />
        </Skeleton>
      </Card>
    </div>
  );
}
