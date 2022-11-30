import style from './course.module.scss'
import Image from 'next/dist/client/image';
export default function Category(props) {
  return (
    <div 
      className="col-lg-4 col-md-4 col-xs-12 mb-3" id={props.id}>
      <div className={"card "+style.card} onClick={props.onClick}>
        <Image width={400} height={300}  src={props.cover}/>
        <div className="card-body">
          <div className={style.details}>
            <h5>{props.title}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}