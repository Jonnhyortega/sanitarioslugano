import styled from "styled-components";
import { media } from "../../styles/theme";

export const StatsSection = styled.section`
  background: var(--white);
  border-bottom: 1px solid var(--line);
`;

export const List = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 4px;
  padding: 32px 20px;
  border-left: 1px solid var(--line);

  &:nth-child(odd) {
    border-left: 0;
  }
  &:nth-child(n + 3) {
    border-top: 1px solid var(--line);
  }

  ${media.md} {
    padding: 48px 32px;

    &:nth-child(odd) {
      border-left: 1px solid var(--line);
    }
    &:first-child {
      border-left: 0;
      padding-left: 0;
    }
    &:nth-child(n + 3) {
      border-top: 0;
    }
  }

  dt {
    font-size: 14px;
  }

  dd {
    font-family: var(--font-serif);
    font-size: clamp(32px, 4vw, 44px);
    font-weight: 500;
    line-height: 1.1;
    color: var(--navy-900);
  }
`;
