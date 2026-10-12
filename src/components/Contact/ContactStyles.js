import styled from "styled-components";
import { media } from "../../styles/theme";

export const Grid = styled.div`
  display: grid;
  gap: 48px;
  align-items: start;

  ${media.lg} {
    grid-template-columns: 5fr 7fr;
    gap: 72px;
  }

  h2 {
    color: var(--white);
    font-size: clamp(30px, 4vw, 44px);
  }
`;

export const Details = styled.dl`
  display: grid;
  gap: 24px;
  margin: 36px 0;
  color: var(--white);

  dt {
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--stone-400);
  }

  dd {
    font-size: 17px;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Map = styled.iframe`
  display: block;
  width: 100%;
  height: 380px;
  border: 0;
  border-radius: var(--radius);
  background: var(--navy-700);

  ${media.lg} {
    height: 460px;
  }
`;
