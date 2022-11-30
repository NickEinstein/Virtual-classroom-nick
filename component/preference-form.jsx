import { useState } from "react";
import { Row, Col, Spinner, Form, Card, Button } from "react-bootstrap";
import style from "./preference-form.module.scss";

export default function PreferenceForm(props) {
  // const[categoryId, setCategoryId] = useState();
  // const[subjectId, setSubjectId] = useState();
  // const[time, setTime] = useState();
  // const[day, setDay] = useState();
  const [subjectId, setSubjectId] = useState();
  const [subjectCreatedData, setSubjectCreatedData] = useState({
    categoryId: "",
    subjectId: "",
    hour: "",
    minute:'',
    day: "",
    session:''
  });

  const [topostSubjects, setTopostSubjects] = useState([]);


  console.log(subjectCreatedData);
  const hr = [];
  const min = [];

  for (let i = 1; i <= 60; i++) {
    // console.log(i);
    if (i <= 12) hr.push(<option>{i}</option>);
    if (i <= 60) min.push(<option>{i}</option>);
  }

  const addSubjects = ()=>{
    setTopostSubjects([...topostSubjects, subjectCreatedData]);
  }

  console.log(topostSubjects)

  // console.log(props.newSubjects);
  // console.log(props.newLevels)
  // console.log(props.newCategories)

  return (
    <Col xs={12}>
      <Card className={style.card}>
        <Card.Header className={style.cardHeader}>
          <Card.Title>Add Subject</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className={style.cardText}>
            {/* Here you can add a subject, these will be viewable in your profile. It is important that you add each subject you want to learn. */}
          </Card.Text>
          <Form>
            <Row>
              <Col xs={6} className="mb-2">
                <Form.Label>Category</Form.Label>
                <select
                  name="category"
                  className="form-control"
                  onChange={(e) => {
                    props.onChange(e);
                    setSubjectCreatedData({
                      ...subjectCreatedData,
                      categoryId: e.target.value,
                    });
                  }}
                >
                  <option value="">Select</option>
                  {props.newCategories
                    ? props.newCategories.map((subject, index) => (
                        <option value={subject.id} key={index}>
                          {subject.title}
                        </option>
                      ))
                    : null}
                </select>
              </Col>
              <Col xs={6} className="mb-2">
                <Form.Label>Select Subject</Form.Label>
                <select
                  name="subjects"
                  className="form-control"
                  onChange={(e) => {
                    setSubjectCreatedData({
                      ...subjectCreatedData,
                      subjectId: e.target.value,
                    });
                    props.onChange(e);
                  }}
                >
                  <option value="">Select</option>
                  {props.newSubjects
                    ? props.newSubjects.map((subject, index) => (
                        <option value={subject.id} key={index}>
                          {subject.name}
                        </option>
                      ))
                    : null}
                </select>
              </Col>
              <Col xs={12} className="mb-2">
                <Form.Label>Select Level</Form.Label>
                <select
                  name="level"
                  className="form-control"
                  onChange={(e) => {
                    props.onChange(e);
                  }}
                >
                  <option value="">Select</option>
                  {props.newLevels
                    ? props.newLevels.map((subject, index) => (
                        <option value={subject.id} key={index}>
                          {subject.name}
                        </option>
                      ))
                    : null}
                </select>
              </Col>
            </Row>
            <div class="col-lg-12">
              <Form.Label>Availability</Form.Label>
            </div>
            {props.fields
              ? props.fields.map((field, index) => (
                  <div
                    className={"row " + style.institutionRows}
                    key={index}
                    id={index + 1}
                  >
                    <div className="col-lg-6">
                      <select
                        name="week_day"
                        onChange={(e) => {
                          field.week_day = e.target.value;
                          props.setFields([...props.fields]);
                          props.setData({
                            ...props.data,
                            periods: props.fields,
                          });
                          setSubjectCreatedData({
                            ...subjectCreatedData,
                            day: e.target.value,
                          });
                        }}
                        className="form-control"
                      >
                        <option value="">Select Day</option>
                        <option value="Monday">Mondays</option>
                        <option value="Tuesday">Tuesdays</option>
                        <option value="Wednesday">Wednesdays</option>
                        <option value="Thursday">Thursdays</option>
                        <option value="Friday">Fridays</option>
                        <option value="Saturday">Saturdays</option>
                        <option value="Sunday">Sundays</option>
                      </select>
                    </div>

                    <div className=" d-flex w-100">
                      <div className="mt-2 mr-2">START TIME</div>

                      {/* <select
                        type="date"
                        name="class_time"
                        className="form-control"
                        onChange={(e) => {
                          field.class_time = e.target.value;
                          props.setFields([...props.fields]);
                          props.setData({
                            ...props.data,
                            periods: props.fields,
                          });
                        }}
                      >
                        <option value="">Select</option>
                        <option value="10:00AM - 12:00PM">
                          10:00AM - 12:00PM
                        </option>
                        <option value="01:00PM - 03:00PM">
                          01:00PM - 03:00PM
                        </option>
                        <option value="04:00PM - 06:00PM">
                          04:00PM - 06:00PM
                        </option>
                      </select> */}
                      <select
                        type="date"
                        name="hour"
                        className="form-control mr-2"
                        onChange={(e) => {
                          setSubjectCreatedData({
                            ...subjectCreatedData,
                            hour: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select Hour</option>
                        {hr}
                      </select>
                      <select
                        type="date"
                        name="hour"
                        className="form-control mr-2"
                        placeholder="Hour"
                        onChange={(e) => {
                          setSubjectCreatedData({
                            ...subjectCreatedData,
                            minute: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select Min</option>
                        {min}
                      </select>

                      <select
                        type="date"
                        name="session"
                        className="form-control"
                        onChange={(e) => {
                          setSubjectCreatedData({
                            ...subjectCreatedData,
                            session: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                        {/* {min} */}
                      </select>
                    </div>

                    <div className=" d-flex w-100">
                      <div className="mt-2 w-20 mr-2">END TIME</div>

                      <select
                        type="date"
                        name="hourEnd"
                        className="form-control mr-2"
                        onChange={(e) => {
                          setSubjectCreatedData({
                            ...subjectCreatedData,
                            hourEnd: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select Hour</option>
                        {hr}
                      </select>
                      <select
                        type="date"
                        name="minuteEnd"
                        className="form-control mr-2"
                        placeholder="Hour"
                        onChange={(e) => {
                          setSubjectCreatedData({
                            ...subjectCreatedData,
                            minuteEnd: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select Min</option>
                        {min}
                      </select>

                      <select
                        type="date"
                        name="sessionEnd"
                        className="form-control"
                        onChange={(e) => {
                          setSubjectCreatedData({
                            ...subjectCreatedData,
                            sessionEnd: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                        {/* {min} */}
                      </select>
                    </div>
                    {/* <div className={style.lessBtn}>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={props.removeField}
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </div> */}
                    {/* <div className={style.moreBtn}>
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={props.addField}
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                    </div> */}
                  </div>
                ))
              : null}
            <div style={{ display: "flex", justifyContent: "flex-between" }}>
              <Button
                type="button"
                className={style.button}
                onClick={() => {
                  addSubjects();
                  // props.onClick()
                  // props.catchFormValues(subjectCreatedData);
                  // props.onClick(subjectCreatedData);
                }}
              >
                Add
                {props.loading ? (
                  <Spinner
                    variant="white"
                    animation="border"
                    size="sm"
                    className="ml-2"
                  />
                ) : null}
              </Button>

              <Button
                type="button"
                style={{ marginLeft: "10px" }}
                className={style.button}
                onClick={() => {
                  // props.onClick()
                  // props.catchFormValues(subjectCreatedData);
                  props.onClick(topostSubjects);
                }}
              >
                Submit
                {props.loading ? (
                  <Spinner
                    variant="white"
                    animation="border"
                    size="sm"
                    className="ml-2"
                  />
                ) : null}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}
