import { useEffect, useState } from "react";
import { PiList, PiX } from "react-icons/pi";
import logo from "../../Imgs/LogoNav.webp";
import { navItems, budgetLink } from "../../config/links";
import { Container } from "../ui/Section";
import Button from "../ui/Button";
import {
  Header,
  Bar,
  Brand,
  DesktopNav,
  NavLink,
  DesktopCta,
  MenuButton,
  MobilePanel,
} from "./NavigateStyles";

const items = navItems();

const externalProps = (item) =>
  item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Navigate() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta el item de la sección visible.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = items
      .filter((i) => !i.external)
      .map((i) => document.querySelector(i.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <Header $scrolled={scrolled || menuOpen} $menuOpen={menuOpen}>
      <Container as="div" style={{ height: "100%" }}>
        <Bar>
          <Brand href="#inicio" onClick={closeMenu} aria-label="Sanitarios Lugano, ir al inicio">
            <img src={logo} alt="" width="134" height="140" />
          </Brand>

          <DesktopNav aria-label="Principal">
            {items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                $active={active === item.href}
                aria-current={active === item.href ? "true" : undefined}
                {...externalProps(item)}
              >
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>

          <DesktopCta>
            <Button href={budgetLink()} external>
              Pedir presupuesto
            </Button>
          </DesktopCta>

          <MenuButton
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <PiX /> : <PiList />}
          </MenuButton>
        </Bar>
      </Container>

      {menuOpen && (
        <MobilePanel id="menu-mobile">
          <nav aria-label="Principal">
            {items.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu} {...externalProps(item)}>
                {item.label}
              </a>
            ))}
          </nav>
          <Button href={budgetLink()} external style={{ marginTop: 32 }}>
            Pedir presupuesto
          </Button>
        </MobilePanel>
      )}
    </Header>
  );
}
