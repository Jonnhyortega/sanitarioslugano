import { Fragment } from "react";
import { PiArrowRight } from "react-icons/pi";
import heroImg from "../../Imgs/HomeImgs/fondoHome.jpeg";
import { site } from "../../config/site";
import { heroCtas } from "../../config/links";
import { Container } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { HeroSection, Grid, Copy, Aside, Actions, Figure, SrOnly } from "./HeroStyles";

const title = "Calidad y confianza en sanitarios desde 1989";

export default function Hero() {
  const { primary, secondary } = heroCtas();
  const words = title.split(" ");

  return (
    <HeroSection id="inicio" data-scroll-scene>
      <Container>
        <Grid>
          <Copy>
            <Eyebrow className="enter">Sanitarios Lugano · Villa Lugano, CABA</Eyebrow>
            <h1>
              <SrOnly>{title}</SrOnly>
              {/* Cada palabra sube desde una máscara; los lectores de pantalla leen el título entero. */}
              {/* El espacio va fuera del inline-block: dentro, el navegador lo recorta. */}
              {words.map((word, i) => (
                <Fragment key={i}>
                  <span className="word" aria-hidden="true">
                    <span style={{ "--d": i }}>{word}</span>
                  </span>
                  {i < words.length - 1 && " "}
                </Fragment>
              ))}
            </h1>
          </Copy>
          <Aside>
            <p className="lead enter">
              Sanitarios, griferías y artículos de plomería para particulares y profesionales. Venta
              mayorista y minorista con asesoramiento personalizado.
            </p>
            <Actions className="enter">
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
            <div className="media">
              <img src={heroImg} alt="Frente del local de Sanitarios Lugano en Villa Lugano" />
            </div>
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
