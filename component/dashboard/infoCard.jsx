import Image from "next/dist/client/image";
import { useContext, useState } from "react";
import shopContext from "../../store/context/shopContext";

export default function InfoCard(props) {

  const context = useContext(shopContext)

  return (
    <div className={props.is_active ? 'list-item listitem active' : ' list-item listitem'} onClick={props.onClick}>
      <div className="item-header">
        <span className="avatar-sm">
          <Image src={props.avatar} width="40" height="40" alt="avatar" className="rounded-circle"  />
        </span>
        <div className="tutor-name">
          {props.name}
          <span>{props.subject}</span>
        </div>                      
        <span className="rate-icon"><i className="fa fa-star"></i></span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="info">
           {
             props.rating ?
              <span className="ratings">
                <i className="far fa-star"></i> {props.rating} ({props.rating_count} Ratings)
              </span>
            : null
           } 
          <span className="date">
            <i className="fa fa-calendar-week"></i> {props.date}
          </span>
        </div>
          <button 
            type="button" 
            onClick={props.onClick} 
            id={props.id} 
            className="btn btn-sm"
          >
            Details
          </button>
      </div>
    </div>
  )
}