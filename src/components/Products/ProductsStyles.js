import styled from "styled-components";
import { media } from "../../styles/theme";

export const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  ${media.lg} {
    grid-template-columns: repeat(5, 1fr);
  }
`;
