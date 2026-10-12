import { PiArrowRight } from "react-icons/pi";
import { professionals } from "../../data/professionals";
import { whatsappLink } from "../../config/links";
import { Section, Container, SectionHeader } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import { Cards, Card } from "./ProfessionalsStyles";

export default function Professionals() {
  return (
    <Section id="profesionales" $tone="white">
      <Container>
        <SectionHeader data-scroll>
          <Eyebrow>Soluciones para profesionales</Eyebrow>
          <h2>Acompañamos cada proyecto</h2>
          <p>
            Precios mayoristas, stock de marcas líderes y asesoramiento técnico para quienes construyen
            y reforman todos los días.
          </p>
        </SectionHeader>
        <Cards>
          {professionals.map(({ id, title, text, icon: Icon, message }) => (
            <Card key={id} data-scroll="card">
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
                Consultar <PiArrowRight aria-hidden="true" />
              </a>
            </Card>
          ))}
        </Cards>
      </Container>
    </Section>
  );
}
