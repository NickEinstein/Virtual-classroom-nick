export default function Message(props) {
  console.log
  return (
    <p className={"message-bubble "+props.style}>
      {props.message}
      <span className="message-icon"></span>
    </p>    
  )
}