import styled from "styled-components";
import { media } from "../../styles/theme";

export const FooterContainer = styled.footer`
  background: var(--navy-950);
  color: var(--stone-400);
  font-size: 15px;
  padding-top: 72px;

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--white);
    }
  }
`;

export const Columns = styled.div`
  display: grid;
  gap: 40px;
  padding-bottom: 56px;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: 1.3fr 0.9fr 1.2fr 1.1fr;
  }

  h3 {
    margin-bottom: 16px;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--white);
  }

  ul {
    list-style: none;
    display: grid;
    gap: 10px;
  }
`;

export const BrandCol = styled.div`
  img {
    width: 112px;
    height: auto;
    /* Logo blanco sin fondo: la sombra lo despega del azul oscuro. */
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.55)) drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45))
      drop-shadow(0 0 22px rgba(58, 165, 219, 0.28));
  }

  p {
    margin-top: 16px;
    max-width: 280px;
    font-family: var(--font-serif);
    font-size: 18px;
    color: var(--white);
  }
`;

export const ContactList = styled.ul`
  li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 10px;
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
    padding: 12px 14px;
    border: 1px solid var(--line-light);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.03);
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
  /* && le gana al "ul" genérico de Columns. */
  && {
    display: flex;
    gap: 10px;
    margin-top: 24px;
  }

  a {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid var(--line-light);
    border-radius: 50%;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;

    &:hover {
      border-color: var(--sky-500);
      background: var(--sky-500);
    }
  }

  svg {
    font-size: 18px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* Deja lugar al botón flotante del chat. */
  padding: 24px 0 96px;
  border-top: 1px solid var(--line-light);
  font-size: 13px;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    padding: 24px 80px 32px 0;
  }

  a {
    color: var(--white);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
