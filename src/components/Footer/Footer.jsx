import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiMapPin, PiClock, PiArrowUpRight, PiArrowUp, PiStorefront } from "react-icons/pi";
import logo from "../../Imgs/LogoFooter.webp";
import { site } from "../../config/site";
import { navItems, whatsappLink, visibleHours, footerCta, budgetLink } from "../../config/links";
import { Container } from "../ui/Section";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import {
  FooterContainer,
  Glow,
  Band,
  BandIcon,
  BandActions,
  Columns,
  BrandCol,
  Since,
  NavList,
  New,
  ContactList,
  Hours,
  Social,
  Wordmark,
  Bottom,
  ToTop,
} from "./FooterStyles";

const ext = { target: "_blank", rel: "noopener noreferrer" };

// "Lunes a sábados: 7:00 a 19:00 hs" → ["Lunes a sábados", "7:00 a 19:00 hs"]
const splitHour = (h) => {
  const i = h.indexOf(":");
  return i > 0 && /\d/.test(h.slice(i + 1)) ? [h.slice(0, i), h.slice(i + 1).trim()] : [h, ""];
};

export default function Footer() {
  const cta = footerCta();
  const isStore = cta.kind === "store";

  return (
    <FooterContainer>
      <Glow aria-hidden="true" />
      <Container>
        <Band aria-labelledby="footer-cta">
          <BandIcon aria-hidden="true">{isStore ? <PiStorefront /> : <FaWhatsapp />}</BandIcon>
          <div>
            <Eyebrow $light>{cta.eyebrow}</Eyebrow>
            <h2 id="footer-cta">
              {cta.title} <span>{cta.accent}</span>
            </h2>
            <p>{cta.text}</p>
          </div>
          <BandActions>
            <Button href={cta.href} variant="light" external>
              {cta.label} <PiArrowUpRight aria-hidden="true" />
            </Button>
            {isStore && (
              <Button href={budgetLink()} variant="outlineLight" external>
                <FaWhatsapp aria-hidden="true" /> Pedir presupuesto
              </Button>
            )}
          </BandActions>
        </Band>

        <Columns>
          <BrandCol>
            <img src={logo} alt="Sanitarios Lugano" width="134" height="140" loading="lazy" />
            <p>Calidad y confianza desde {site.founded}.</p>
            <Since>
              <strong>{new Date().getFullYear() - site.founded}</strong>
              <span>
                años en
                <br />
                Villa Lugano
              </span>
            </Since>
          </BrandCol>

          <nav aria-label="Pie de página">
            <h3>Navegación</h3>
            <NavList>
              {navItems().map((item) => (
                <li key={item.href}>
                  <a href={item.href} {...(item.external ? ext : {})}>
                    {item.label}
                    {item.external && <New>Nuevo</New>}
                    <PiArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </NavList>
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
          </div>

          <div>
            <h3>Horarios</h3>
            <Hours>
              {visibleHours().map((h) => {
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

        <Wordmark aria-hidden="true">{site.name}</Wordmark>

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
          <ToTop href="#inicio">
            Volver arriba <PiArrowUp aria-hidden="true" />
          </ToTop>
        </Bottom>
      </Container>
    </FooterContainer>
  );
}
