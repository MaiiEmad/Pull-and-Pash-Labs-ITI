import { useEffect, useState } from "react";
import axiosInstance from "./../network/axios";

function LongChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
      .post("long-messages", { message: newMessage })
        .then((response) => {
          setNewMessage("");
        })
        .catch((error) => {
          //
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .get("long-messages")
      .then((response) => {
        setMessages([...messages, response.data]);
      })
      .catch((error) => {
        //
      });
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

export default LongChat;
