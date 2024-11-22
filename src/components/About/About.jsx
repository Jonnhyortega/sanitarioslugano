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
        <p>Brindando calidad y confianza en cada producto desde 1989</p>
        <a href="#services">Productos principales</a>
      </TextContent>
    </AboutContainer>
  );
}
