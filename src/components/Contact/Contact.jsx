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
        {/* <ContactLink
          href="https://sanitarioslugano.mercadoshops.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
          className="store"
        >
          <IoStorefront />
          <span>Tienda</span>
        </ContactLink> */}
        
        <ContactLink
          href="https://maps.app.goo.gl/ZUzs49kHoFAYtVyw8"
          target="_blank"
          rel="noopener noreferrer"
          className="maps"
        >
          <FaMapMarkedAlt />
          <span>Ubicación</span>
        </ContactLink>
        <ContactLink
          href="https://www.google.com/maps/place/Sanitarios+Lugano/@-34.6794643,-58.4751984,17z/data=!4m8!3m7!1s0x95bcc952380eab39:0xed8b413f1afdb5c4!8m2!3d-34.6794687!4d-58.4726235!9m1!1b1!16s%2Fg%2F1ydphgm5p?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
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
