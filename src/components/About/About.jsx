import React from "react";
import { AboutContainer, TextContent, DecorativeBar } from "./AboutStyles";

export default function About() {
  return (
    <AboutContainer id="home">
      <TextContent>
        <DecorativeBar />
        <h1>
          SANITARIOS <br /> LUGANO
        </h1>
        <p>Brindando calidad y confianza desde 1989</p>
        <div className="buttons">
          {/* <a
            href="https://sanitarioslugano.mercadoshops.com.ar/"
            target="_blank"
          >
            Visitar tienda
          </a> */}
          <a href="https://wa.link/bfy5bv" target="_blank">
            Pedir presupuesto
          </a>
        </div>
      </TextContent>
    </AboutContainer>
  );
}
