import styled from "styled-components";
import { media } from "../../styles/theme";

export const HeroSection = styled.section`
  background: var(--bone-50);
  padding: calc(var(--header-h) + 48px) 0 var(--section-y);
  scroll-margin-top: var(--header-h);

  ${media.lg} {
    padding-top: calc(var(--header-h) + 72px);
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

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: 50% 55%;
    border-radius: var(--radius);

    ${media.md} {
      aspect-ratio: 16 / 9;
    }

    ${media.lg} {
      aspect-ratio: 21 / 9;
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
