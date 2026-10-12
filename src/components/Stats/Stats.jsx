import { site } from "../../config/site";
import { brands } from "../../data/brands";
import { buildStats } from "../../data/stats";
import { Container } from "../ui/Section";
import { StatsSection, List, Item } from "./StatsStyles";

export default function Stats() {
  const stats = buildStats(site, brands);

  return (
    <StatsSection aria-label="Sanitarios Lugano en cifras">
      <Container>
        <List>
          {stats.map((s) => (
            <Item key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </Item>
          ))}
        </List>
      </Container>
    </StatsSection>
  );
}
