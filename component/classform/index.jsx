import ProfileAvatar from "../dashboard/avatar";
import styles from './class-form.module.scss';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../store/context/authContext'


export default function ClassForm(props) {

  const fieldList = [
    {
      week: '',
      outline: ''
    },
  ]

  const data = {
    type: 'virtual',
    discount: 0.00,
    max_attendance: 10,
    min_attendance: 3,
  }

  const [details, setDetails] = useState(data)
  const [fields, setFields] = useState(fieldList);
  const [cmodule, setCmodule] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  function addField() {
    setFields([...fields, {week: '', outline: ''}])
  }

 const  formInputChange = (event) => {
    let {name, value} = event.target
    let course_modules = []
    setDetails({...details, [name]:value})
    // if(name === 'course_modules') {
    //   setCmodule([...cmodule, {title: id, desc: value}])
    //   setDetails({...details, [name]: cmodule})
    // }
    // else {
    // }
    // console.log(course_modules)
    // console.log(details)
  }  

  function removeField(e) {
    const id = e.target.id
    setFields(fields.filter((item, index) => index != id))
  }

  useEffect(() => {
    setDetails({...details, user_id: user.id})
  }, [])

  function creatCourse() {
    setLoading(true)
    axios.post('https://theclassroom.ci-auction.ng/api/v1/courses/create', details)
    .then(response => {
      if(response.data.status) {
        setDetails({})
        Swal.fire({
          title: 'Successful',
          text: 'Course added',
          icon: 'success',
          confirmButtonText: 'OK'
        });        
        window.location.reload()
      }
    })
    .catch(err => {
      if(err.response) {
        Swal.fire({
          title: 'Error',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        });  
      }
      else if(err.request) {
        Swal.fire({
          title: 'Error',
          text: 'Could not send request',
          icon: 'error',
          confirmButtonText: 'Close'
        });  
      }      
    })
    .finally(() => setLoading(false))
  }

  return (
    <div className={styles.formWrapper }>
      <h5>Add New Course</h5>
      <form>
        <div className="row justify-content-between">
          <div className="col-md-6 col-lg-6">
            <div className={styles.formRow}>
              <label htmlFor="title">Course Title</label>
              <input 
                type="text" 
                name="title" 
                className={"form-control "+styles.input} 
                placeholder="Title" 
                onChange={formInputChange}
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="code">Course Code</label>
              <input 
                type="text" 
                name="course_code" 
                className={"form-control "+styles.input} 
                placeholder="Code" 
                onChange={formInputChange}
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="description">Course Description</label>
              <input 
                type="text" 
                name="description" 
                className={"form-control "+styles.input} 
                placeholder="Course description" 
                onChange={formInputChange}
              />
            </div>   
            <div className={styles.formRow}>
              <label htmlFor="duration">Duration</label>
              <input 
                type="text" 
                name="duration" 
                className={"form-control "+styles.input} 
                placeholder="Course duration" 
                onChange={formInputChange}
              />
            </div>   
            <div className={styles.formRow}>
              <label htmlFor="fee">Fee</label>
              <input 
                type="number" 
                name="fee" 
                className={"form-control "+styles.input} 
                placeholder="Course fee" 
                onChange={formInputChange}
              />
            </div>   

            <div className={styles.formRow}>
              <label htmlFor="course_modules">Add Module</label>
              {
                fields.map((field, index) => 
                  <div className={styles.inputGroup+" input-group"} key={index}>
                    <div className="input-group-prepend">
                      <span className={styles.inputGroupText+" input-group-text"}>Module {index+1}</span>
                    </div>
                    <input 
                      type="text" 
                      name="course_modules" 
                      className={"form-control "+styles.input} 
                      placeholder="Enter course outline" 
                      onChange={formInputChange}
                      id={`Module ${index+1}`}
                    />
                    <div className="input-group-append">
                      <button type="button"
                        id={index}
                        onClick={removeField}
                      >
                        Remove
                      </button>
                    </div>                
                  </div>
                )
              }
              <p className={styles.addBtn}>
                <button type="button"
                  onClick={addField}
                >
                  Add <i className="fa fa-plus"></i>
                </button>
              </p>
            </div>                       
           
            <div className={styles.formRow}>
              <label htmlFor="requirements">Requirements</label>
              <textarea 
                name="requirements" 
                className={"form-control "+styles.input} 
                placeholder="Requirements" 
              >{props.about}</textarea>
            </div>            
           
            <div className={styles.formRow}>
              <label htmlFor="availability">Select Availability</label>
              <div className={styles.availability+" availability"}>
                <ul>
                  <li>
                    <input type="checkbox" className="check-item active"/>
                    Mon<span className="time">8am - 5pm</span>
                  </li>
                  <li>
                    <input type="checkbox" className="check-item active"/>
                    Tue<span className="time">8am - 5pm</span>
                  </li>
                  <li>
                    <input type="checkbox" className="check-item active"/>
                    Wed<span className="time">8am - 5pm</span>
                  </li>
                  <li>
                    <input type="checkbox" className="check-item active"/>
                    Thu<span className="time">8am - 5pm</span>
                  </li>
                  <li><input type="checkbox" className="check-item"/>Fri<span className="time">8am - 5pm</span></li>
                  <li><input type="checkbox" className="check-item"/>Sat<span className="time">8am - 5pm</span></li>
                  <li><input type="checkbox" className="check-item"/>Sun<span className="time">8am - 5pm</span></li>
                </ul>
              </div>              
            </div>            
          </div>
          <div className="col-md-5 col-lg-5">
            <div className={styles.formRow+" form-group"}>
              <label htmlFor="image">Upload Image</label>
              <ProfileAvatar
                isEditable={true}
              />
            </div>
            <div className={styles.formRow+" form-group"}>
              <label htmlFor="video">Video Bio</label>
              <div className={styles.videoBio}>
                <i className="fa fa-cloud-upload-alt"></i>
                <p>Mp4, MOV, Max 500mb</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button 
            type="button"
            onClick={creatCourse}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Create'}
          </button>
          <button type="reset">Cancel</button>
        </div>           
      </form>      
    </div>
  );
}