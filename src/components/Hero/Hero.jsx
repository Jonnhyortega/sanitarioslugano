import heroImg from "../../Imgs/HomeImgs/fondoHome.jpeg";
import { heroCtas } from "../../config/links";
import { Container } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { HeroSection, Grid, Copy, Actions, Figure } from "./HeroStyles";

export default function Hero() {
  const { primary, secondary } = heroCtas();

  return (
    <HeroSection id="inicio">
      <Container>
        <Grid>
          <Copy>
            <Eyebrow>Sanitarios Lugano · Villa Lugano, CABA</Eyebrow>
            <h1>Calidad y confianza en sanitarios desde 1989</h1>
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
          </Copy>
          <Reveal>
            <Figure>
              <img src={heroImg} alt="Local de Sanitarios Lugano" />
            </Figure>
          </Reveal>
        </Grid>
      </Container>
    </HeroSection>
  );
}
