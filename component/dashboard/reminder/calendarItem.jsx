export default function CalendarItem(props) {
  return (
    <a href={props.link} className={props.style}>
      <h4>{props.week_day}</h4>
      <span  className="date">{props.day}</span>
    </a>  
  )
}