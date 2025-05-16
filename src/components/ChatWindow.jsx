import React from "react";
import MessageBubble from "./MessageBubble";
import "../styles/ChatWindow.scss";

const ChatWindow = ({ messages, scrollRef }) => {
  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <>
          <div className="blank-chat-window">Nothing to Show Here</div>
        </>
      ) : (
        <>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </>
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatWindow;
