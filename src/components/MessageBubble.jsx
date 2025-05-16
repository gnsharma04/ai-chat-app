import React from "react";
import "../styles/MessageBubble.scss";

const MessageBubble = ({ message }) => {
  const { sender, type, content, pluginName, pluginData } = message;

  const renderContent = () => {
    // Normal text messages
    if (type === "text") {
      return content;
    }

    if (type === "plugin") {
      // Handle Errors and invalid commands
      if (pluginData?.error) {
        return (
          <div className="plugin-card error-card">
            <strong>❌ Error:</strong> {pluginData.error}
          </div>
        );
      }

      // Handle calc plugin
      if (pluginName === "calc") {
        return (
          <div className="plugin-card calc-card">
            <div>
              <strong>{`🧮 Expression >> `}</strong> {pluginData.expression}
            </div>
            <div>
              <strong>✅ Result = </strong> {pluginData.result}
            </div>
          </div>
        );
      }

      // Handle Weather Plugin
      if (pluginName === "weather") {
        const { location, temperature, condition, windspeed, humidity, time } =
          pluginData;

        return (
          <div className="plugin-card weather-card">
            <div>
              <strong>📍 Location:</strong> {location}
            </div>
            <div>
              <strong>🌡️ Temperature:</strong> {temperature}
            </div>
            <div>
              <strong>🌤️ Condition:</strong> {condition}
            </div>
            <div>
              <strong>💧 Humidity:</strong> {humidity}
            </div>
            <div>
              <strong>💨 Wind:</strong> {windspeed}
            </div>
            <div>
              <strong>🕒 Time:</strong> {time}
            </div>
          </div>
        );
      }

      // Handle Define Plugin
      if (pluginName === "define") {
        const { word, phonetic, definitions } = pluginData;

        return (
          <div className="plugin-card define-card">
            <div>
              <strong>📚 Word:</strong> {word} {phonetic && `/${phonetic}/`}
            </div>
            {definitions.map((def, idx) => (
              <div key={idx}>
                <strong>
                  {idx + 1}. ({def.partOfSpeech})
                </strong>{" "}
                {def.definition}
                {def.example && (
                  <div style={{ fontStyle: "italic" }}>💬 "{def.example}"</div>
                )}
              </div>
            ))}
          </div>
        );
      }

      return (
        <div className="plugin-card">{JSON.stringify(pluginData, null, 2)}</div>
      );
    }

    return null;
  };

  return <div className={`message-bubble ${sender}`}>{renderContent()}</div>;
};

export default MessageBubble;
