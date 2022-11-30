import style from './course.module.scss';
import Image from 'next/dist/client/image';

export default function Course(props) {

  return (
    <div 
      className="col-xl-4 col-md-5 mb-2 mt-2">
      <div className={"card "+style.card} onClick={props.onClick}>
        <Image
          src={props.cover}
          width={400}
          height={350}
        />
        <div className="card-body">
          <div className={style.details}>
            <h5>{props.title +' - '+props.subject_class}</h5>
           { props.price ?  <h5>{props.price}</h5> : null }
          </div>
        </div>
        {/* {
          props.addToCart ? 
          <div className={"card-footer "+style.cardfooter}>
            <button 
              className={style.btn}
              onClick={props.addToCart}   
            >
              <i className="fa fa-shopping-cart"></i>
            </button>
          </div>
          : null
        } */}
      </div>
    </div>
  );
}