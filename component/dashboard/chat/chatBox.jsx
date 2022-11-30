import ChatForm from "./form";

export default function ChatBox({children}) {
  return (
    <div className="chat-wrapper">
      <div className="message-wrapper">
        <div className="messages">
          <h3 className="text-center title">Today</h3>
        </div>        
          {children}
      </div>
      <ChatForm />
    </div>
  )
}