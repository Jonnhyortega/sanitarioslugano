import styled from "styled-components";

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? "var(--stone-400)" : "var(--navy-700)")};

  &::before {
    content: "";
    width: 24px;
    height: 1px;
    background: var(--sky-500);
    flex-shrink: 0;
  }
`;

export default Eyebrow;
