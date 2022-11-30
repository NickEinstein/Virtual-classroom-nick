export default function ReminderButton(props) {
  return (
    <div className="col-md-4 col-lg-4">
      <div className={"note-wrapper "+props.style}>
        <span>{props.subject}</span>
        <span>{props.time}</span>
        {props.icon ? <span><i className="ion-ios-close-outline"></i></span> : null}
      </div>
    </div>
  ) 
}