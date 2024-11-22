import React from "react";
import {
  ProductContainer,
  Banner,
  ProductHighlightContainer,
} from "./ProductsStyles";
import images from "../../Imgs/LogosProducts/index";
import { products } from "../../DataProducts"; // Asegúrate de tener la lista de productos importada
import ProductCard from "../ProductCard/ProductCard"; // Asegúrate de importar el componente ProductCard correctamente

const Products = () => {
  return (
    <ProductContainer id="products">
      <Banner>
        <h2>Marcas de primera calidad</h2>
        <div className="brand-logos">
          <img src={images.aquasystem} alt="Marca 1" />
          <img src={images.affinity} alt="Marca 2" />
          <img src={images.awaduct} alt="Marca 3" />
          <img src={images.duratop} alt="Marca 4" />
          <img src={images.fv} alt="Marca 5" />
          <img src={images.orbis} alt="Marca 6" />
          <img src={images.ormiflex} alt="Marca 7" />
          <img src={images.rheem} alt="Marca 8" />
          <img src={images.rotoplas} alt="Marca 9" />
          <img src={images.rowa} alt="Marca 10" />
          <img src={images.motorarg} alt="Marca 11" />
          <img src={images.saiar} alt="Marca 12" />
          <img src={images.sherman} alt="Marca 14" />
          <img src={images.sigas} alt="Marca 15" />
          <img src={images.waterplas} alt="Marca 16" />
          <img src={images.señorial} alt="Marca 13" />
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
