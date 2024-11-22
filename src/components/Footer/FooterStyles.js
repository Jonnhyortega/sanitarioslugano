import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: linear-gradient(
    90deg,
    rgba(58, 165, 219, 1) 0%,
    rgba(36, 47, 92, 1) 88%
  );
  color: #ffffff;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

export const FooterContent = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const FooterLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease-in-out;
  font-family: var(--funnel);
  &:hover {
    color: #ff9f00;
  }
`;

export const FooterCopyright = styled.p`
  font-size: 0.875rem;
  color: #bfbfbf;
  text-align: center;
`;
