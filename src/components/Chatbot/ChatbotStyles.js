import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { transform: translateY(16px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const ChatbotContainer = styled.section`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1100;
  font-family: var(--font-sans);

  .chat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 50%;
    background: var(--navy-700);
    color: var(--white);
    font-size: 28px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(20, 26, 54, 0.25);
    transition: background-color 0.2s ease;

    &:hover {
      background: var(--navy-900);
    }
  }

  .overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    background: rgba(20, 26, 54, 0.35);
  }

  .chat-window {
    display: flex;
    flex-direction: column;
    width: 380px;
    height: min(75vh, 640px);
    margin: 20px;
    overflow: hidden;
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 4px;
    box-shadow: 0 12px 32px rgba(20, 26, 54, 0.25);

    @media (prefers-reduced-motion: no-preference) {
      animation: ${fadeInUp} 0.3s ease;
    }

    @media (max-width: 480px) {
      width: calc(100% - 24px);
      height: 85vh;
      margin: 12px;
    }
  }

  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: var(--navy-700);
    color: var(--white);

    strong {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 500;
    }
  }

  .close-btn {
    display: flex;
    border: none;
    background: none;
    color: var(--white);
    font-size: 22px;
    cursor: pointer;
  }

  .chat-messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    overflow-y: auto;
    background: var(--white);
  }

  .message {
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .message.bot {
    align-self: flex-start;
    background: var(--bone-50);
    color: var(--ink-700);
  }

  .message.user {
    align-self: flex-end;
    background: var(--navy-700);
    color: var(--white);
  }

  .quick-replies {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 10px 16px;
    border-top: 1px solid var(--line);

    button {
      padding: 6px 10px;
      border: 1px solid var(--line);
      border-radius: 3px;
      background: var(--white);
      color: var(--navy-700);
      font: inherit;
      font-size: 13px;
      cursor: pointer;

      &:hover {
        border-color: var(--navy-700);
      }
    }
  }

  .chat-input-area {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--line);

    input {
      flex: 1;
      min-width: 0;
      padding: 10px 12px;
      border: 1px solid var(--line);
      border-radius: 3px;
      font: inherit;
      font-size: 14px;
      color: var(--ink-700);

      &:focus {
        border-color: var(--navy-700);
        outline: none;
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      border: none;
      border-radius: 3px;
      background: var(--navy-700);
      color: var(--white);
      font-size: 18px;
      cursor: pointer;
    }
  }
`;
