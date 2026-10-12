import { brands } from "../../data/brands";
import { Container, SectionHeader } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import { BrandsSection, Viewport, Track } from "./BrandsStyles";

export default function Brands() {
  return (
    <BrandsSection id="marcas">
      <Container>
        <SectionHeader>
          <Eyebrow>Marcas</Eyebrow>
          <h2>Trabajamos con marcas de primera calidad</h2>
        </SectionHeader>
      </Container>
      <Viewport>
        <Track>
          {brands.map((b) => (
            <li key={b.name}>
              <img src={b.logo} alt={b.name} loading="lazy" />
            </li>
          ))}
          {/* Copia para el bucle continuo; oculta a lectores de pantalla. */}
          {brands.map((b) => (
            <li key={`${b.name}-copy`} aria-hidden="true">
              <img src={b.logo} alt="" loading="lazy" />
            </li>
          ))}
        </Track>
      </Viewport>
    </BrandsSection>
  );
}
