import styled from "styled-components";

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--navy-700);
  }
`;

export const Media = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: var(--bone-50);
  border-bottom: 1px solid var(--line);

  img {
    position: absolute;
    inset: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    object-fit: contain;
    mix-blend-mode: multiply;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 16px 20px;

  p {
    margin-bottom: 8px;
  }

  h3 {
    flex: 1;
    font-size: clamp(16px, 2vw, 20px);
    overflow-wrap: anywhere;
    hyphens: auto;
    margin-bottom: 20px;
  }

  a {
    width: 100%;
    padding-inline: 12px;
    white-space: normal;
    text-align: center;
  }
`;
