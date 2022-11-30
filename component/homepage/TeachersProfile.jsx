import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import style from "./search-form.module.scss";
import { useContext } from "react";
import shopContext from "../../store/context/shopContext";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { post, get } from "../../services/fetch";
import pic from "../../assets/circle-girl.png";
import { Avatar, Card, Skeleton, Meta, Button, Rate } from "antd";
import moment from "moment";
import Swal from "sweetalert2";

export default function TeachersProfile(props) {
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
  const [subjectDetails, setSubjectDetails] = useState();
  const [subjectId, setSubjectId] = useState();
  const [subjectTitle, setSubjectTitle] = useState();
  const [displayTeachers, setDisplayTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    console.log(
      props?.details?.relationships?.classes.filter(
        (e) => e.subject == props.subjectTitle
      )
    );
    setSubjectDetails(
      props?.details?.relationships?.classes.filter(
        (e) => (e.id == props.subjectId)
      )
    );

  ;  
    // console
    // getAllSubjects();
    // getCourses()
  }, [props?.details]);

 


  const engageTeacher = async (tid)=>{
 let payload = {
       teacher_id : +tid,
       student_id : +props.studentId,
       guardian_id : +props.userId,
       subject_id : +props.subjectId
   }
 console.log(payload)
   const res = await post({
     endpoint: `engage-teacher`,
     body: payload,
     // auth: false,
   });
   console.log(res)
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
  }

  return (
    <section className={style.searchg + " " + props.bg ?? ""} id="search">
      <div style={{ marginLeft: "5%" }}>
        <Card
          style={{
            minWidth: 300,
            width: "100%",
            // maxWidth: "60%",
            // border: "2px solid red",
            padding: "5%",
            display: "",
            justifyContent: "space-between",
          }}
          //   hoverable
        >
          <div
            className="text-left d-flex"
            style={{
              width: "100%",
              justifyContent: "space-between",
              //   border: "2px solid red",
            }}
          >
            <div style={{ width: "100%" }}>
              <div style={{ width: "80%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className=""
                >
                  <div className="d-flex border w-100">
                    <div className="mr-4">
                      <Avatar
                        className="mr-4"
                        style={{ width: 70, height: 70 }}
                        src="https://joeschmoe.io/api/v1/random"
                      />
                    </div>
                    <div className="mr-4">
                      <Rate allowHalf defaultValue={2.5} />
                      {/* <p
                        style={{
                          fontSize: "10px",
                          backgroundColor: "#25D366",
                          color: "white",
                          padding: "1px",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                        className=""
                      >
                        Verified Tutor
                      </p> */}
                      <p className="h4">{props.details.firstname}</p>
                      <p className="h6">Tutor</p>
                      <p className="">
                        {props.details.address || "Ashtead, Surrey"}
                      </p>
                    </div>
                    <div>
                      {/* <p>Feedback Score: +12</p> */}
                      <p style={{ fontSize: "12px" }}>
                        Member Since:{" "}
                        <span style={{ fontSize: "10px" }}>
                          {moment(props?.details?.created_at)?.format("ll") ||
                            "june 12 2020"}
                        </span>
                      </p>
                      <p>Last Login: 2 days ago</p>
                      {/* <p>
                                Highly experienced and enthusiastic maths tutor who has provided
                                over 4000 lessons. First-class MSci Imperial College maths
                                graduate. Available for focused help in sec...
                              </p> */}
                    </div>
                  </div>
                  {/* <Button
                    style={{
                      justifySelf: "self-end",
                      backgroundColor: "#4166f5",
                      color: "white",
                    }}
                  >
                    Contact this Teacher
                  </Button> */}
                </div>

                <p className="mt-4">
                  Information about Freddie I am a highly experienced private
                  maths tutor, with a first class MSci maths degree from
                  Imperial College London. I have taught over 4000 lessons (3000
                  online, and 1000 face-to-face). At university, I was employed
                  by a prestigious South Kensington agency, helping students in
                  the area. I began tutoring online when the pandemic began and
                  really enjoyed it. The students that I have tutored have gone
                  on to achieve top grades, to exceed their targets, and to meet
                  their chosen university offer. It`s so special to be able to
                  make a difference in someone`s life, and see them go from
                  feeling frustrated to feeling confident with maths! I achieved
                  A*A*AA in maths, further maths, physics and chemistry A
                  Levels. I greatly benefited from tuition during school, and so
                  I understand how important good teaching is for success. I
                  specialise in helping students at secondary level and above,
                  whether UK-based or from another country (I have tutored
                  students from fifteen different countries!) There are a wide
                  range of qualifications that I can tutor. I can help with A
                  Level Maths and A Level Further Maths, GCSE, KS3, and
                  international equivalents. I am also able to help with
                  entrance exams, such as the MAT or the STEP exam, and extra
                  qualifications such as the AEA. If you need help with a
                  qualification not listed here, please contact me with a few
                  details, as I am very likely familiar with it or with its
                  syllabus. At A Level, I am able to to tutor any of Pure,
                  Statistics and Mechanics. Availability: I have lessons on
                  Monday-Thursday mornings, Monday-Thursday evenings between
                  3:30pm and 7:30pm, and all day on Sundays. Please check my
                  timetable for my current availability or send me a message!
                  Willing to travel: 3 miles Experience: I have considerable
                  experience in maths tuition, having taught a total of at least
                  4000 lessons. I tutor between around 30 students each week. I
                  have taught in-person, at my home or at students` homes. At
                  university I worked for a South Kensington agency, tutoring
                  maths to students in the area. I have also gone into schools
                  to teach GCSE students after school. I have mainly taught
                  online since March 2020, a total of around 3000 lessons to
                  students from all over the world. I have tutored home-schooled
                  students as their sole teacher in A Level Maths, Further
                  Maths, GCSE Maths and GCSE Statistics, pacing them through the
                  syllabus with 2-4 lessons per week. These students have gone
                  on to receive top grades and meet their university offers.
                  More commonly, I have tutored students weekly or twice weekly
                  throughout the year to prepare them for their exams. I can
                  help with most exam boards, e.g. Edexcel, AQA, OCR A, OCR B
                  (MEI), WJEC, IGCSE, IAL, CCEA, CIE, and more.
                </p>
              </div>
            </div>
            <div
              className="p-5 border"
              style={{ minWidth: "20%", border: "" }}
            >
              {/* <Button>Contact Tutor</Button> */}

              <div>
                <div className="mt-4">
                  <p className="h4 mb-3" style={{ color: "#007bff" }}>
                    My Qualifications
                  </p>
                  <p className="h6">MSci</p>
                  <p>Imperial College London Mathematics</p>
                  <p>First class honours (2019)</p>
                </div>

                <div className="mt-4">
                  <p className="h6">A Level</p>
                  <p>John Henry Newman School</p>
                  <p>Mathematics A* (2015)</p>
                </div>

                <div className="mt-4">
                  <p className="h6">A Level</p>
                  <p>John Henry Newman School</p>
                  <p>Further Mathematics A* (2015)</p>
                </div>

                <div className="mt-4">
                  <p className="h6">A Level</p>
                  <p>John Henry Newman School</p>
                  <p>Physics A(2015)</p>
                </div>

                <div className="mt-4">
                  <p className="h6">A Level</p>
                  <p>John Henry Newman School</p>
                  <p>Chemistry A (2015)</p>
                </div>
              </div>

              <div>
                <div className="mt-4 border">
                  <div
                    style={
                      {
                        // display: "flex",
                        // justifyContent: "space-between",
                        // alignItems: "center",
                      }
                    }
                  >
                    {subjectDetails?.map((subjectDetails, idx) => (
                    <div className=" p-2" key={idx} style={{ marginRight: "12px" }}>
                        <p className="h6">{subjectDetails?.subject}</p>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            // padding:'5px'
                          }}
                        >
                          <p style={{ fontWeight: "bolder" }}>
                            {subjectDetails?.day}
                          </p>
                          <p>{subjectDetails?.time}</p>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="primary"
                      block
                      onClick={() => engageTeacher(props.details.id)}
                    >
                      Engage
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
