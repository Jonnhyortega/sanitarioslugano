import React, { useState, useEffect } from "react";
import { NavContainer } from "./NavigateStyles";
import logo from "../../Imgs/LogoBlue.jpeg";

const Navigate = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavContainer $scrolled={scrolled}>
      <img src={logo} alt="Logo empresa" />
      <nav>
        <a href="#home">Inicio</a>
        <a href="#about">Nosotros</a>
        <a href="#products">Productos</a>
        <a href="#contact">Contacto</a>
      </nav>
    </NavContainer>
  );
};

export default Navigate;
