import React, { useState } from "react";
import { WelcomeContainer, Content } from "./WelcomeToPageStyles";
import logo from "../../Imgs/LogoBlue.jpeg";

export const WelcomeToPage = ({ onSiteClick }) => {
  const [showWelcome, setShow] = useState(true);

  const handleShowWelcome = () => {
    setShow(false);
    onSiteClick();
  };

  return (
    <WelcomeContainer show={showWelcome}>
      <Content>
        <img src={logo} alt="Logo Sanitarios" />
        <h2>Bienvenido</h2>
        <div className="links">
          <a
            href="https://sanitarioslugano.mercadoshops.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir a tienda
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              handleShowWelcome();
            }}
            href="#"
          >
            Sitio web
          </a>
        </div>
      </Content>
    </WelcomeContainer>
  );
};
