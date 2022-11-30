import axios from "axios";
import Link from "next/dist/client/link";
import { useContext, useEffect, useState } from "react";
import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import { AuthContext } from "../../../store/context/authContext";
import style from "./courses.module.scss";
import Swal from "sweetalert2";
import { Button, Space, Table, Tag } from "antd";
import { post, get } from "../../../services/fetch";

export default function Wards() {
  const [user, setUser] = useContext(AuthContext);
  const [changer, setChanger] = useState(false);
  const [wards, setWards] = useState([]);
  const [details, setDetails] = useState({ user_id: user.id });
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(false);
  const [children, setChildren] = useState([]);

  const formInputChange = (event) => {
    let { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  function toggleForm() {
    setFormState(!formState);
  }

  useEffect(() => {
    getChildren();
  }, [changer]);

  // children.map((e)=>(
  //   {
  //     key: e.id,
  //     name: e.name,
  //     age: e.age,
  //     address: "New York No. 1 Lake Park",
  //     tags: ["nice", "developer"],
  //   },

  // ))

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Level",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Registered Subjects",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags?.length !== 0
            ? tags?.map((tag, idx) => {
                let color = tag.length > 5 ? "geekblue" : "green";

                if (idx % 2 == 0) {
                  color = "green";
                }
                if (tag === "Mathematics") {
                  color = "volcano";
                }

                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })
            : "No registered class"}
        </>
      ),
    },
    {
      title: "Action",
      key: "tags",
      dataIndex: "tags",
      width: "10%",
      render: (_, { tags }) => (
        <>
          <Button block type="primary">
            <a href="/dashboard/guardian/courses">Add child to class</a>
          </Button>
        </>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Button
    //       style={{ backgroundColor: "#4166f5", color: "white", borderRadius:'16px' }}
    //       // color="primary"
    //       // className={"btn btn-default btn-sm text-white " + style.btn}
    //       size="middle"
    //     >
    //       {/* <a>Invite {record.name}</a> */}
    //       <a>Delete</a>
    //     </Button>
    //   ),
    // },
  ];

  const signup = async () => {
    console.log(details);
    let payload = {
      name: details.first_name,
      age: details.age,
      level_id: 1,
    };
    const res = await post({
      endpoint: "students",
      body: { ...payload },
      //  auth: false,
    });
    if (res.status == 200 || res.status == 201) {
      Swal.fire({
        title: "Success",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        title: "Sorry",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    }

  

    if (res.status == 200 || res.status == 201) {
      setChanger(!changer);
      Swal.fire({
        title: "Success",
        text: res.data.message,
        showCloseButton: true,
      });
    } else {
      setChanger(!changer);
      Swal.fire({
        title: "error",
        text: res.data.message,
        showCloseButton: true,
      });
    }
  };

  const getChildren = async () => {
    const res = await get({
      endpoint: "students",
      //  body: { ...payload },
      //  auth: false,
    });
    console.log(res);
    console.log(res.data.data);
    setWards(res.data.data);
    createTable(res.data.data);
  };

  const createTable = (man) => {
    const childrenColumn = man?.map((e) => ({
      key: e.id,
      name: e.name,
      age: e.age,
      address: e.relationships.level,
      tags: e.relationships.classes.map((m) => m.subject),
      // e.id % 2 == 0 ? ["English", "physics"] : ["Mathematics"],
    }));

    setChildren(childrenColumn);
  };

  // function signup() {
  //   setLoading(true)
  //   axios.post('https://theclassroom.ci-auction.ng/api/v1/guardian/signup/ward', details)
  //   .then(response => {
  //     console.log('response', response.data)
  //     if(response.data.status) {
  //       setWards([...wards, response.data.data])
  //       setFormState(false)
  //       setDetails({})
  //       Swal.fire({
  //         title: 'Successsful',
  //         text: response.data.message,
  //         icon: 'success',
  //         confirmButtonText: 'OK'
  //       });
  //     }
  //   })
  //   .catch(err =>  {
  //     if(err.response) {
  //       let message
  //       if(err.response.status == 422 || err.response.status == 200 || err.response.status == 401 || err.response.status == 404) {
  //         if(err.response.data.errors) {
  //             let errors = err.response.data.errors
  //             let errorList = Object.values(errors)
  //             errorList.map(msg => {
  //                 message = msg
  //             })
  //         }
  //         Swal.fire({
  //           title: 'Error',
  //           text: err.response.data.message || message,
  //           icon: 'error',
  //           confirmButtonText: 'Close'
  //         });
  //       }
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }

  // function getChildren() {
  //   axios.get(`https://theclassroom.ci-auction.ng/api/v1/guardian/list-children/${user.id}`)
  //   .then(response => {
  //     console.log("RESPONE", response)
  //     if(response.data.status) {
  //       setWards(response.data.data)
  //     }
  //   })
  //   .catch(err => console.log("ERRRRRR", err))
  // }

  return (
    <DashboardLayout>
      <DashboardHeader title="Ward/Children" />
      <div style={{ zIndex: "2" }} className="dashboard">
        <div className="row p-4">
          <div className="col-md-12 col-lg-12">
            <h5>Children/Wards({wards?.length})</h5>
          </div>
          <div className="table-responseive col-md-12 col-lg-12 col-xs-12">
            <div className="text-right mb-2">
              <button
                type="button"
                className={"btn btn-default btn-sm text-white " + style.btn}
                onClick={toggleForm}
              >
                Add Child <i className="fa fa-plus"></i>
              </button>
            </div>
            {formState ? (
              <div className={"col-md-6 col-lg-6 col-xs-12 " + style.baseform}>
                <h5>Add Child</h5>
                <form action="#" metho="post">
                  <div className="row mb-2">
                    <div className="col-md-4">
                      {/* <label>First Name</label> */}
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="First Name"
                        className="form-control"
                        required
                        onChange={formInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      {/* <label>Last Name</label> */}
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        className="form-control"
                        required
                        onChange={formInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      {/* <label>Last Name</label> */}
                      <input
                        type="text"
                        name="age"
                        id="age"
                        placeholder="Age"
                        className="form-control"
                        required
                        onChange={formInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <button
                      type="button"
                      onClick={signup}
                      className={
                        "btn btn-sm btn-default text-white " + style.btn
                      }
                    >
                      {loading ? "Sending..." : "Sign Up"}
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
            {/* <table className="table ">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Registration Code</th>
                  <th className="text-center">Courses</th>
                  <th className="text-center">Account Status</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>SN</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Registration Code</th>
                  <th className="text-center">Courses</th>
                  <th className="text-center">Account Status</th>
                </tr>
              </tfoot>
              <tbody>
                {wards.length ? (
                  wards.map((child, id) => (
                    <tr key={id}>
                      <td>{id + 1}.</td>
                      <td>{child.first_name}</td>
                      <td>{child.last_name}</td>
                      <td>{child.code}</td>
                      <td className="text-center">
                        <Link href="/dashboard/student/class-session">
                          <a>{child.courses.length}</a>
                        </Link>
                      </td>
                      <td
                        className={
                          child.isActive
                            ? "text-success text-center"
                            : "text-danger text-center"
                        }
                      >
                        {child.isActive ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No Child/ward added
                      <button
                        type="button"
                        className={
                          "btn btn-default btn-sm ml-4 text-white" + style.btn
                        }
                      >
                        Add one <i className="fa fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}

            <Table columns={columns} dataSource={children} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
