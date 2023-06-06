import "../Styles/App.css";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";

const socket = io("http://localhost:4000");

function Mensajero(codigo) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMesagge = {
      body: message,
      from: "Me",
    };
    setMessages([newMesagge, ...messages]);
    setMessage("");
  };

  return (
    <div className="Mensajes">
      <h1>Chat :D</h1>
      <div className="CuadroMensajes">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mensaje ${
              message.from === "Me" ? "mensaje-usuario" : ""
            }`}
          >
            <p>
              {message.from}: {message.body}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <br />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Mensajero;
