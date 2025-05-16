# 🤖 AI Chat Interface - Assignment for Frontend Developer At TruPulse

A modular, plugin-powered chatbot interface built using **React Create-React-App (CRA)**, **SCSS** and **Material UI**. The chatbot supports command-based inputs and responds with live weather, definitions, and calculations using real APIs.

---

## 🚀 Setup & Running Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/gnsharma04/ai-chat-app
cd ai-chat-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Live Server

```bash
npm run dev
```

The app will run at http://localhost:3000

## Plugin Architecture

Each plugin follows a unified structure:

```bash
const plugin = {
  name: "pluginName",
  command: "/commandName",
  execute: async (input) => {
    // parse input, fetch data, return structured pluginData
  }
};
```

All plugins are imported and registered at PluginManager.js

## Plugins Implemented & APIs Used

1. Calculator Plugin (/calc)
   Evaluates mathematical expressions using eval() in a scoped manner.

2. Weather Plugin (/weather <city>)
   APIs Used:
   🔹 Nominatim OpenStreetMap – Get latitude/longitude from city name
   🔹 Open-Meteo – Get current temperature, wind, and humidity

3. Definition Plugin (/define <word>)
   API Used:
   🔹 Free Dictionary API – Get word definitions, part of speech, examples

## Features

- Slash command-based plugin routing
- Live API integration (weather, dictionary)
- Typing indicator while fetching
- LocalStorage support to persist chat history
- Styled with Material UI & custom SCSS
- Responsive layout for desktop and mobile
- Command buttons in blank state for quick access

## Supported Commands (Example)

- /calc 5+2
- /weather Mumbai
- /define Engineer
