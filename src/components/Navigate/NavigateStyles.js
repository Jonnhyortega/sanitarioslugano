import styled from "styled-components";

export const NavContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${({ $scrolled }) => ($scrolled ? "60px" : "100px")};
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--blue1);
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 1px 1px 20px var(--blue1);
  transition: all 0.4s ease-in-out;

  img {
    width: ${({ $scrolled }) => ($scrolled ? "50px" : "80px")};
    transition: all 0.4s ease-in-out;
    margin: ${({ $scrolled }) => ($scrolled ? "0 auto" : "0")};
  }

  nav {
    display: ${({ $scrolled }) => ($scrolled ? "none" : "flex")};
    align-items: center;
    gap: 30px;
    opacity: ${({ $scrolled }) => ($scrolled ? "0" : "1")};
    transition: opacity 0.4s ease-in-out;
    position: absolute;
    right: 20px;
  }

  nav a {
    border-bottom: 2px solid var(--blue1);
    color: white;
    transition: color 0.2s, border-bottom 0.2s;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      color: var(--blue2);
    }
  }
`;
