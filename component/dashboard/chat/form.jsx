export default function ChatForm() {
  return (
    <div className="chat-form">
      <form>
        <div className="input-group sticky">
          <textarea name="message" className="form-control" placeholder="Write a message"></textarea>
          <div className="input-group-append">
            <span className="input-group-text">
              <label htmlFor="file">
                <i className="fa fa-paperclip mr-4"></i>
                <input type="file" name="file"  hidden/> 
              </label>
              <button type="button" className="btn btn-default">Send</button>
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}