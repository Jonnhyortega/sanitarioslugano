import { useState, useRef, useEffect, useCallback } from "react";
import { PiChatsCircle, PiArrowUp, PiX } from "react-icons/pi";
import { ChatbotContainer } from "./ChatbotStyles";
import callChatAPI from "../../utils/chatbot";
import { parseMessage } from "../../utils/formatMessage";
import { chatFacts, budgetLink, hasStore } from "../../config/links";
import { dotWave } from "ldrs";

dotWave.register();

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
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "¡Hola! Soy **LuganoBot**, el asistente virtual de **Sanitarios Lugano** 💧\n¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 🎵 Sonidos
  const botResponseSound =
    typeof Audio !== "undefined"
      ? new Audio("/sounds/bot-response.mp3")
      : null;
  const userSendSound =
    typeof Audio !== "undefined" ? new Audio("/sounds/send.mp3") : null;

  // 🧠 Contexto del asistente
  const context = `
  🧠 Contexto IA – Sanitarios Lugano

  Sos LuganoBot, el asistente virtual oficial de Sanitarios Lugano.
  Sanitarios Lugano es una empresa dedicada a la venta de productos sanitarios, griferías, porcelanas, accesorios de baño y artículos de plomería.
  Nos especializamos en ofrecer soluciones de calidad, asesoramiento personalizado y atención cercana para cada cliente, tanto particulares como profesionales de la construcción.

  🎯 Objetivo principal:
  Convertir consultas en contactos reales: personas que dejen su nombre, teléfono o mensaje de compra/presupuesto.

  💬 Estilo:
  Profesional pero cercano, con tono humano, empático, resolutivo y seguro.
  Respuestas breves, claras y sin tecnicismos. Evitá sonar robótico.
  Podés usar emojis (💧🚿🛁) con moderación.

  🧭 Qué sabe LuganoBot:
  - Vende productos sanitarios y accesorios de baño: inodoros, lavatorios, bidets, griferías, muebles, bachas, duchas, etc.
${chatFacts()}

  🚫 Qué NO debe hacer:
  - No inventar precios ni productos.
${hasStore() ? "" : "  - No prometer compra online ni carrito."}
  - No responder sobre temas ajenos.

  🪄 Ejemplo:
  Usuario: ¿Tienen inodoros Ferrum?
  LuganoBot: ¡Sí! Trabajamos con modelos Ferrum, Roca y Piazza 💧. ¿Querés que te pase el contacto por WhatsApp para ver opciones?
  `;

  const quickReplies = [
    {
      label: "¿Cómo puedo pedir un presupuesto?",
      value: "¿Cómo puedo pedir un presupuesto?",
    },
    { label: "¿Dónde los encuentro?", value: "¿Dónde los encuentro?" },
    { label: "Medios de pago", value: "¿Cuáles son los medios de pago?" },
  ];

  const toggleChat = () => setChatOpen(!chatOpen);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setChatOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const send = async (text) => {
    if (userSendSound) userSendSound.play();
    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);
    setLoading(true);

    let reply;

    switch (text) {
      case "¿Cómo puedo pedir un presupuesto?":
        reply =
          `Podés pedir tu presupuesto directamente por WhatsApp 💬\n👉 ${budgetLink()}`;
        break;
      case "¿Dónde los encuentro?":
        reply =
          "Estamos en **Villa Lugano, Buenos Aires** 🇦🇷\nPodés visitarnos o coordinar una entrega por WhatsApp.";
        break;
      case "¿Cuáles son los medios de pago?":
        reply =
          "Aceptamos pagos a través de **Mercado Pago** y también en **efectivo** 💰.";
        break;
      default:
        try {
          reply = await callChatAPI(text, newHistory, context);
          if (botResponseSound) botResponseSound.play();
        } catch {
          reply = "Hubo un error, ¿podés intentar nuevamente?";
        }
    }

    const botMsg = { from: "bot", text: reply };
    setMessages((prev) => [...prev, botMsg]);
    setHistory((prev) => [...prev, { role: "model", content: reply }]);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      send(input.trim());
      setInput("");
    }
  };

  return (
    <ChatbotContainer>
      {!chatOpen ? (
        <button
          className="chat-icon"
          onClick={toggleChat}
          aria-label="Abrir chat"
        >
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

            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.from}`}>
                  <MessageContent text={m.text} />
                </div>
              ))}
              {loading && (
                <l-dot-wave size="47" speed="1" color="#242f5c"></l-dot-wave>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="quick-replies">
              {quickReplies.map((q, i) => (
                <button key={i} onClick={() => send(q.value)}>
                  {q.label}
                </button>
              ))}
            </div>

            <form className="chat-input-area" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Escribí tu consulta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Tu consulta"
              />
              <button type="submit" aria-label="Enviar">
                <PiArrowUp aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      )}
    </ChatbotContainer>
  );
};

export default Chatbot;
