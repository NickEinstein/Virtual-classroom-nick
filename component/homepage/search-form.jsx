import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import style from "./search-form.module.scss";
import { useContext } from "react";
import shopContext from "../../store/context/shopContext";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { post, get } from "../../services/fetch";
import pic from "../../assets/circle-girl.png";
import { Avatar, Card, Skeleton, Meta, Modal } from "antd";
import TeachersProfile from "./TeachersProfile";
import {
  HomeOutlined,
  DownOutlined,
  SettingFilled,
  CloseOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

export default function SearchForm(props) {
  const data = {
    amount: "",
    level: "",
    gender: "",
    subject: "",
  };
  const router = useRouter();
  const [searchParam, setSearchParams] = useState({});
  const [showfilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allSubjects, setAllSubjects] = useState();
  const [subjectId, setSubjectId] = useState();
  const [subjectTitle, setSubjectTitle] = useState();
  const [displayTeachers, setDisplayTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState();
  const [seeStudentDropdown, setSeeStudentDropdown] = useState(false);
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    getAllSubjects();
    getParentStudents();


    if (typeof window !== "undefined") {
      if (localStorage.getItem("il") === "yes") {
        setSeeStudentDropdown(true);
        console.log(localStorage.getItem('userId'));
        setUserId(+localStorage.getItem('userId'))
      }
    }
    // getCourses()
  }, []);

  const handleCancel1 = () => {
    setIsModalVisible(false);
    // handleShow6()
  };

  // const applyToTeacher = async (tid) => {
  //   let payload = {
  //     // teacher_id: +tid,
  //     // student_id: +k,
  //     // guardian_id: "",
  //     // subject_id: +subjectId,
  //   };
  //   console.log(payload);
  //   const res = await post({
  //     endpoint: `engage-teacher`,
  //     body: payload,
  //     // auth: false,
  //   });
  //   console.log(res);

  //   if (res.status == 200 || res.status == 201) {
  //     Swal.fire({
  //       title: "Success",
  //       text: `${res.data.message}`,
  //       showCloseButton: true,
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Sorry",
  //       text: `${res.data.message}`,
  //       showCloseButton: true,
  //     });
  //   }
  // };

  const catchSelected = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    console.log(e.target.options[selectedIndex].getAttribute("title"));
    setSubjectId(e.target.value);
    setSubjectTitle(e.target.options[selectedIndex].getAttribute("title"));
  };
  const catchSelectedStudent = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    console.log(e.target.options[selectedIndex].getAttribute("title"));
    setStudentId(e.target.value);
    // setSubjectTitle(e.target.options[selectedIndex].getAttribute("title"));
  };
  const getSelectedTeacher = async (id) => {
    //  setLoading(true);
    //  let payload = { subject: subjectTitle };
    const res = await get({
      endpoint: `teachers/${id}`,
      //  body: payload,
      // auth: false,
    });
    console.log(res);

    if (res.status == 200) {
      setLoading(false);
      setIsModalVisible(true);
      setSelectedTeacher(res.data.data);
      // setSingleTeacherInfo(res.data.data);
      // setSubjectTitle()
    }
  };

  

  const getParentStudents = async (id) => {
    //  setLoading(true);
    //  let payload = { subject: subjectTitle };
    const res = await get({
      endpoint: `students`,
      //  body: payload,
      // auth: false,
    });
    console.log(res);

    if (res?.status == 200) {
      setStudents(res?.data?.data);
      //  setLoading(false);
      //  setIsModalVisible(true);
      //  setSelectedTeacher(res.data.data);
      // setSingleTeacherInfo(res.data.data);
      // setSubjectTitle()
    }
  };

  const getSubjectTeachers = async (sub) => {
    setLoading(true);
    let payload = { subject: subjectTitle };
    const res = await post({
      endpoint: `get-teachers`,
      body: payload,
      // auth: false,
    });
    console.log(res);

    if (res.status == 200) {
      setLoading(false);
    setDisplayTeachers(res.data.data);

      // setSubjectTitle()
    }

    if (res.status >= 300) {
      setLoading(false);
    setDisplayTeachers(res.data.data);
 Swal.fire({
          title: 'Sorry',
          text: `${res.data.message} for this subject`,
          showCloseButton: true,
        })
    
  };
      // setSubjectTitle()
    }

   
  let k;
  let il;

  if (typeof window !== "undefined") {
    k = localStorage.getItem("userId");
    il = localStorage.getItem("il");

    // console.log(k)
    // localStorage.setItem(key, value)
  }

  const getAllSubjects = async () => {
    const res = await get({
      endpoint: `subjects`,
      // endpoint: `get-teachers${chosenSubject}`,
      // body: { ...details },
      // auth: false,
    });
    console.log(res);
    setAllSubjects(res?.data?.data);
  };

  function doSearch() {
    setLoading(true);
    router.push({
      pathname: "/searchResults",
      query: {
        amount: searchParam.amount,
        level: searchParam.level,
        gender: searchParam.gender,
        subject: searchParam.subject,
      },
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  function handleInputChange(e) {
    let { name, value } = e.target;
    setSearchParams({ ...searchParam, [name]: value });
  }

  function subjectSelection(e) {
    let { name, value } = e.target;
    if (value != "") {
      setShowFilter(true);
      setSearchParams({ ...searchParam, [name]: value });
    } else {
      setShowFilter(false);
    }
  }

  function selectOption(option) {
    // let elem = document.getElementById('subject')
    // elem.setAttribute('value', option)
    setSearchParams({ ...searchParam, ["subject"]: option });
    setShowFilter(false);
  }

  const list = subjects
    .filter(
      (subject) =>
        searchParam.subject != "" &&
        subject.title.toLowerCase().includes(searchParam.subject)
    )
    .map((subject, index) => (
      <li onClick={() => selectOption(subject.title)} key={index}>
        {subject.title}
      </li>
    ));

  function getCourses() {
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/courses`)
      .then((response) => {
        if (response.data.status) {
          setSubjects(response.data.data.data);
        }
      });
  }

  function handleChange(event) {
    setSearchParams({ ...searchParam, ["level"]: event.target.value });
  }
  return (
    <section className={style.searchg + " " + props?.bg ?? ""} id="search">
      <div className="row justify-content-center">
        <div className="col-lg-9 py-5 px-5 text-center">
          {props.hide ? (
            <div></div>
          ) : (
            <div>
              <h3 className="text-white">Find the best online tutor for you</h3>
              <p className="text-white">
                Learn virtually with the best tutors from around Nigeria to help
                you reach your academic goals
              </p>
            </div>
          )}
          <form>
            <div
              style={{ border: props.hide && "2px solid blue" }}
              className={style.formWrapper + " row bg-white py-5 px-4"}
            >
              <div className="col ">
                {/* <div className={style.searchableTextField}>
                  <input type="text" name="subject" id="subject" value={searchParam.subject} onChange={ subjectSelection } className="form-control" placeholder="Enter Subject" />
                  {
                    showfilter && subjects.length > 0 ?
                      <ul className={style.subjectlist}>
                        { list }
                      </ul>
                    : null
                  }
                </div> */}
                {/* <Form.Label>Select Subject</Form.Label> */}
                <select
                  placeholder="Enter Subject"
                  name="subjects"
                  className="form-control"
                  onChange={catchSelected}
                >
                  <option value="">Select Subject</option>
                  {allSubjects
                    ? allSubjects.map((subject, index) => (
                        <option
                          key={subject.id}
                          value={subject.id}
                          title={subject.name}
                        >
                          {subject.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              {seeStudentDropdown && (
                <div className="col">
                  <select
                    placeholder="Enter Subject"
                    name="subjects"
                    className="form-control"
                    onChange={catchSelectedStudent}
                  >
                    <option value="">Select Child</option>
                    {students
                      ? students.map((e, index) => (
                          <option key={e.id} value={e.id} title={e.name}>
                            {e.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              )}
              <div className="col">
                <select
                  name="level"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value="all">All Levels</option>
                  <option value="nursery">Nursery</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
              </div>

              <div className="col">
                {allSubjects && allSubjects.length && subjectTitle && (
                  <button
                    type="button"
                    className={style.button + " btn btn-default text-white"}
                    // onClick={ doSearch }
                    onClick={getSubjectTeachers}
                  >
                    {loading ? (
                      <Spinner animation="border" variant="white" size="sm" />
                    ) : (
                      <i className="fa fa-search"></i>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div style={{ backgroundColor: "" }}>
        {/* <div style={{height:'200px', border:"2px solid red"}}>
          <img src = 'https://unsplash.com/s/photos/portrait'/>
          <div>
            <p>Name</p>
            <p>Fully qualified and experienced teacher 
              offering tuition in English, German and 11+ 
              entrance exams. Educated at Universities of 
              Oxford and St Andrews, with very stron...
              </p>
            <p>Classes taken</p>
            <p>Name</p>
            <p>No. Of Students </p>
            

          </div>
        Hello
        </div> */}
        <div
          className="container d-flex"
          style={{ border: "", justifyContent: "center" }}
        >
          {displayTeachers?.length > 0 && (
            <div>
              {/* <Input style={{width:"20%"}}/> */}
              {/* <h3>Available Teachers</h3> */}
            </div>
          )}
          {displayTeachers?.length > 0 ? (
            displayTeachers?.map((e, idx) => (
              <div key={idx} style={{ marginLeft: "20%" }}>
                <Card
                  style={{
                    minWidth: 300,
                    maxWidth: "60%",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  hoverable
                >
                  <div className="d-flex text-left">
                    <div>
                      <Avatar
                        className="mr-4"
                        style={{ width: 80, height: 80 }}
                        src="https://joeschmoe.io/api/v1/random"
                      />
                    </div>
                    {/* <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                  /> */}
                    <div>
                      <div className="d-flex justify-content-between ">
                        <p className="h4">
                          {e.firstname} {e.lastname}
                        </p>
                        <Button
                          onClick={() => getSelectedTeacher(e.id)}
                          className="text-white"
                        >
                          View
                        </Button>
                      </div>
                      <p className="h3">{subjectTitle} Teacher</p>
                      <p className="">
                        Highly experienced and enthusiastic maths tutor who has
                        provided over 4000 lessons. First-class MSci Imperial
                        College maths graduate. Available for focused help in
                        sec...
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            // <>
            //   No available teachers for this subject
            <div style={{ marginLeft: "5%" }}></div>

            // </>
          )}
        </div>
      </div>

      <Modal
        style={{ backgroundColor: "transparent", marginTop: "100px", zIndex:10, marginLeft:'250px' }}
        width="80%"
        // confirmLoading
        // okButtonProps={onclick=()=>{alert("How far")}}
        footer={false}
        okText={<p style={{ maxWidth: "100px" }}>Boss</p>}
        // closeIcon={
        //   <CloseOutlined
        //     style={{
        //       fontSize: "25px",
        //       backgroundColor: "red",
        //       color: "white",
        //       padding: "10px",
        //     }}
        //   />
        // }
        visible={isModalVisible}
        onCancel={handleCancel1}
      >
        {/* <Page30 data={responseData} modulename={props.modulename} /> */}
        <div>
          <TeachersProfile
            subjectTitle={subjectTitle}
            subjectId={subjectId}
            userId={userId}
            studentId={studentId}
            details={selectedTeacher}
          />
        </div>
      </Modal>
    </section>
  );
}
