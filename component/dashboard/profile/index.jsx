
import styles from './profile.module.scss';
import ProfileAvatar from "../avatar";

export default function MyProfile(props) {
  return (
    <div className={styles.profile + " col-md-8 col-lg-8"}>
      <div>
        <ProfileAvatar
          avatar={props.avatar}
          width="100"
          height="100"
          isEditable={true}
        />
        <form>
          <div className="row ">
            <div className={styles.formRow+" col-md-6 col-lg-6 "}>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                className={"form-control "+styles.input} 
                placeholder="Full Name" 
                value={props.name}
                readOnly
              />
            </div>
            <div className={styles.formRow+" col-md-6 col-lg-6 "}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                className={"form-control "+styles.input} 
                placeholder="Email" 
                readOnly
                value={props.email}
              />
            </div>
            <div className={styles.formRow+" col-md-6 col-lg-6 "}>
              <label htmlFor="education">Highest level of Education</label>
              <select name="education" className={"form-control "+styles.input}>
                <option value={props.qualification} selected>{props.qualification}</option>
                <option value="PhD">PhD</option>
                <option value="MSc">MSc</option>
                <option value="BSC">BSC</option>
              </select>
            </div>
            <div className={styles.formRow+" col-md-6 col-lg-6 "}>
              <label htmlFor="subject">Subject Interest</label>
              <select name="subject" className={"form-control "+styles.input}>
                <option value={props.subject} selected>{props.subject}</option>
                <option value="PhD">PhD</option>
                <option value="MSc">MSc</option>
                <option value="BSC">BSC</option>
              </select>
            </div>
            <div className={styles.formRow+" col-md-6 col-lg-6 "}>
              <label htmlFor="language">Primary language</label>
              <input 
                type="text" 
                name="language" 
                className={"form-control "+styles.input} 
                placeholder="language" 
                value={props.language}
              />
            </div>            
            <div className={styles.formRow+" col-md-6 col-lg-6 "}>
              <label htmlFor="about">About</label>
              <textarea 
                name="about" 
                className={"form-control "+styles.input} 
                placeholder="About" 
              >{props.about}</textarea>
            </div>            
              <div className={styles.buttons}>
                <button>Update</button>
                <button>Done</button>
              </div>           
          </div>
        </form>
      </div>
    </div>
  );
}