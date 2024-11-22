import React from "react";
import {
  FooterContainer,
  FooterContent,
  FooterLink,
  FooterCopyright,
} from "./FooterStyles";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaRegUser } from "react-icons/fa";

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLink
          href="https://www.instagram.com/sanitarios_lugano/"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </FooterLink>
        <FooterLink
          href="https://api.whatsapp.com/send?phone=541171020921&text=%C2%A1Hola!%20Estoy%20en%20la%20tienda%20SANITARIOSLUGANO%20y%20quiero%20pedir%20m%C3%A1s%20informaci%C3%B3n."
          target="_blank"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={24} />
        </FooterLink>
        <FooterLink
          href="https://www.google.com/maps/place/Sanitarios+Lugano/@-34.6794643,-58.4751984,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcc952380eab39:0xed8b413f1afdb5c4!8m2!3d-34.6794687!4d-58.4726235!16s%2Fg%2F1ydphgm5p?entry=tts&g_ep=EgoyMDI0MTExOS4yIPu8ASoASAFQAw%3D%3D"
          target="_blank"
          aria-label="Ubicación"
        >
          <FaMapMarkerAlt size={24} />
        </FooterLink>
        <FooterLink
          href="https://www.instagram.com/astralvisionco"
          target="_blank"
          aria-label="Creador"
        >
          <FaRegUser size={24} />
        </FooterLink>
      </FooterContent>
      <FooterCopyright>
        © {new Date().getFullYear()} Sanitarios Lugano. Todos los derechos
        reservados.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
