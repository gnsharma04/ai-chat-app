import React, { useState, useRef, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import "./App.scss";
import { handlePluginCommand, isPluginCommand } from "./plugins/PluginManager";

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("messageList");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const isFirstRender = useRef(true);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      content: input.trim(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);

    if (isPluginCommand(input)) {
      const typingMessage = {
        id: Date.now() + 0.5,
        sender: "bot",
        type: "text",
        content: "Thinking...",
        isTyping: true,
      };

      setMessages((prev) => [...prev, typingMessage]);

      const pluginResponse = await handlePluginCommand(input);

      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        {
          id: Date.now() + 1,
          sender: "bot",
          content: "",
          type: "plugin",
          pluginName: pluginResponse.pluginName,
          pluginData: pluginResponse.pluginData,
        },
      ]);
    }

    setInput("");
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("messageList");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("messageList", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("messageList", JSON.stringify(messages));
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
          onSend={handleSend}
          onClear={clearChat}
          messageCount={messages.length}
        />
      </div>
    </div>
  );
}

export default App;
