import React from "react";
import { FaWhatsapp, FaInstagram, FaMapMarkedAlt } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import {
  ContactContainer,
  ContactLink,
  Title,
  ContactIconsWrapper,
} from "./ContactStyles";

const Contact = () => {
  return (
    <ContactContainer id="contact">
      <Title>Contacto</Title>
      <ContactIconsWrapper>
        <ContactLink
          href="https://api.whatsapp.com/send?phone=541171020921&text=%C2%A1Hola!%20Estoy%20en%20la%20tienda%20SANITARIOSLUGANO%20y%20quiero%20pedir%20m%C3%A1s%20informaci%C3%B3n."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp"
        >
          <FaWhatsapp />
          <span>WhatsApp</span>
        </ContactLink>
        <ContactLink
          href="https://www.instagram.com/sanitarios_lugano/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram"
        >
          <FaInstagram />
          <span>Instagram</span>
        </ContactLink>
        <ContactLink
          href="https://sanitarioslugano.mercadoshops.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
          className="store"
        >
          <IoStorefront />
          <span>Tienda</span>
        </ContactLink>
        <ContactLink
          href="https://maps.app.goo.gl/ZUzs49kHoFAYtVyw8"
          target="_blank"
          rel="noopener noreferrer"
          className="maps"
        >
          <FaMapMarkedAlt />
          <span>Google Maps</span>
        </ContactLink>
        <ContactLink
          href="https://maps.app.goo.gl/TPgrML6tCy1f841N7"
          target="_blank"
          rel="noopener noreferrer"
          className="references"
        >
          <FaMapMarkedAlt />
          <span>Referencias</span>
        </ContactLink>
      </ContactIconsWrapper>
    </ContactContainer>
  );
};

export default Contact;
