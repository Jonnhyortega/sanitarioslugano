import styled from "styled-components";
import { media } from "../../styles/theme";

export const FooterContainer = styled.footer`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--navy-950);
  color: var(--stone-400);
  font-size: 15px;
  padding-top: 72px;

  /* Filete superior: el celeste de la marca se desvanece hacia los bordes. */
  &::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--sky-500) 50%, transparent);
    opacity: 0.6;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--white);
    }
  }
`;

export const Glow = styled.div`
  position: absolute;
  z-index: -1;
  top: -240px;
  left: 50%;
  width: min(1100px, 140vw);
  height: 520px;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, rgba(58, 165, 219, 0.16), transparent);
  pointer-events: none;
`;

/* Banda destacada: tienda online (o presupuesto). Las esquinas marcadas remiten a un plano. */
export const Band = styled.section`
  position: relative;
  display: grid;
  gap: 28px;
  margin-bottom: 72px;
  padding: 36px 24px;
  border: 1px solid var(--line-light);
  border-radius: var(--radius);
  background: linear-gradient(135deg, rgba(36, 47, 92, 0.75), rgba(27, 35, 71, 0.35) 60%, transparent),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 48px);

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border: solid var(--sky-500);
  }

  &::before {
    top: -1px;
    left: -1px;
    border-width: 2px 0 0 2px;
  }

  &::after {
    right: -1px;
    bottom: -1px;
    border-width: 0 2px 2px 0;
  }

  ${media.md} {
    padding: 48px;
  }

  ${media.lg} {
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 40px;
    padding: 52px 56px;
  }

  p:not([class]) {
    max-width: 520px;
    margin-top: 14px;
    font-size: 16px;
  }

  h2 {
    max-width: 620px;
    font-size: clamp(28px, 3.4vw, 40px);
    color: var(--white);
  }

  h2 span {
    color: var(--sky-500);
  }

  /* El Eyebrow es un <p> con clase: le quitamos el margen extra dentro de la banda. */
  p[class] {
    margin-bottom: 14px;
  }
`;

export const BandIcon = styled.span`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border: 1px solid var(--line-light);
  border-radius: 50%;
  background: rgba(58, 165, 219, 0.12);
  color: var(--sky-500);
  font-size: 30px;
  box-shadow: 0 0 0 8px rgba(58, 165, 219, 0.05);

  ${media.lg} {
    width: 88px;
    height: 88px;
    font-size: 40px;
    box-shadow: 0 0 0 12px rgba(58, 165, 219, 0.05);
  }
`;

export const BandActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  ${media.lg} {
    flex-direction: column;
    align-items: stretch;
  }

  && a {
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.2s ease;
  }

  && a:hover {
    transform: translateY(-2px);
  }

  /* El "a { color: inherit }" del footer le gana al Button: se reponen sus colores. */
  && a:first-child,
  && a:first-child:hover {
    color: var(--navy-900);
  }

  && a:nth-child(2) {
    color: var(--white);
  }

  && a:first-child svg:last-child {
    transition: transform 0.2s ease;
  }

  && a:first-child:hover svg:last-child {
    transform: translate(2px, -2px);
  }
`;

export const Columns = styled.div`
  display: grid;
  gap: 44px;
  padding-bottom: 56px;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: 1.2fr 0.9fr 1.2fr 1.1fr;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--white);

    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, var(--line-light), transparent);
    }
  }

  ul {
    list-style: none;
  }
`;

export const BrandCol = styled.div`
  img {
    width: 104px;
    height: auto;
    /* Logo blanco sin fondo: la sombra lo despega del azul oscuro. */
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.55)) drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45))
      drop-shadow(0 0 22px rgba(58, 165, 219, 0.28));
  }

  p {
    margin-top: 16px;
    max-width: 260px;
    font-family: var(--font-serif);
    font-size: 19px;
    line-height: 1.35;
    color: var(--white);
  }
`;

export const Since = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line-light);

  strong {
    font-family: var(--font-serif);
    font-size: 44px;
    font-weight: 500;
    line-height: 1;
    color: var(--sky-500);
  }

  span {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    line-height: 1.5;
    text-transform: uppercase;
  }
`;

export const NavList = styled.ul`
  display: grid;
  gap: 4px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  }

  /* La flecha aparece y se desliza al pasar el mouse. */
  a > svg {
    font-size: 14px;
    color: var(--sky-500);
    opacity: 0;
    transform: translate(-6px, 2px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  a:hover > svg,
  a:focus-visible > svg {
    opacity: 1;
    transform: translate(0, 0);
  }

  /* El link a la tienda siempre muestra su flecha: es el que sale del sitio. */
  a[target] {
    color: var(--white);
  }

  a[target] > svg {
    opacity: 1;
    transform: none;
  }
`;

export const New = styled.span`
  padding: 2px 7px;
  border-radius: 999px;
  background: var(--sky-500);
  color: var(--navy-950);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.5;
  text-transform: uppercase;
`;

export const ContactList = styled.ul`
  display: grid;
  gap: 14px;

  li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 12px;
    align-items: start;
  }

  svg {
    margin-top: 3px;
    font-size: 18px;
    color: var(--sky-500);
  }
`;

export const Hours = styled.dl`
  display: grid;
  gap: 12px;

  div {
    position: relative;
    padding: 14px 16px 14px 18px;
    border: 1px solid var(--line-light);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.03);
    transition: border-color 0.2s ease, background 0.2s ease;

    /* Acento vertical celeste, como en la línea de los eyebrows. */
    &::before {
      content: "";
      position: absolute;
      top: 14px;
      bottom: 14px;
      left: -1px;
      width: 2px;
      background: var(--sky-500);
    }

    &:hover {
      border-color: rgba(58, 165, 219, 0.45);
      background: rgba(58, 165, 219, 0.06);
    }
  }

  dt {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  dt svg {
    font-size: 16px;
    color: var(--sky-500);
  }

  dd {
    margin-top: 4px;
    font-family: var(--font-serif);
    font-size: 20px;
    color: var(--white);
  }
`;

export const Social = styled.ul`
  display: flex;
  gap: 10px;
  margin-top: 24px;

  a {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border: 1px solid var(--line-light);
    border-radius: 50%;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

    &:hover {
      border-color: var(--sky-500);
      background: var(--sky-500);
      transform: translateY(-2px);
    }
  }

  svg {
    font-size: 18px;
  }
`;

/* Firma tipográfica gigante, apenas insinuada sobre el fondo. */
export const Wordmark = styled.p`
  margin: 0 0 -0.18em;
  font-family: var(--font-serif);
  font-size: clamp(28px, 10.4vw, 146px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.03em;
  white-space: nowrap;
  text-align: center;
  user-select: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.02) 85%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Bottom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* Deja lugar al botón flotante del chat. */
  padding: 24px 0 96px;
  border-top: 1px solid var(--line-light);
  font-size: 13px;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 24px 80px 32px 0;
  }

  > span a {
    color: var(--white);
    text-decoration: underline;
    text-decoration-color: rgba(58, 165, 219, 0.6);
    text-underline-offset: 3px;
  }
`;

export const ToTop = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 11px;

  svg {
    display: grid;
    width: 30px;
    height: 30px;
    padding: 7px;
    border: 1px solid var(--line-light);
    border-radius: 50%;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  &:hover svg {
    transform: translateY(-3px);
    border-color: var(--sky-500);
    background: var(--sky-500);
  }

  ${media.md} {
    order: 3;
  }
`;
