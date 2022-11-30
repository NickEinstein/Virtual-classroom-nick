import Image from "next/dist/client/image";
import styles from './requestcard.module.scss';

export default function RequestCard(props) {

  return (
    <div className={props.is_active ? "list-item listitem active" : " list-item listitem"}>
      <div className={styles.headerhorizontal}>
        <div className={"item-header "+styles.itemheader} onClick={props.onClick} id={props.id}>
          <span className="avatar-sm">
            <Image src={props.avatar} width="45" height="45" alt="avatar" className="rounded-circle"  />
          </span>
          <div className={"tutor-name "+styles.tutorname}>
            {props.name}
            <span className={styles.title}>{props.title}</span>
          </div>                      
        </div>
        <span>{props.time}</span>
      </div>
      <div className={styles.cardbody}>
        <p className={styles.message}>{props.message}</p>
        <div className="row justify-content-between px-3">
          <div className={styles.subjects}>
            { props.subjects.map((subject, index) => 
              <span key={index}>{subject} | </span>
            ) }
          </div>
          <div className={styles.buttons}>
            <button className="btn btn-secondary"
            onClick={props.ignore}
            >Ignore</button>
            <button className="btn btn-default text-white"
            onClick={props.onClick}
            >Accept</button>
          </div>
        </div>
      </div>
    </div>
  )
}