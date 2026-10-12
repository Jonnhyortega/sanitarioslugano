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
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
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
    width: 56px;
    height: 56px;
    border-radius: var(--radius);
    object-fit: cover;
  }

  p {
    margin-top: 16px;
    max-width: 280px;
    font-family: var(--font-serif);
    font-size: 18px;
    color: var(--white);
  }
`;

export const Social = styled.ul`
  li a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
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
