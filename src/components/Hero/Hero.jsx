import { Fragment } from "react";
import { PiArrowRight } from "react-icons/pi";
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
              {/* Imagen LCP: servida desde /public para precargarla en index.html con el mismo srcset. */}
              <img
                src="/img/local-1024.webp"
                srcSet="/img/local-640.webp 640w, /img/local-1024.webp 1024w, /img/local-1280.webp 1280w"
                sizes="(min-width: 1248px) 1200px, calc(100vw - 44px)"
                width="1280"
                height="720"
                // React 18 no conoce fetchPriority: en minúsculas llega tal cual al HTML.
                // eslint-disable-next-line react/no-unknown-property
                fetchpriority="high"
                decoding="async"
                alt="Frente del local de Sanitarios Lugano en Villa Lugano"
              />
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
