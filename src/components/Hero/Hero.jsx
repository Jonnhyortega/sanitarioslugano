import { PiArrowRight } from "react-icons/pi";
import heroImg from "../../Imgs/HomeImgs/fondoHome.jpeg";
import { site } from "../../config/site";
import { heroCtas } from "../../config/links";
import { Container } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { HeroSection, Grid, Copy, Aside, Actions, Figure } from "./HeroStyles";

export default function Hero() {
  const { primary, secondary } = heroCtas();

  return (
    <HeroSection id="inicio">
      <Container>
        <Grid>
          <Copy>
            <Eyebrow>Sanitarios Lugano · Villa Lugano, CABA</Eyebrow>
            <h1>Calidad y confianza en sanitarios desde 1989</h1>
          </Copy>
          <Aside>
            <p className="lead">
              Sanitarios, griferías y artículos de plomería para particulares y profesionales. Venta
              mayorista y minorista con asesoramiento personalizado.
            </p>
            <Actions>
              <Button href={primary.href} external={primary.external}>
                {primary.label}
              </Button>
              <Button href={secondary.href} external={secondary.external} variant="secondary">
                {secondary.label}
              </Button>
            </Actions>
          </Aside>
        </Grid>
        <Figure>
          <div className="frame">
            <img src={heroImg} alt="Frente del local de Sanitarios Lugano en Villa Lugano" />
            <figcaption>
              <Eyebrow as="p">Nuestro local</Eyebrow>
              <strong>{site.address}</strong>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Cómo llegar <PiArrowRight aria-hidden="true" />
              </a>
            </figcaption>
          </div>
        </Figure>
      </Container>
    </HeroSection>
  );
}
