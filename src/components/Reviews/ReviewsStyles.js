import styled from "styled-components";
import { media } from "../../styles/theme";

const gap = "20px";

export const Header = styled.header`
  max-width: 720px;
  margin: 0 auto 40px;
  text-align: center;

  h2 {
    font-size: clamp(32px, 4.6vw, 52px);
  }

  em {
    font-style: italic;
    color: var(--sky-500);
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px 28px;
  margin-bottom: 48px;

  p {
    margin-top: 6px;
    font-size: 13px;
    color: var(--ink-700);
  }

  strong {
    color: var(--navy-900);
  }
`;

export const Score = styled.span`
  font-family: var(--font-serif);
  font-size: clamp(64px, 8vw, 88px);
  line-height: 1;
  color: var(--navy-900);
`;

export const Stars = styled.span`
  display: inline-flex;
  gap: 2px;
  font-size: 18px;
  color: #f5b301;

  [data-off] {
    color: var(--line);
  }
`;

export const Divider = styled.span`
  width: 1px;
  height: 48px;
  background: var(--line);

  @media (max-width: 599px) {
    display: none;
  }
`;

export const GoogleMark = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 28px;
  }

  span {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 1.3;
  }

  strong {
    font-size: 15px;
  }
`;

export const Carousel = styled.div`
  position: relative;
`;

export const Track = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  column-gap: ${gap};
  /* Lugar arriba para el avatar que sobresale de la tarjeta. */
  padding: 30px 2px 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  overscroll-behavior-x: contain;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid var(--sky-500);
    outline-offset: 4px;
  }

  ${media.sm} {
    grid-auto-columns: calc((100% - ${gap}) / 2);
  }

  ${media.lg} {
    grid-auto-columns: calc((100% - ${gap} * 2) / 3);
  }
`;

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 28px 28px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--white);
  text-align: center;
  scroll-snap-align: start;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: var(--sky-500);
    box-shadow: 0 12px 32px -18px rgba(27, 35, 71, 0.35);
  }

  h3 {
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: 600;
  }

  time {
    margin-top: 2px;
    font-size: 13px;
    color: var(--stone-400);
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 12px 0 14px;

    > svg {
      font-size: 18px;
      color: #4285f4;
    }
  }
`;

export const Avatar = styled.span`
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border: 3px solid var(--white);
  border-radius: 50%;
  background: var(--navy-700);
  color: var(--white);
  font-size: 18px;
  font-weight: 600;

  svg {
    position: absolute;
    right: -4px;
    bottom: -4px;
    width: 22px;
    height: 22px;
    padding: 2px;
    border-radius: 50%;
    background: var(--white);
  }
`;

export const Body = styled.p`
  font-size: 15px;
  color: var(--ink-700);

  ${({ $clamped }) =>
    $clamped &&
    `
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

export const More = styled.button`
  margin-top: 10px;
  border: 0;
  background: none;
  font: inherit;
  font-size: 13px;
  color: var(--stone-400);
  cursor: pointer;

  &:hover {
    color: var(--navy-700);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const Quote = styled.span`
  align-self: flex-end;
  margin-top: auto;
  padding-top: 12px;
  font-size: 30px;
  line-height: 1;
  color: var(--sky-500);
  opacity: 0.45;
`;

export const Arrow = styled.button`
  position: absolute;
  top: calc(50% + 15px);
  ${({ $side }) => $side}: -12px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--white);
  color: var(--navy-900);
  font-size: 18px;
  cursor: pointer;
  transform: translateY(-50%);
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--navy-900);
    color: var(--white);
  }

  ${media.lg} {
    ${({ $side }) => $side}: -20px;
  }
`;

export const AllLink = styled.a`
  display: block;
  width: fit-content;
  margin: 32px auto 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--navy-700);
  text-underline-offset: 4px;

  &:hover {
    color: var(--sky-500);
  }
`;
