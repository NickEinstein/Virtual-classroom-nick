import { Card, Col, Form } from 'react-bootstrap';
import style from './search.module.scss';
import { useState, useEffect  } from 'react';

export default function DetailCard(props) {
  return (
    <div className={style.searchCard+" card p-1"} onClick={props.onClick}>
      <div className="card-body">
        <div className={style.detailsWrapper}>
          <div className={style.imgWrapper+ " mr-5"}>
              <img src="https://via.placeholder.com/150" width="150"  />
          </div>
          <div className={style.row}>
            <div className={style.rowSm}>
              <div>
                <h5>
                  {props.name}
                </h5>
                {
                  props.isTutor && props.isTutor !== null ?
                  <span> 
                    <i className={style.iconColor+" fas fa-star ml-2"}></i> 5 
                    <small>(8 students)</small>
                  </span>
                  : null 
                }
              </div>
              {props.isTutor && props.isTutor !== null ?
                <div>
                  <h5>₦1,000</h5><span>/hr</span>
                </div>
                : null
              }
            </div>
            <h6>{props.subject}</h6>{props.isTutor ? <small className="ml-2">(Adult leaners, SS1, JSS1, JSS3)</small>: null}
            <div>
              <p>{[props.text]} </p>
            </div>
            <div className={style.pillWrapper}>
              {
                props.isTutor ? 
                <div className={style.pill}>
                  <i className="fa fa-users"></i> 10 Repeat students
                </div> 
                : 
                null
               }
              <div className={style.pill}>
                <i className="fa fa-clock"></i> {props.isTutor ? '50 Hours Taught' : 'Member for 10 days'}
              </div>
              <div className={style.pill}>
                <i className="fa fa-clock"></i> Last login 4hrs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}