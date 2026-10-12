import { productCta } from "../../config/links";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { Card, Media, Body } from "./ProductCardStyles";

export default function ProductCard({ product }) {
  const cta = productCta(product);

  return (
    <Card>
      <Media>
        <img src={product.img} alt={`${product.name} ${product.brand}`} loading="lazy" />
      </Media>
      <Body>
        <Eyebrow as="p">{product.brand}</Eyebrow>
        <h3>{product.name}</h3>
        <Button
          href={cta.href}
          variant="secondary"
          external
          aria-label={`${cta.label}: ${product.name}`}
        >
          {cta.label}
        </Button>
      </Body>
    </Card>
  );
}
