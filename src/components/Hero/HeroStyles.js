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

export const Grid = styled.div`
  display: grid;
  gap: 48px;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 72px;
  }
`;

export const Copy = styled.div`
  h1 {
    font-size: clamp(40px, 6vw, 64px);
    font-weight: 500;
  }

  p.lead {
    margin-top: 24px;
    max-width: 520px;
    font-size: 18px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
`;

export const Figure = styled.figure`
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

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: var(--radius);

    ${media.lg} {
      aspect-ratio: 4 / 5;
    }
  }
`;
