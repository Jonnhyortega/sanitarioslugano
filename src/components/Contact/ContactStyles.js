import styled from "styled-components";

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--blue1);
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const ContactIconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 1.25rem;
  color: var(--blue1); /* Color original del texto */
  text-decoration: none;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ className }) => {
      if (className.includes("whatsapp")) return "#25d366"; 
      if (className.includes("instagram")) return "#e4405f"; 
      if (className.includes("store")) return "#ff9f00"; 
      if (className.includes("maps")) return "#34b7f1"; 
      if (className.includes("references")) return "#ff3b30"; 
      return "#ccc";
    }};
    color: #fff; 
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &.whatsapp {
    border-left: 5px solid #25d366;
  }

  &.instagram {
    border-left: 5px solid #e4405f;
  }

  &.store {
    border-left: 5px solid #ff9f00;
  }

  &.maps {
    border-left: 5px solid #34b7f1;
  }

  &.references {
    border-left: 5px solid #ff3b30;
  }

  span {
    font-weight: bold;
  }
`;
