import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiMapPin, PiClock } from "react-icons/pi";
import logo from "../../Imgs/LogoFooter.webp";
import { site } from "../../config/site";
import { navItems, whatsappLink } from "../../config/links";
import { Container } from "../ui/Section";
import {
  FooterContainer,
  Columns,
  BrandCol,
  ContactList,
  Hours,
  Social,
  Bottom,
} from "./FooterStyles";

const ext = { target: "_blank", rel: "noopener noreferrer" };

// "Lunes a sábados: 7:00 a 19:00 hs" → ["Lunes a sábados", "7:00 a 19:00 hs"]
const splitHour = (h) => {
  const i = h.indexOf(":");
  return i > 0 && /\d/.test(h.slice(i + 1)) ? [h.slice(0, i), h.slice(i + 1).trim()] : [h, ""];
};

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Columns>
          <BrandCol>
            <img src={logo} alt="Sanitarios Lugano" width="134" height="140" loading="lazy" />
            <p>Calidad y confianza desde {site.founded}.</p>
            <Social aria-label="Redes">
              <li>
                <a href={site.instagram} aria-label="Instagram" {...ext}>
                  <FaInstagram aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={whatsappLink()} aria-label="WhatsApp" {...ext}>
                  <FaWhatsapp aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={site.mapsUrl} aria-label="Google Maps" {...ext}>
                  <PiMapPin aria-hidden="true" />
                </a>
              </li>
            </Social>
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
            <ContactList>
              <li>
                <PiMapPin aria-hidden="true" />
                <a href={site.mapsUrl} {...ext}>
                  {site.address}
                </a>
              </li>
              <li>
                <FaWhatsapp aria-hidden="true" />
                <a href={whatsappLink()} {...ext}>
                  {site.whatsappDisplay}
                </a>
              </li>
            </ContactList>
          </div>

          <div>
            <h3>Horarios</h3>
            <Hours>
              {site.hours.map((h) => {
                const [days, time] = splitHour(h);
                return (
                  <div key={h}>
                    <dt>
                      <PiClock aria-hidden="true" /> {days}
                    </dt>
                    {time && <dd>{time}</dd>}
                  </div>
                );
              })}
            </Hours>
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
