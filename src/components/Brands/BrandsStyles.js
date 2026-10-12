import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export const BrandsSection = styled.section`
  padding: var(--section-y) 0;
  background: var(--white);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  scroll-margin-top: var(--header-h);
`;

export const Viewport = styled.div`
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
`;

export const Track = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  width: max-content;
  gap: 64px;
  padding: 8px 0;
  animation: ${scroll} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px 48px;
    padding: 0 var(--gutter);

    li[aria-hidden="true"] {
      display: none;
    }
  }

  li {
    flex-shrink: 0;
  }

  img {
    height: 48px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    filter: grayscale(1);
    opacity: 0.7;
    transition: filter 0.3s ease, opacity 0.3s ease;

    &:hover {
      filter: none;
      opacity: 1;
    }
  }
`;
