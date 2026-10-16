import styled, { keyframes } from "styled-components";
import { media } from "../../styles/theme";

// Entrada al cargar. Se animan `translate` y `scale` (no `transform`) para que se sumen
// a los transforms ligados al scroll sin pisarse.
const rise = keyframes`
  from { opacity: 0; translate: 0 28px; }
  to { opacity: 1; translate: 0 0; }
`;

const wordUp = keyframes`
  from { translate: 0 110%; }
  to { translate: 0 0; }
`;

const curtain = keyframes`
  from { clip-path: inset(100% 0 0 0); }
  to { clip-path: inset(0 0 0 0); }
`;

const settle = keyframes`
  from { scale: 1.25; }
  to { scale: 1; }
`;

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ease = "cubic-bezier(0.2, 0.7, 0.1, 1)";

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

export const HeroSection = styled.section`
  background: var(--bone-50);
  padding: calc(var(--header-h) + 48px) 0 var(--section-y);
  scroll-margin-top: var(--header-h);

  /* --scene: 0 arriba de todo, 1 cuando el hero ya salió de pantalla. */
  --scene: 0;
  overflow: hidden;

  ${media.lg} {
    padding-top: calc(var(--header-h) + 72px);
  }

  @media (prefers-reduced-motion: no-preference) {
    .enter {
      animation: ${rise} 0.9s ${ease} both;
    }

    .lead {
      animation-delay: 0.55s;
    }

    .lead + * {
      animation-delay: 0.7s;
    }

    .word {
      display: inline-block;
      overflow: hidden;
      vertical-align: bottom;
      padding-bottom: 0.12em;
      margin-bottom: -0.12em;

      > span {
        display: inline-block;
        animation: ${wordUp} 1s ${ease} both;
        animation-delay: calc(0.12s + var(--d) * 0.07s);
      }
    }
  }
`;

// Franja superior: titular a la izquierda, bajada y botones a la derecha.
export const Grid = styled.div`
  display: grid;
  gap: 24px;

  ${media.lg} {
    grid-template-columns: 7fr 5fr;
    gap: 72px;
    align-items: end;
  }

  /* Al bajar, el texto sube más rápido que la página y se desvanece. */
  @media (prefers-reduced-motion: no-preference) {
    transform: translate3d(0, calc(var(--scene) * -140px), 0);
    opacity: calc(1 - var(--scene) * 1.8);
    will-change: transform, opacity;
  }
`;

export const Copy = styled.div`
  h1 {
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 500;
  }
`;

export const Aside = styled.div`
  p.lead {
    max-width: 480px;
    font-size: 18px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`;

// Franja inferior: la foto del local a todo el ancho, en formato apaisado.
export const Figure = styled.figure`
  margin-top: 48px;

  ${media.lg} {
    margin-top: 64px;
  }

  .frame {
    position: relative;
    margin: 0 12px 12px 0;

    &::after {
      content: "";
      position: absolute;
      inset: 12px -12px -12px 12px;
      border: 1px solid var(--navy-700);
      border-radius: var(--radius);
      pointer-events: none;
    }
  }

  .media {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-radius: var(--radius);
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: 50% 55%;

    ${media.md} {
      aspect-ratio: 16 / 9;
    }

    ${media.lg} {
      aspect-ratio: 21 / 9;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    /* Entrada: la foto se descubre de abajo hacia arriba mientras se asienta el zoom. */
    .media {
      animation: ${curtain} 1.3s ${ease} 0.35s both;
    }

    img {
      animation: ${settle} 1.9s ${ease} 0.35s both;
    }

    .frame::after {
      animation: ${fade} 0.8s ease 1.2s both;
    }

    figcaption {
      animation: ${rise} 0.9s ${ease} 1.05s both;
    }

    /* Scroll: la foto termina de abrirse, la imagen hace parallax dentro del marco
       y el marco de línea se separa como una capa más profunda. */
    .frame {
      transform: scale(calc(0.94 + 0.06 * min(1, var(--scene) * 4)));
      transform-origin: 50% 0;
      will-change: transform;

      &::after {
        transform: translate3d(calc(var(--scene) * 20px), calc(var(--scene) * 20px), 0);
      }
    }

    img {
      transform: translate3d(0, calc((var(--scene) - 0.3) * 14%), 0) scale(1.18);
      will-change: transform;
    }

    ${media.md} {
      figcaption {
        transform: translate3d(0, calc(var(--scene) * -90px), 0);
      }
    }
  }

  /* Tarjeta del local: debajo de la foto en mobile, apoyada sobre ella desde md. */
  figcaption {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 20px 24px;
    background: var(--white);
    border: 1px solid var(--line);
    border-top: 0;
    border-radius: 0 0 var(--radius) var(--radius);

    ${media.md} {
      position: absolute;
      left: 24px;
      bottom: 24px;
      max-width: 360px;
      border-top: 1px solid var(--line);
      border-left: 2px solid var(--sky-500);
      border-radius: var(--radius);
      box-shadow: 0 12px 32px rgba(20, 26, 54, 0.18);
    }

    p {
      margin-bottom: 4px;
    }

    strong {
      font-family: var(--font-serif);
      font-size: 20px;
      font-weight: 500;
      line-height: 1.3;
      color: var(--navy-900);
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      font-size: 14px;
      font-weight: 600;
      color: var(--navy-700);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    }
  }
`;
