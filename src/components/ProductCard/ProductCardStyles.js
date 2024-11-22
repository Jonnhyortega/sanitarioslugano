import styled from "styled-components";

export const ProductCardContainer = styled.a`
  border: 1px solid var(--blue1);  
  border-radius: 8px;
  text-align: center;
  padding: 1.5rem;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background: white;
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
  color: var(--blue1);
  font-family: var(--funnel);
  margin-bottom: 10px;
`;
