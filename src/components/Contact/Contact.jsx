import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { PiMapPin, PiStar, PiStorefront } from "react-icons/pi";
import { site } from "../../config/site";
import { contactLinks, whatsappLink } from "../../config/links";
import { Section, Container } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { Grid, Details, Actions, Map } from "./ContactStyles";

const icons = {
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  maps: PiMapPin,
  reviews: PiStar,
  store: PiStorefront,
};

export default function Contact() {
  return (
    <Section id="contacto" $tone="navy">
      <Container>
        <Grid>
          <div data-scroll="left">
            <Eyebrow $light>Contacto</Eyebrow>
            <h2>Visitanos o escribinos</h2>
            <Details>
              <div>
                <dt>Dirección</dt>
                <dd>{site.address}</dd>
              </div>
              <div>
                <dt>Horarios</dt>
                <dd>
                  <ul>
                    {site.hours.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    {site.whatsappDisplay}
                  </a>
                </dd>
              </div>
            </Details>
            <Actions>
              {contactLinks().map(({ key, label, href }) => {
                const Icon = icons[key];
                return (
                  <Button
                    key={key}
                    href={href}
                    external
                    variant={key === "whatsapp" ? "light" : "outlineLight"}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </Button>
                );
              })}
            </Actions>
          </div>
          <Map
            data-scroll="curtain"
            src={site.mapsEmbed}
            title="Ubicación de Sanitarios Lugano en Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
      </Container>
    </Section>
  );
}
