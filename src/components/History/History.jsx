import { timeline } from "../../config/links";
import { Section, Container } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import { Grid, Timeline, Body } from "./HistoryStyles";

export default function History() {
  return (
    <Section id="trayectoria" $tone="bone">
      <Container>
        <Grid>
          <div>
            <Eyebrow data-scroll>Trayectoria · Desde 1989</Eyebrow>
            <h2 data-scroll>Líderes en el mercado</h2>
            <p className="subtitle" data-scroll>Más de 35 años nos avalan</p>
            <Timeline>
              {timeline().map((item) => (
                <li key={item.title} data-scroll="left">
                  <span className="year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </Timeline>
          </div>

          <Body>
            <p data-scroll="right">
              <strong>Sanitarios Lugano</strong> es una empresa que, desde su fundación en 1989, ha
              sido un referente en la venta de sanitarios y accesorios de alta calidad. Durante más
              de tres décadas, nos hemos destacado por ofrecer productos innovadores y un servicio
              personalizado a nuestros clientes.
            </p>
            <p data-scroll="right">
              Nos especializamos en trabajar con <strong>arquitectos</strong>,{" "}
              <strong>constructoras</strong>, <strong>plomeros</strong> y{" "}
              <strong>gasistas</strong> para brindar soluciones integrales a cada tipo de
              proyecto, adaptándonos a las necesidades específicas de nuestros clientes.
            </p>
            <p data-scroll="right">
              Contamos con una amplia gama de productos disponibles para compras tanto al por mayor
              como al por menor. Nos aseguramos de ofrecer precios competitivos sin comprometer la
              calidad, y garantizamos la mejor atención al cliente.
            </p>
            <p data-scroll="right">
              Nuestro equipo está formado por 8 personas altamente capacitadas, quienes se
              comprometen a brindar un servicio ágil, eficiente y personalizado. Nos enorgullece
              contar con un equipo profesional que se dedica con pasión a lo que hace.
            </p>
          </Body>
        </Grid>
      </Container>
    </Section>
  );
}
