import styled from "styled-components";

export const ProductContainer = styled.div`
  background-color: transparent;
`;

export const Banner = styled.div`
  color: white;
  padding: 7rem 0 2rem 0;
  text-align: center;
  position: relative;
  h2 {
    font-size: 1.7rem;
    margin-bottom: 2.5rem;
    font-weight: 300;
    position: absolute;
    top: 20px;
    left: 20px;
    color: var(--blue1);
    font-family: var(--funnel);
  }

  .brand-logos {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;

    img {
      max-height: 60px;
      object-fit: contain;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

export const ProductHighlightContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2em 0;
  background: linear-gradient(
    90deg,
    rgba(36, 47, 92, 1) 0%,
    rgba(58, 165, 219, 1) 100%
  );
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--blue3);
    font-weight: bold;
  }

  .products {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
`;
