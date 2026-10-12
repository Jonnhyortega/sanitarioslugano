import styled, { css } from "styled-components";

const variants = {
  primary: css`
    background: var(--navy-700);
    color: var(--white);
    border-color: var(--navy-700);
    &:hover {
      background: var(--navy-900);
      border-color: var(--navy-900);
    }
  `,
  secondary: css`
    background: transparent;
    color: var(--navy-900);
    border-color: var(--navy-900);
    &:hover {
      background: var(--navy-900);
      color: var(--white);
    }
  `,
  light: css`
    background: var(--white);
    color: var(--navy-900);
    border-color: var(--white);
    &:hover {
      background: var(--bone-50);
    }
  `,
  outlineLight: css`
    background: transparent;
    color: var(--white);
    border-color: var(--line-light);
    &:hover {
      border-color: var(--white);
    }
  `,
};

const StyledButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 12px 24px;
  border: 1px solid;
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  ${({ $variant }) => variants[$variant] ?? variants.primary}

  svg {
    flex-shrink: 0;
    font-size: 18px;
  }
`;

export default function Button({ href, variant = "primary", external = false, children, ...rest }) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <StyledButton href={href} $variant={variant} {...externalProps} {...rest}>
      {children}
    </StyledButton>
  );
}
