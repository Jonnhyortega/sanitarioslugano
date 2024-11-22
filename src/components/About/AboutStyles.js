import styled, { keyframes } from "styled-components";
import img from "../../Imgs/HomeImgs/fondoHome.jpeg";

// Animación de entrada
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100px;
  }
`;

export const AboutContainer = styled.section`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
    url(${img}) no-repeat center/cover fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextContent = styled.div`
  color: white;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    font-family: var(--funnel);
    line-height: 1.2;
    margin-bottom: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  }

  p {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 30px;
    color: #f1f1f1;
  }

  a {
    font-size: 1.2rem;
    text-decoration: none;
    background: var(--blue2);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);

    &:hover {
      background: var(--blue1);
      transform: scale(1.1);
      box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.7);
    }
  }
`;

export const DecorativeBar = styled.div`
  height: 5px;
  width: 100px;
  background: var(--blue2);
  margin: 0 auto 20px auto;
  animation: ${slideIn} 1s ease-in-out;
`;
