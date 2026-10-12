import styled from "styled-components";

const tones = {
  white: "var(--white)",
  bone: "var(--bone-50)",
  navy: "var(--navy-900)",
};

export const Section = styled.section`
  padding: var(--section-y) 0;
  background: ${({ $tone }) => tones[$tone] ?? tones.white};
  scroll-margin-top: var(--header-h);
`;

export const Container = styled.div`
  width: 100%;
  max-width: calc(var(--container) + var(--gutter) * 2);
  margin: 0 auto;
  padding: 0 var(--gutter);
`;

export const SectionHeader = styled.header`
  max-width: 680px;
  margin-bottom: 48px;

  h2 {
    font-size: clamp(30px, 4vw, 44px);
  }

  p:not(:first-child) {
    margin-top: 16px;
    font-size: 17px;
  }
`;
