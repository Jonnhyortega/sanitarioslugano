import styled from "styled-components";

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 28px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--white);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--navy-700);
  }

  svg {
    font-size: 32px;
    color: var(--sky-500);
  }

  h3 {
    margin-top: 24px;
    font-size: 22px;
  }

  p {
    margin-top: 10px;
    flex: 1;
    font-size: 15px;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 24px;
    font-size: 14px;
    font-weight: 600;
    color: var(--navy-700);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    svg {
      font-size: 16px;
      color: inherit;
    }
  }
`;
