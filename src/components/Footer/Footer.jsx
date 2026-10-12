import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import logo from "../../Imgs/LogoWhite.jpeg";
import { site } from "../../config/site";
import { navItems, whatsappLink } from "../../config/links";
import { Container } from "../ui/Section";
import { FooterContainer, Columns, BrandCol, Social, Bottom } from "./FooterStyles";

const ext = { target: "_blank", rel: "noopener noreferrer" };

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Columns>
          <BrandCol>
            <img src={logo} alt="Sanitarios Lugano" />
            <p>Calidad y confianza desde {site.founded}.</p>
          </BrandCol>

          <nav aria-label="Pie de página">
            <h3>Navegación</h3>
            <ul>
              {navItems().map((item) => (
                <li key={item.href}>
                  <a href={item.href} {...(item.external ? ext : {})}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3>Contacto</h3>
            <ul>
              <li>{site.address}</li>
              {site.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
              <li>
                <a href={whatsappLink()} {...ext}>
                  {site.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Redes</h3>
            <Social>
              <li>
                <a href={site.instagram} {...ext}>
                  <FaInstagram aria-hidden="true" /> Instagram
                </a>
              </li>
              <li>
                <a href={whatsappLink()} {...ext}>
                  <FaWhatsapp aria-hidden="true" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={site.mapsUrl} {...ext}>
                  <PiMapPin aria-hidden="true" /> Google Maps
                </a>
              </li>
            </Social>
          </div>
        </Columns>

        <Bottom>
          <span>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </span>
          <span>
            Desarrollado por{" "}
            <a href={site.developer.url} {...ext}>
              {site.developer.name}
            </a>
          </span>
        </Bottom>
      </Container>
    </FooterContainer>
  );
}
