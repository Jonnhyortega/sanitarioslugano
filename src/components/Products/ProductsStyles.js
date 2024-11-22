import styled from "styled-components";

export const ProductContainer = styled.div`
  padding: 2rem;
  background-color: #f4f4f4;
`;

export const Banner = styled.div`
  background-color: #1a73e8;
  color: white;
  padding: 3rem 0;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  .brand-logos {
    display: flex;
    justify-content: center;
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

  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--blue1);
    font-weight: bold;
  }

  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }
`;

export const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 1.5rem;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

export const ProductName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;
