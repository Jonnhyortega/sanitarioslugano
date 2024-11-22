import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  NavContainer,
  NavMobileContainer,
  MobileMenuButton,
  MobileNavMenu,
} from "./NavigateStyles";
import logo from "../../Imgs/LogoBlue.jpeg";

const Navigate = () => {
  const [scrolled, setScrolled] = useState(false);
  const [select, setSelected] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSelect = (elementToSelect) => {
    setSelected(elementToSelect);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        setScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleSmoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <NavContainer $scrolled={scrolled}>
        <img src={logo} alt="Logo empresa" />
        <nav>
          <a
            onClick={(e) => {
              handleSelect("inicio");
              handleSmoothScroll(e);
            }}
            style={{
              borderBottom:
                select === "inicio"
                  ? "2px solid var(--blue2)"
                  : "2px solid var(--blue1)",
            }}
            href="#home"
          >
            Inicio
          </a>
          <a
            onClick={(e) => {
              handleSelect("about");
              handleSmoothScroll(e);
            }}
            style={{
              borderBottom:
                select === "about"
                  ? "2px solid var(--blue2)"
                  : "2px solid var(--blue1)",
            }}
            href="#us"
          >
            Nosotros
          </a>
          <a
            onClick={(e) => {
              handleSelect("products");
              handleSmoothScroll(e);
            }}
            style={{
              borderBottom:
                select === "products"
                  ? "2px solid var(--blue2)"
                  : "2px solid var(--blue1)",
            }}
            href="#products"
          >
            Productos
          </a>
          <a
            onClick={(e) => {
              handleSelect("contact");
              handleSmoothScroll(e);
            }}
            style={{
              borderBottom:
                select === "contact"
                  ? "2px solid var(--blue2)"
                  : "2px solid var(--blue1)",
            }}
            href="#contact"
          >
            Contacto
          </a>
        </nav>
      </NavContainer>

      <NavMobileContainer>
        <img src={logo} alt="Logo empresa" />
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        <MobileNavMenu $mobileMenuOpen={mobileMenuOpen}>
          <a
            onClick={(e) => {
              handleSelect("inicio");
              handleSmoothScroll(e);
            }}
            style={{
              borderBottom:
                select === "inicio"
                  ? "10px solid white"
                  : "10px solid transparent",
            }}
            href="#home"
          >
            Inicio
          </a>
          <a
            onClick={(e) => {
              handleSelect("about");
              handleSmoothScroll(e);
            }}
            style={{
              borderBottom:
                select === "about"
                  ? "10px solid white"
                  : "10px solid transparent",
            }}
            href="#us"
          >
            Nosotros
          </a>
          <a
            onClick={(e) => {
              handleSelect("products");
              handleSmoothScroll(e);
            }}
            style={{
              borderBottom:
                select === "products"
                  ? "10px solid white"
                  : "10px solid transparent",
            }}
            href="#products"
          >
            Productos
          </a>
          <a
            onClick={(e) => {
              handleSelect("contact");
              handleSmoothScroll(e);
            }}
            style={{
              borderBottom:
                select === "contact"
                  ? "10px solid white"
                  : "10px solid transparent",
            }}
            href="#contact"
          >
            Contacto
          </a>
        </MobileNavMenu>
      </NavMobileContainer>
    </>
  );
};

export default Navigate;
