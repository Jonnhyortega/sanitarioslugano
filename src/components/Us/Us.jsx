import React from "react";
import {
  UsContainer,
  UsContent,
  UsImage,
  UsText,
  UsTitle,
  UsSubTitle,
  UsSection,
} from "./UsStyles";
import logo from "../../Imgs/LogoBlue.jpeg";

export default function Us() {
  return (
    <UsContainer id="us">
      <UsContent>
        <UsTitle>Lideres en el mercado</UsTitle>
        <UsSubTitle>Mas de 30 años nos abalan</UsSubTitle>
        {/* <UsImage src={logo} alt="Logo Sanitarios Lugano" /> */}
        <UsSection>
          <UsText>
            <p>
              <strong>Sanitarios Lugano</strong> es una empresa que, desde su
              fundación en 1989, ha sido un referente en la venta de sanitarios
              y accesorios de alta calidad. Durante más de tres décadas, nos
              hemos destacado por ofrecer productos innovadores y un servicio
              personalizado a nuestros clientes.
            </p>
            <p>
              Nos especializamos en trabajar con <strong>arquitectos</strong>,{" "}
              <strong>constructoras</strong>, <strong>plomeros</strong> y{" "}
              <strong>gasistas</strong> para brindar soluciones integrales a
              cada tipo de proyecto, adaptándonos a las necesidades específicas
              de nuestros clientes.
            </p>
            <p>
              Contamos con una amplia gama de productos disponibles para compras
              tanto al por mayor como al por menor. Nos aseguramos de ofrecer
              precios competitivos sin comprometer la calidad, y garantizamos la
              mejor atención al cliente.
            </p>
            <p>
              Nuestro equipo está formado por 8 personas altamente capacitadas,
              quienes se comprometen a brindar un servicio ágil, eficiente y
              personalizado. Nos enorgullece contar con un equipo profesional
              que se dedica con pasión a lo que hace.
            </p>
          </UsText>
        </UsSection>
      </UsContent>
    </UsContainer>
  );
}
