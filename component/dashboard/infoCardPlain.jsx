import Image from "next/dist/client/image";

export default function InfoCardPlain(props) {

  return (
    <div 
      className={props.is_active ? "list-item listitem active" : " list-item listitem"}
      onClick={props.onClick}
      >
      <div className="item-header" onClick={props.onClick} id={props.id}>
        <span className="avatar-sm">
          <Image src={props.avatar} width="40" height="40" alt="avatar" className="rounded-circle"  />
        </span>
        <div className="tutor-name">
          {props.name}
          <span>{props.subject}</span>
        </div>                      
      </div>
      <div id={props.id}>
        <div className="info text-center">
          {
            props.is_active && props.time
            ?
            <span className="text-danger">In Class</span>
            :          
            props.time ? <span className="ratings"> {props.time} (to next class)</span> : null
          }
          {
            props.periods ? 
            <span className="date">
              {props.periods}
            </span>
            : null
          }
        </div>
      </div>
    </div>
  )
}