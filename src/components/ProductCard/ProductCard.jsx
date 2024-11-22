import {
  ProductCardContainer,
  ProductName,
  ProductImage,
} from "./ProductCardStyles";

export default function ProductCard({ product }) {
  const handleRedirect = (link) => {
    window.open(link);
  };
  return (
    <ProductCardContainer
      onClick={() => {
        handleRedirect(product.link);
      }}
    >
      <ProductName>{product.name}</ProductName>
      <ProductImage src={product.img} alt={product.name} />
    </ProductCardContainer>
  );
}
