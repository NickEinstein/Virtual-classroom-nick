import styles from './assignment-status.module.scss';
import Image from 'next/dist/client/image';
import { useState } from 'react';
// import Modal from '../../modal/index';


export default function AssignmentStatus(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={styles.wrapper}>
        <div className="avatar-sm">
          <Image src={props.avatar} width="40" height="40" alt="avatar" className="rounded-circle"  />
        </div>
        <div className={styles.title}>
          <h5>{props.title}</h5>
          <span>{props.status}</span>
        </div>
        <div>
          <button
            onClick={() => setShowModal(true)}
            className={styles.button}
          >View response
          </button>
        </div>
      </div>
      {/* <div>
        <Modal
          onClose={() => setShowModal(false)}
          show={showModal}
        >
          Hello from the modal!
        </Modal>
    </div>    */}
    </>
  );
}