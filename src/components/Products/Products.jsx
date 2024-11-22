import React from "react";
import {
  ProductContainer,
  Banner,
  ProductHighlightContainer,
  ProductCard,
  ProductImage,
  ProductName,
} from "./ProductsStyles";

const Products = () => {
  return (
    <ProductContainer>
      <Banner>
        <h2>Ofrecemos las mejores marcas del mercado</h2>
        <div className="brand-logos">
          <img src="/path-to-logo1.png" alt="Marca 1" />
          <img src="/path-to-logo2.png" alt="Marca 2" />
          <img src="/path-to-logo3.png" alt="Marca 3" />
          <img src="/path-to-logo4.png" alt="Marca 4" />
        </div>
      </Banner>

      <ProductHighlightContainer>
        <h3>Productos más vendidos</h3>
        <div className="products">
          <ProductCard>
            <ProductImage
              src="/path-to-bathset-image.jpg"
              alt="Juego de baño"
            />
            <ProductName>Juego de baño</ProductName>
          </ProductCard>
          <ProductCard>
            <ProductImage src="/path-to-faucets-image.jpg" alt="Griferías" />
            <ProductName>Griferías</ProductName>
          </ProductCard>
          <ProductCard>
            <ProductImage
              src="/path-to-waterbobbin-image.jpg"
              alt="Bobinas de agua"
            />
            <ProductName>Bobinas de agua</ProductName>
          </ProductCard>
          <ProductCard>
            <ProductImage src="/path-to-tanks-image.jpg" alt="Tanques" />
            <ProductName>Tanques</ProductName>
          </ProductCard>
          <ProductCard>
            <ProductImage src="/path-to-heaters-image.jpg" alt="Calefones" />
            <ProductName>Calefones</ProductName>
          </ProductCard>
          <ProductCard>
            <ProductImage src="/path-to-pipes-image.jpg" alt="Cañerías" />
            <ProductName>Cañerías</ProductName>
          </ProductCard>
        </div>
      </ProductHighlightContainer>
    </ProductContainer>
  );
};

export default Products;
