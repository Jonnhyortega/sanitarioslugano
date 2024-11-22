import styled from "styled-components";

export const NavContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${({ $scrolled }) => ($scrolled ? "60px" : "100px")};
  align-items: center;
  justify-content: space-around;
  padding: 1rem 2rem;
  background-color: var(--blue1);
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 1px 1px 20px var(--blue1);
  transition: all 0.4s ease-in-out;

  @media (max-width: 568px) {
    display: none;
  }

  img {
    width: ${({ $scrolled }) => ($scrolled ? "50px" : "80px")};
    transition: all 0.4s ease-in-out;
  }

  nav {
    display: ${({ $scrolled }) => ($scrolled ? "none" : "flex")};
    align-items: center;
    gap: 30px;
  }

  nav a {
    border-bottom: 2px solid var(--blue1);
    color: white;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.2s, border-bottom 0.2s;

    &:hover {
      color: var(--blue2);
    }
  }
`;

export const NavMobileContainer = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--blue1);
  z-index: 1000;

  img {
    width: 50px;
    margin: 1rem;
  }

  @media (max-width: 568px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    color: var(--blue2);
  }
`;

export const MobileNavMenu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 0 8em 0 0;
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  transform: ${({ $mobileMenuOpen }) =>
    $mobileMenuOpen ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 0.4s ease-in-out;

  a {
    border-bottom: 2px solid var(--blue1);
    color: var(--blue1);
    font-weight: bold;
    text-decoration: none;
    font-size: 1.5rem;
    margin: 1rem 0;
    transition: color 0.2s, border-bottom 0.2s;

    &:hover {
      color: var(--blue2);
    }
  }
`;
