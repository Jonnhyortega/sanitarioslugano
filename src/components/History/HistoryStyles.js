import styled from "styled-components";
import { media } from "../../styles/theme";

export const Grid = styled.div`
  display: grid;
  gap: 56px;

  ${media.lg} {
    grid-template-columns: 5fr 7fr;
    gap: 96px;
  }

  h2 {
    font-size: clamp(30px, 4vw, 44px);
  }

  .subtitle {
    margin-top: 12px;
    font-family: var(--font-serif);
    font-size: 20px;
    color: var(--navy-700);
  }
`;

export const Timeline = styled.ol`
  list-style: none;
  margin-top: 40px;
  border-left: 1px solid var(--stone-400);

  li {
    position: relative;
    padding: 0 0 28px 28px;

    &:last-child {
      padding-bottom: 0;
    }

    &::before {
      content: "";
      position: absolute;
      left: -5px;
      top: 6px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--sky-500);
      box-shadow: 0 0 0 4px var(--bone-50);
    }
  }

  .year {
    display: block;
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 600;
    color: var(--navy-700);
  }

  h3 {
    margin-top: 2px;
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: 600;
  }

  p {
    font-size: 15px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 17px;

  ${media.lg} {
    padding-top: 8px;
  }

  p:first-child {
    font-family: var(--font-serif);
    font-size: 22px;
    line-height: 1.5;
    color: var(--navy-900);
  }

  strong {
    font-weight: 600;
    color: var(--navy-900);
  }
`;
