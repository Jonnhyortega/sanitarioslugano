import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const WelcomeContainer = styled.section`
  display: ${({ show }) => (show ? "flex" : "none")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 4000;
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background-color: var(--blue1);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.8s ease-in-out;
  transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out;
`;

export const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  h2 {
    color: var(--blue2);
    font-weight: bold;
    font-size: 2.5em;
    text-transform: uppercase;
    letter-spacing: 4px;
  }

  img {
    width: 150px;
    height: auto;
    border-radius: 20px;
  }

  .links {
    display: flex;
    gap: 20px;

    a {
      font-size: 1.2em;
      font-weight: bold;
      text-decoration: none;
      color: white;
      background-color: var(--blue2);
      padding: 10px 20px;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;
      border: 1px solid transparent;
      &:hover {
        background-color: var(--blue1);
        color: white;
        transform: scale(1.05);
        border: 1px solid var(--blue2);
      }
    }
  }
`;
