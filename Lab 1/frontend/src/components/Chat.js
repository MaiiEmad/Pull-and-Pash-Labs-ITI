import { useEffect, useState } from "react";
import axiosInstance from "./../network/axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  let messagesCount = messages.length;

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (newMessage) {
      axiosInstance
      .post("messages", { message: newMessage })
        .then((response) => {
          setNewMessage("");
        })
        .catch((error) => {
          //
        });
    }
  };


  const getMessages = () => {
    axiosInstance
    .get(`messages?count=${messagesCount}`)
    .then((response) => {
      setMessages(messages.concat(response.data));
      messagesCount = messages.length;
    })
    .catch((error) => {
      //
    });
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 1000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
      <div className="card my-5 w-50 mx-auto">
        <div className="card-body h-100">
          {messages.map((message, index) => {
            return (
              <div className="media" key={index}>
                <div className="media-body d-flex flex-row align-items-center">
                  <img
                    src="blank-profile-picture.png"
                    width="35"
                    height="35"
                    className="rounded-circle m-2"
                    alt="..."
                  />
                  <div className="mb-1">{message.message}</div>
                </div>
                <hr />
              </div>
            );
          })}
          <form onSubmit={handleSubmit} className="input-group mt-3">
            <input
              type="text"
              value={newMessage}
              onChange={handleChange}
              className="form-control"
              placeholder="Send Message"
            />
          </form>
        </div>
      </div>
  );
}

export default Chat;
