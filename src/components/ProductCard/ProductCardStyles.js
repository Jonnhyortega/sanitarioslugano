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
  aspect-ratio: 1;
  padding: 24px;
  background: var(--bone-50);
  border-bottom: 1px solid var(--line);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 20px 24px;

  p {
    margin-bottom: 8px;
  }

  h3 {
    flex: 1;
    font-size: 20px;
    margin-bottom: 20px;
  }
`;
