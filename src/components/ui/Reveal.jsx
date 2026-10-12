import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transform: translateY(${({ $visible }) => ($visible ? "0" : "12px")});
    transition: opacity 0.5s ease, transform 0.5s ease;
    transition-delay: ${({ $delay }) => $delay}ms;
  }
`;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Aparición suave al entrar en pantalla; visible de entrada sin IntersectionObserver o con reduced-motion.
export default function Reveal({ as, delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined" || prefersReducedMotion()
  );

  useEffect(() => {
    if (visible || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Wrapper ref={ref} as={as} $visible={visible} $delay={delay} {...rest}>
      {children}
    </Wrapper>
  );
}
