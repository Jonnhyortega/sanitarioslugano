import { products } from "../../data/products";
import { hasStore } from "../../config/links";
import { Section, Container, SectionHeader } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import ProductCard from "../ProductCard/ProductCard";
import { Grid } from "./ProductsStyles";

export default function Products() {
  return (
    <Section id="productos" $tone="bone">
      <Container>
        <SectionHeader>
          <Eyebrow>Productos</Eyebrow>
          <h2>Destacados</h2>
          <p>
            {hasStore()
              ? "Una selección de nuestro catálogo. Encontrá todos los productos en la tienda online."
              : "Una selección de nuestro catálogo. Consultanos por stock, precios y alternativas."}
          </p>
        </SectionHeader>
        <Grid>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
