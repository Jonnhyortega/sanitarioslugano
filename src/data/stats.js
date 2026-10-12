export const buildStats = (cfg, brandList, now = new Date()) => [
  { value: `+${now.getFullYear() - cfg.founded}`, label: "años de trayectoria" },
  { value: `+${brandList.length}`, label: "marcas líderes" },
  { value: "8", label: "especialistas" },
  { value: "Mayorista", label: "y minorista" },
];
