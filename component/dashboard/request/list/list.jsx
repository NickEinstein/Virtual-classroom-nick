import Image from "next/dist/client/image";
import styles from './list.module.scss';

export default function List(props) {
  return (
    <>
      <div className={styles.list}>
        <div className={styles.listheader}>
          <div className="avatar-sm">
            <Image src={props.avatar} width="50" height="50" alt="avatar" className="rounded-circle"  />
          </div>
          <div className={styles.headertag}>
              <span className={styles.nametag}>{props.name}</span> <span className={styles.title}>{props.title}</span>
          </div>
        </div>
        <div className={styles.subjects}>
          { props.subjects.map((subject, index) => 
            <span key={index}>{subject} | </span>
          ) }
        </div>
      </div>
    </>
  );
}