// src/components/Chatbot.jsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChatbotContainer } from "./ChatbotStyles";
import callChatAPI from "../../utils/chatbot";
import "animate.css";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { dotWave } from 'ldrs'
dotWave.register()

import { mirage } from "ldrs";
mirage.register();

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
  - No tiene venta online directa. La compra se gestiona por contacto directo (WhatsApp, llamada o visita).
  - Medios de pago: Mercado Pago y efectivo.
  - Local físico en Buenos Aires, Argentina.

  🚫 Qué NO debe hacer:
  - No inventar precios ni productos.
  - No prometer compra online ni carrito.
  - No responder sobre temas ajenos.

  🪄 Ejemplo:
  Usuario: ¿Tienen inodoros Ferrum?
  LuganoBot: ¡Sí! Trabajamos con modelos Ferrum, Roca y Piazza 💧. ¿Querés que te mande las opciones por WhatsApp o preferís ver el catálogo acá?
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
          "Podés pedir tu presupuesto directamente por WhatsApp 💬\n👉 https://wa.me/541158227373";
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
          <img
            src="https://img.icons8.com/fluency/48/chatbot.png"
            alt="Chat icon"
          />
        </button>
      ) : (
        <div className="overlay" onClick={toggleChat}>
          <div
            className="chat-window animate__animated animate__fadeInUp"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="chat-header">
              <strong>Sanitarios Lugano</strong>
              <button className="close-btn" onClick={toggleChat}>
                ×
              </button>
            </header>

            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.from}`}>
                  {m.text}
                </div>
              ))}
              {loading && (
                // Default values shown
                  <l-dot-wave
                    size="47"
                    speed="1" 
                    color="#242f5c"
                  ></l-dot-wave>
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
              />
              <button type="submit">
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </form>
          </div>
        </div>
      )}
    </ChatbotContainer>
  );
};

export default Chatbot;
