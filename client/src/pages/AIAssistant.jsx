import { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Topbar from "../layouts/Topbar";
import API from "../services/api";
import { useTheme } from "../context/ThemeContext";

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
const { colors } = useTheme();
  const handleAsk = async () => {
  if (!prompt.trim()) return;

  const userMessage = prompt;

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userMessage,
    },
  ]);

  setPrompt("");

  try {
    const taskResponse = await API.get("/tasks");

const { data } = await API.post("/ai", {
  prompt: userMessage,
  tasks: taskResponse.data.tasks,
});

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);
  } catch (err) {
    console.log(err);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "❌ AI is unavailable.",
      },
    ]);
  }
};

  return (
    <div className={`flex min-h-screen ${colors.page}`}>
      <Sidebar />

      <div className="flex-1 p-8">
        <Topbar />

        <h1 className={`text-4xl font-bold text-cyan-400 mt-8`}>
          AI Assistant
        </h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI anything..."
          rows="5"
          className={`w-full mt-8 ${colors.card} ${colors.text} p-4 rounded-xl outline-none border ${colors.input}`}
        />

        <button
          onClick={handleAsk}
          className="mt-4 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold"
        >
          Ask AI
        </button>
<div className="mt-8 space-y-4">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-4 rounded-xl whitespace-pre-wrap ${
        msg.sender === "user"
          ? "bg-cyan-600 ml-20"
          : `${colors.card} ${colors.text} mr-20`
      }`}
    >
      <strong>
        {msg.sender === "user" ? "👤 You" : "🤖 AI"}
      </strong>

      <p className="mt-2">{msg.text}</p>
    </div>
  ))}
</div>
        
      </div>
    </div>
  );
}

export default AIAssistant;