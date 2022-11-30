import styles from './assignment.module.scss';
import Image from 'next/dist/client/image';

export default function Assignment(props) {
  return (
    <>
      <div className={styles.card} onClick={props.onClick}>
        <div className="avatar-sm">
          <Image src={props.avatar} width="40" height="40" alt="avatar" className="rounded-circle"  />
        </div>
        <div className={styles.cardbody}>
          <h5>{ props.title }</h5>
          {
            props.students ? 
            <span>{ props.students } Students</span>
            : null
          }
          <p>Pending assignments <span> {props.count }</span></p>
        </div>  
      </div>
    </>
  );
}