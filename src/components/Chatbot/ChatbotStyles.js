// src/components/ChatbotStyles.jsx
import styled from "styled-components";

export const ChatbotContainer = styled.section`
  position: fixed;
  bottom: 40px;
  right: 24px;
  font-family: "Inter", "Segoe UI", Roboto, sans-serif;
  z-index: 9999;

  /* === BOTÓN FLOTANTE === */
  .chat-icon {
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--blue1), var(--blue2));
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    transition: all 0.25s ease;
  }

  .chat-icon img {
    width: 30px;
    height: 30px;
  }

  .chat-icon:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  }

  /* === OVERLAY === */
  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    z-index: 1000;
  }

  /* === VENTANA === */
  .chat-window {
    background: #ffffff;
    border-radius: 16px;
    width: 380px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    animation: fadeInUp 0.35s ease;

    @media (max-width: 480px) {
      width: 95%;
      height: 85vh;
    }
  }

  @keyframes fadeInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* === HEADER === */
  .chat-header {
    background: linear-gradient(135deg, var(--blue1), var(--blue2));
    border: 1px solid var()(--blue1) ;
    color: #fff;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .chat-header strong {
    font-size: 1.05rem;
    text-transform: uppercase;
  }

  .close-btn {
    background: transparent;
    border: none;
    font-size: 1.4rem;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .close-btn:hover {
    opacity: 0.7;
  }

  /* === MENSAJES === */
  .chat-messages {
    flex: 1;
    padding: 14px;
    background: #f4f6f8;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .message {
    margin-bottom: 12px;
    padding: 10px 14px;
    border-radius: 16px;
    max-width: 80%;
    line-height: 1.5;
    word-wrap: break-word;
    white-space: pre-wrap;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .message.user {
    background: var(--blue2);
    color: #fff;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  .message.bot {
    background: var(--blue3);
    color: #2e2e2e;
    align-self: flex-start;
    border: 1px solid #d9d9d9;
    border-bottom-left-radius: 4px;
  }

  .message.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--blue1);
  }

  /* === RESPUESTAS RÁPIDAS === */
  .quick-replies {
    display: flex;
    gap: 8px;
    padding: 10px 12px;
    background: #e9ecef;
    flex-wrap: wrap;
    border-top: 1px solid #d6d6d6;
  }
  
  .quick-replies button {
    background: var(--blue2);
    border: none;
    border-radius: 20px;
    padding: 6px 14px;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 1px 1px 2px black ;
  }
  
  .quick-replies button:hover {
    box-shadow: none ;
    background: var(--blue3);
    transform: translateY(-1px);
    color: var(--blue1) ;
  }

  /* === INPUT === */
  .chat-input-area {
    display: flex;
    padding: 10px;
    border-top: 1px solid #e6e6e6;
    background: #fff;
  }

  .chat-input-area input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 14px;
    outline: none;
    transition: border 0.2s ease;
  }
  
  .chat-input-area input:focus {
    border-color: var(--blue1);
  }
  
  .chat-input-area button {
    background: var(--blue1);
    box-shadow: 1px 1px 2px black ;
    border: none;
    margin-left: 8px;
    padding: 8px 14px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    transition: background 0.25s ease, transform 0.1s ease;
  }
  
  .chat-input-area button:hover {
    box-shadow: none ;
    background: var(--blue3);
    color: var(--blue1) ;
  }
`;
