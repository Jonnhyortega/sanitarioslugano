import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { PiCaretLeft, PiCaretRight, PiSealCheckFill, PiStarFill, PiStarHalfFill, PiQuotesFill } from "react-icons/pi";
import { site } from "../../config/site";
import { reviews, googleRating } from "../../data/reviews";
import { Section, Container } from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import {
  Header,
  Summary,
  Score,
  Stars,
  Divider,
  GoogleMark,
  Carousel,
  Track,
  Card,
  Avatar,
  Body,
  More,
  Quote,
  Arrow,
  AllLink,
} from "./ReviewsStyles";

// Textos más largos que esto se recortan y muestran "Leer más".
const CLAMP_AT = 120;

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function StarRow({ count }) {
  return (
    <Stars aria-label={`${count.toLocaleString("es-AR")} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) =>
        count - i === 0.5 ? (
          <PiStarHalfFill key={i} aria-hidden="true" />
        ) : (
          <PiStarFill key={i} aria-hidden="true" data-off={i >= count || undefined} />
        ),
      )}
    </Stars>
  );
}

function ReviewCard({ author, when, stars, text }) {
  const [open, setOpen] = useState(false);
  const long = text.length > CLAMP_AT;

  return (
    <Card>
      <Avatar aria-hidden="true">
        {initials(author)}
        <FcGoogle />
      </Avatar>
      <h3>{author}</h3>
      <time>{when}</time>
      <div className="rating">
        <StarRow count={stars} />
        <PiSealCheckFill aria-label="Reseña verificada de Google" />
      </div>
      <Body $clamped={long && !open}>{text}</Body>
      {long && (
        <More type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "Leer menos" : "Leer más"}
        </More>
      )}
      <Quote aria-hidden="true">
        <PiQuotesFill />
      </Quote>
    </Card>
  );
}

export default function Reviews() {
  const track = useRef(null);
  const score = googleRating.score.toLocaleString("es-AR", { minimumFractionDigits: 1 });

  const slide = (dir) => {
    const el = track.current;
    const card = el?.firstElementChild;
    if (!card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section id="resenas" $tone="white">
      <Container>
        <Header data-scroll>
          <Eyebrow>Reseñas</Eyebrow>
          <h2>
            La mejor carta de presentación son <em>nuestros clientes</em>
          </h2>
        </Header>

        <Summary data-scroll>
          <Score>{score}</Score>
          <div>
            <StarRow count={Math.round(googleRating.score * 2) / 2} />
            <p>
              Basado en <strong>{googleRating.total.toLocaleString("es-AR")} reseñas</strong> de Google
            </p>
          </div>
          <Divider aria-hidden="true" />
          <GoogleMark>
            <FcGoogle aria-hidden="true" />
            <span>
              <strong>Google</strong>
              Valoración verificada
            </span>
          </GoogleMark>
        </Summary>

        <Carousel data-scroll>
          <Arrow type="button" $side="left" onClick={() => slide(-1)} aria-label="Reseña anterior">
            <PiCaretLeft aria-hidden="true" />
          </Arrow>
          <Track ref={track} tabIndex={0} aria-label="Reseñas de clientes">
            {reviews.map((r) => (
              <ReviewCard key={r.id} {...r} />
            ))}
          </Track>
          <Arrow type="button" $side="right" onClick={() => slide(1)} aria-label="Reseña siguiente">
            <PiCaretRight aria-hidden="true" />
          </Arrow>
        </Carousel>

        <AllLink href={site.reviewsUrl} target="_blank" rel="noopener noreferrer">
          Ver todas las reseñas en Google
        </AllLink>
      </Container>
    </Section>
  );
}
