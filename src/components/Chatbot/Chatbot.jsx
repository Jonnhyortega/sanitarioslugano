import { useState, useRef, useEffect } from "react";
import { PiChatsCircle, PiX } from "react-icons/pi";
import { ChatbotContainer } from "./ChatbotStyles";
import { parseMessage } from "../../utils/formatMessage";
import { chatReplies } from "../../config/links";

// Chat de preguntas frecuentes: solo botones con respuestas fijas, sin IA ni llamadas a una API.
const replies = chatReplies();

const greeting = {
  from: "bot",
  text: "¡Hola! Soy **LuganoBot**, el asistente de **Sanitarios Lugano** 💧\nElegí una opción y te respondo al instante.",
};

const MessageContent = ({ text }) =>
  parseMessage(text).map((token, i) => {
    if (token.type === "bold") return <strong key={i}>{token.value}</strong>;
    if (token.type === "link")
      return (
        <a key={i} href={token.href} target="_blank" rel="noopener noreferrer">
          {token.label}
        </a>
      );
    return token.value;
  });

export const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const messagesEndRef = useRef(null);
  const sendSound = useRef(null);

  const toggleChat = () => setChatOpen((open) => !open);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setChatOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const ask = ({ question, answer }) => {
    if (typeof Audio !== "undefined") {
      sendSound.current ??= new Audio("/sounds/send.mp3");
      sendSound.current.play().catch(() => {});
    }
    setMessages((prev) => [...prev, { from: "user", text: question }, { from: "bot", text: answer }]);
  };

  return (
    <ChatbotContainer>
      {!chatOpen ? (
        <button className="chat-icon" onClick={toggleChat} aria-label="Abrir chat">
          <PiChatsCircle aria-hidden="true" />
        </button>
      ) : (
        <div className="overlay" onClick={toggleChat}>
          <div
            className="chat-window"
            role="dialog"
            aria-label="Chat con Sanitarios Lugano"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="chat-header">
              <strong>Sanitarios Lugano</strong>
              <button className="close-btn" onClick={toggleChat} aria-label="Cerrar chat">
                <PiX aria-hidden="true" />
              </button>
            </header>

            <div className="chat-messages" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.from}`}>
                  <MessageContent text={m.text} />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="quick-replies">
              {replies.map((r) => (
                <button key={r.question} onClick={() => ask(r)}>
                  {r.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </ChatbotContainer>
  );
};

export default Chatbot;
