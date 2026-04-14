import { useEffect, useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import ReactMarkdown from "react-markdown";

type Message = {
  sender: "bot" | "user";
  text: string;
};

const quickOptions = [
  "📈 Analyze a Company",
  "⚖️ Compare Two Companies",
  "🔥 Market Trends Today",
  "📚 Explain Financial Terms",
  "💼 Portfolio Suggestions",
];

const popularCompanies = [
  "Apple",
  "Microsoft",
  "Amazon",
  "Google",
  "Tesla",
  "Meta",
  "Nvidia",
  "Netflix",
  "Reliance",
  "TCS",
  "Infosys",
  "HDFC Bank",
  "ICICI Bank",
  "Adobe",
  "AMD",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi 👋 I’m CompanyPulse AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"menu" | "analyze" | "chat">("menu");

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setShowTyping(true);
    }, 1000);

    const greetingTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 1800);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(greetingTimer);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: option,
      },
    ]);

    if (option.includes("Analyze")) {
      setMode("analyze");

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Select one of the companies below, or type any company name to analyze.",
        },
      ]);

      return;
    }

    setMode("chat");

    let botReply = "Please tell me more.";

    if (option.includes("Compare")) {
      botReply =
        "Please type two companies to compare. Example: Apple vs Microsoft.";
    } else if (option.includes("Market Trends")) {
      botReply =
        "Ask about market trends, top gainers, sectors, or market sentiment.";
    } else if (option.includes("Financial Terms")) {
      botReply =
        "Ask any finance term like P/E Ratio, EBITDA, Market Cap, EPS, or CAGR.";
    } else if (option.includes("Portfolio")) {
      botReply =
        "Tell me your goal and risk level. Example: low-risk long-term portfolio.";
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: botReply,
      },
    ]);
  };

  const sendMessage = async (customMessage?: string) => {
    const userText = customMessage || input;

    if (!userText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setInput("");
    setLoading(true);
    setMode("chat");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chatbot",
        {
          message: userText,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong while contacting CompanyPulse AI.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="chatbot-wrapper">
        {!isOpen && showGreeting && (
          <div
            className="chatbot-greeting"
            onClick={() => {
              setIsOpen(true);
              setShowGreeting(false);
            }}
          >
            {showTyping ? (
              <>
                <div className="chatbot-greeting-title">
                  CompanyPulse AI
                </div>

                <div className="chatbot-greeting-text">
                  Hi 👋 I’m CompanyPulse AI — your personal stock market assistant. Ask me about companies, compare stocks, or discover opportunities.
                </div>
              </>
            ) : (
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        )}

        <button
          className="chatbot-toggle"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowGreeting(false);
          }}
        >
          💬
        </button>
      </div>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>CompanyPulse AI</h3>

            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-body">
            {messages.map((message, index) => (
            <div
            key={index}
            className={
                message.sender === "bot"
                ? "bot-message"
                : "user-message"
            }
            >
            {message.sender === "bot" ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
            ) : (
                message.text
            )}
            </div>
            ))}

            {loading && (
              <div className="bot-message">
                Thinking...
              </div>
            )}

            {mode === "menu" && (
              <div className="quick-options">
                {quickOptions.map((option) => (
                  <button
                    key={option}
                    className="quick-option-btn"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {mode === "analyze" && (
              <div className="quick-options">
                {popularCompanies.map((company) => (
                  <button
                    key={company}
                    className="quick-option-btn"
                    onClick={() => sendMessage(`Analyze ${company}`)}
                  >
                    {company}
                  </button>
                ))}

                <button
                  className="quick-option-btn"
                  onClick={() => setMode("menu")}
                >
                  ⬅ Back to Menu
                </button>
              </div>
            )}

            <div className="chatbot-input-area">
              <input
                type="text"
                placeholder="Ask about any company, market trend, or finance term..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="chatbot-input"
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="chatbot-send-btn"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>

            {mode !== "menu" && (
              <div className="mt-3 flex justify-center">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setMode("menu")}
                >
                  Back to Main Menu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}