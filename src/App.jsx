import React, { useState, useRef, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import "./App.scss";
import { handlePluginCommand, isPluginCommand } from "./plugins/PluginManager";

function App() {
  //Check for whether there are exiting messages in local storage
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("messageList")) || [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const hasInitialized = useRef(false);

  //Local Storage for Entire Message List
  const saveMessages = (msgList) => {
    localStorage.setItem("messageList", JSON.stringify(msgList));
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      content: trimmed,
      type: "text",
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    if (isPluginCommand(trimmed)) {
      const loading = {
        id: Date.now() + 1,
        sender: "bot",
        type: "text",
        content: "Thinking...",
        isTyping: true,
      };
      setMessages([...updatedMessages, loading]);

      const response = await handlePluginCommand(trimmed);

      const finalMessages = [
        ...updatedMessages,
        {
          id: Date.now() + 2,
          sender: "bot",
          type: "plugin",
          pluginName: response.pluginName,
          pluginData: response.pluginData,
        },
      ];

      setMessages(finalMessages);
    }

    setInput("");
  };

  // Clear chat function
  const resetChat = () => {
    setMessages([]);
    localStorage.removeItem("messageList");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    if (hasInitialized.current) {
      saveMessages(messages);
    } else {
      hasInitialized.current = true;
    }
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="chat-container">
        <h2 className="chat-title">AI Chat Interface</h2>
        <ChatWindow
          messages={messages}
          scrollRef={scrollRef}
          input={input}
          setInput={setInput}
        />
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          onClear={resetChat}
          messageCount={messages.length}
        />
      </div>
    </div>
  );
}

export default App;
