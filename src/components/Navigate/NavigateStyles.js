import styled from "styled-components";
import { media } from "../../styles/theme";

export const Header = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  height: var(--header-h);
  background: ${({ $scrolled }) => ($scrolled ? "var(--white)" : "transparent")};
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? "var(--line)" : "transparent")};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const Bar = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

export const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--navy-900);
  position: relative;
  z-index: 2;

  img {
    width: 44px;
    height: 44px;
    border-radius: var(--radius);
    object-fit: cover;
  }

  span {
    font-family: var(--font-serif);
    font-size: 19px;
    white-space: nowrap;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
`;

export const DesktopNav = styled.nav`
  display: none;

  ${media.lg} {
    display: flex;
    align-items: center;
    gap: 28px;
  }
`;

export const NavLink = styled.a`
  position: relative;
  padding: 6px 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--navy-900);
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--sky-500);
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const DesktopCta = styled.div`
  display: none;

  ${media.lg} {
    display: block;
  }
`;

export const MenuButton = styled.button`
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--white);
  color: var(--navy-900);
  font-size: 22px;
  cursor: pointer;

  ${media.lg} {
    display: none;
  }
`;

export const MobilePanel = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--header-h) + 32px) var(--gutter) 40px;
  background: var(--bone-50);
  overflow-y: auto;

  nav {
    display: flex;
    flex-direction: column;
  }

  nav a {
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
    font-family: var(--font-serif);
    font-size: 28px;
    color: var(--navy-900);
    text-decoration: none;
  }

  ${media.lg} {
    display: none;
  }
`;
