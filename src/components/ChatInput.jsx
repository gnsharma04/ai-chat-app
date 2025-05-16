import React from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField } from "@mui/material";
import "../styles/ChatInput.scss";

const ChatInput = ({ input, setInput, onSend, onClear, messageCount }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <div className="chat-input">
      <TextField
        fullWidth
        size="small"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton color="primary" onClick={onSend}>
        <SendIcon />
      </IconButton>
      <IconButton color="primary" onClick={onClear} disabled={!messageCount}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default ChatInput;
