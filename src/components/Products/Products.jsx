import React from "react";
import {
  ProductContainer,
  Banner,
  ProductHighlightContainer,
} from "./ProductsStyles";
import { brands } from "../../data/brands";
import { products } from "../../data/products";
import ProductCard from "../ProductCard/ProductCard"; // Asegúrate de importar el componente ProductCard correctamente

const Products = () => {
  return (
    <ProductContainer id="products">
      <Banner>
        <h2>Marcas de primera calidad</h2>
        <div className="brand-logos">
          {brands.map((b) => (
            <img key={b.name} src={b.logo} alt={b.name} />
          ))}
        </div>
      </Banner>

      <ProductHighlightContainer>
        <h3>Productos destacados</h3>
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ProductHighlightContainer>
    </ProductContainer>
  );
};

export default Products;
