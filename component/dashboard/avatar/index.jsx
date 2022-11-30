import styles from './avatar.module.scss';
import Image from 'next/dist/client/image';

export default function ProfileAvatar(props) {
  return (
    <div className={styles.avatar}> 
      {
        props.avatar ?
        <Image src={props.avatar} width={props.width} height={props.height} alt="avatar" />
        :
        null
      }
      {
        props.isEditable ?
        <button type="button" className={styles.iconWrapper}>
          <i className="fa fa-edit"></i>
        </button>
        :
        null
      }
    </div>    
  );
}