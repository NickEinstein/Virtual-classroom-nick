import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../store/context/authContext";
import style from "./profile.module.scss";
import Editor from "./Editor";
import { post, get, patch } from "../services/fetch";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Button, Spinner, Col, Form } from "react-bootstrap";

export default function ProfileUpdate(props) {
  const fieldList = [
    {
      institution: "",
      from_date: "",
      to_date: "",
      qualification: "",
      address: "",
    },
  ];
  const [user, setUser] = useContext(AuthContext);
  const [fields, setFields] = useState(fieldList);
  const [loading, setLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const route = useRouter();

  const [selectedFile, setSelectedFile] = useState();

  const [school, setSchool] = useState();
  const [degree, setDegree] = useState();
  const [address, setAddress] = useState();
  const [qualification, setQualification] = useState();
  const [bio, setBio] = useState();
  const [sinnstitution, setInstitution] = useState();

  const [data, setData] = useState({});

  function addField() {
    setFields([
      ...fields,
      { institution: "", from_date: "", to_date: "", qualification: "" },
    ]);
  }

  function removeField(e) {
    const id = e.target.id;
    if (fields.length == 1) return;
    setFields(fields.filter((item, index) => index != id));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (e.target.files) {
      setData({ ...data, [name]: e.target.files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
    console.log(data);
  }
  // function saveChanges() {
  //   axios.post('https://api.braincert.com/v2/schedule?apikey=ghU46M5jbP8Fv5GELFfZ', {
  //     title: 'TEST CLASS',
  //     timezone: '71',
  //     start_time: '02:13AM',
  //     end_time: '02:30AM',
  //     date: '2022-05-17',
  //     isBoard: "0",
  //     isScreenshare: "1"
  //   })
  //   .then(response => {
  //     console.log("RESP", response)
  //   })
  // }

  useEffect(() => {
    setInstitution(props?.profile?.details?.school_attend);
    setSchool(props?.profile?.details?.school_attend);
    setQualification(props?.profile?.details?.degree_attained);
    setDegree(props?.profile?.details?.degree_attained);
    setAddress(props?.profile?.details?.address);
    setBio(props?.profile?.details?.bio);
  }, [props?.profile]);

  let role;

  if (typeof window !== "undefined") {
    role = localStorage.getItem("role");
  }

  const saveChanges = async () => {
    setLoading(true);

    console.log(school);
    console.log(qualification);
    console.log(address);
    console.log(bio);

    let payload = {
      first_name: props?.profile?.details?.firstname,
      last_name: props?.profile?.details?.lastname,
      phone_number: props?.profile?.details?.phone_number,
      address: address,
      school_attend: school,
      degree_attained: degree,
      bio: bio,
      // ...data
    };

    // console.log(cow);
    console.log(props.profile);

    handleSubmitz();

    // console.log(payload)

    const res = await patch({
      endpoint: "update-profile",
      body: { ...payload },
      //  auth: false,
    });

    //  console.log(res)

    if (res.status == 200) {
      Swal.fire({
        title: "Successsful",
        text: "Update successful",
        icon: "success",
        confirmButtonText: "OK",
      });

      setLoading(false);
    }

    // let formdata = new FormData()
    // for(let[key, value] of Object.entries(data)) {
    //   formdata.append(key, value)
    // }
    // axios.put(`https://theclassroom.ci-auction.ng/api/v1/tutor/${user.id}`, data)
    // .then(response => {
    //   console.log(data)
    //   console.log(response)
    //   if(response.data.status) {
    //     setUser(response.data.data)
    //     Swal.fire({
    //       icon: 'success',
    //       text: 'Your profile has been updated'
    //     })
    //     route.push('/dashboard/tutor')
    //   }
    // })
    // .catch(err => {
    //   if(err.response.data) {
    //     Swal.fire({
    //       icon: 'error',
    //       text: err.response.data.message
    //     })
    //   }
    // })
    // .finally(() => setLoading(false))
  };

  const handlefile = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e?.target?.files[0]);
  };

  const handleSubmitz = async () => {
    //  e.preventDefault();
    let file = selectedFile;
    let formdata = new FormData();

    formdata.append("certificate_url", file);
    // formdata.append("name", "nick upload");
    formdata.append("school_attend", school);
    formdata.append("degree_attained", degree);
    console.log(selectedFile);
    console.log(formdata);

    // axios.post("https://v2.convertapi.com/upload ", formdata, config)

    const res = await post({
      endpoint: "add-qualifications ",
      body: formdata,
      // auth: false,
    });
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div className="py-5">
      <h4>Profile Update</h4>
      <form>
        <div className="row">
          <div className="col-lg-6 form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              className="form-control"
              readOnly
              value={props?.profile?.details?.firstname}
            />
          </div>
          <div className="col-lg-6 form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              className="form-control"
              readOnly
              value={props?.profile?.details?.lastname}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
              readOnly
              value={props?.profile?.email}
            />
          </div>
          <div className="col-lg-6 form-group">
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              onChange={handleChange}
              placeholder="Phone Number"
              className="form-control"
              readOnly
              value={props?.profile?.details?.phone_number}
            />
          </div>
          <div className="col-lg-6 form-group">
            <label htmlFor="address">Address</label>
            <input
              type="tel"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              // onChange={handleChange}
              placeholder="address"
              className="form-control"
              value={address}
            />
          </div>

          {role != "guardian" && (
            <div className="col-lg-6 form-group">
              <label htmlFor="phone-number">Institution</label>
              <input
                type="tel"
                name="institution"
                onChange={(e) => {
                  setSchool(e.target.value);
                  setInstitution(e.target.value);
                }}
                // onChange={handleChange}
                placeholder="Institution"
                className="form-control"
                value={school}
              />
            </div>
          )}
        </div>
        {/* {
            user.user_type === 'TUTOR' ?  */}
        {/* <div className="col-lg-12">
          <h6>Institution(s)</h6>
          <input
            type="tel"
            name="institution"
            onChange={handleChange}
            placeholder="Phone Number"
            className="institution"
          />
        </div> */}
        <div className="row">
          <div className="col-lg-12 form-group">
            <label htmlFor="bio">Bio</label>
            <Editor
              name="bio"
              className="form-control"
              onChange={(inputVal) => {
                setData({ ...data, bio: inputVal });
                setBio(inputVal);
              }}
              editorLoaded={editorLoaded}
              value={bio}
            />
          </div>
          {role != "guardian" && (
            <div className="col-lg-12">
              <h6>Qualification(s)</h6>
              <input
                type="tel"
                name="qualification"
                // onChange={handleChange}
                onChange={(e) => {
                  setDegree(e.target.value);
                  setQualification(e.target.value);
                }}
                placeholder="Eg. Bsc/Msc/B.Eng etc"
                className="form-control"
                value={degree}
              />
            </div>
          )}

          {
            (role = !"guardian" && (
              <input
                type="file"
                // value={selectedFile}
                onChange={(e) => handlefile(e)}
              />
            ))
          }

          {/* <input
            type="file"
            // value={selectedFile}
            onChange={(e) => handlefile(e)}
          /> */}
        </div>

        {/* <div>Add Qualifications</div>
        <div className="App">
          <form>
            <div>
              <p>School Attended</p>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
            <div>
              <p>Degree Attained</p>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>

            <input
              type="file"
              // value={selectedFile}
              onChange={(e) => handlefile(e)}
            />

            <button onClick={(e) => handleSubmitz(e)} type="button">
              submit
            </button>
          </form>
        </div> */}

        {/* : null
          } */}
        {/* {fields.length
          ? fields.map((field, index) => (
              <div
                className={"row " + style.institutionRows}
                key={index}
                id={index + 1}
              >
                <div className="col-lg-3">
                  <label htmlFor="institution">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    placeholder="Institution"
                    onChange={(e) => {
                      field.institution = e.target.value;
                      setFields([...fields]);
                      setData({ ...data, qualifications: fields });
                    }}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-3">
                  <label htmlFor="from_date">From</label>
                  <input
                    type="date"
                    name="from_date"
                    className="form-control"
                    onChange={(e) => {
                      field.from_date = e.target.value;
                      setFields([...fields]);
                      setData({ ...data, qualifications: fields });
                    }}
                  />
                </div>
                <div className="col-lg-3">
                  <label htmlFor="to_date">To</label>
                  <input
                    type="date"
                    name="to_date"
                    className="form-control"
                    onChange={(e) => {
                      field.to_date = e.target.value;
                      setFields([...fields]);
                      setData({ ...data, qualifications: fields });
                    }}
                  />
                </div>
                <div className="col-lg-3">
                  <label htmlFor="qualification">Qualififcation</label>
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Qualification"
                    className="form-control"
                    onChange={(e) => {
                      field.qualification = e.target.value;
                      setFields([...fields]);
                      setData({ ...data, qualifications: fields });
                    }}
                  />
                </div>
                <div className={style.lessBtn}>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={removeField}
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
                <div className={style.moreBtn}>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={addField}
                  >
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            ))
          : null} */}
        {/* <Col xs={6}>
          <Form.Label>Profile photo</Form.Label>
          <input
            type="file"
            name="avatar"
            className="form-control"
            onChange={handleChange}
          />
        </Col> */}
        <div className="col-lg-12 text-center mt-4 mb-4">
          <Button type="button" className={style.button} onClick={saveChanges}>
            Save Changes
            {loading ? (
              <Spinner
                animation="border"
                variant="light"
                size="sm"
                className="ml-2"
                role="status"
              />
            ) : null}
          </Button>
        </div>
      </form>
    </div>
  );
}
