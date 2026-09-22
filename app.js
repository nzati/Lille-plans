/* ------------------------------------------------------------------
   Plan du métro de Lille — données et rendu SVG façon plan parisien
   Source topologique : Wikipédia "Ligne 1 / Ligne 2 du métro de Lille"
   (18 stations L1, 44 stations L2, 60 stations uniques, 2 correspondances)
------------------------------------------------------------------- */

const LINE_COLORS = {
  1: "#E4032E", // rouge — Ligne 1 : Quatre Cantons <-> CHU-Eurasanté
  2: "#0072BC", // bleu — Ligne 2 : Saint-Philibert <-> CH Dron
};

const LINE_TERMINI = {
  1: ["Quatre Cantons - Stade Pierre-Mauroy", "CHU - Eurasanté"],
  2: ["Saint-Philibert", "CH Dron"],
};

// Coordonnées en unités de grille (style schématique, angles de 0/45/90°)
const STATIONS = {
  // ---- Ligne 1 ----
  "qc":              { name: "Quatre Cantons - Stade Pierre-Mauroy", x: 15, y: 4.5 },
  "cite":            { name: "Cité Scientifique - Professeur Gabillard", x: 13.5, y: 3 },
  "triolo":          { name: "Triolo", x: 12, y: 3 },
  "vda-hdv":         { name: "Villeneuve-d'Ascq - Hôtel de Ville", x: 10.5, y: 3 },
  "pont-bois":       { name: "Pont de Bois", x: 9, y: 1.5, rail: true },
  "square-flandres": { name: "Square Flandres", x: 7.5, y: 1.5 },
  "hellemmes":       { name: "Mairie d'Hellemmes", x: 6, y: 1.5 },
  "marbrerie":       { name: "Marbrerie", x: 4.5, y: 0 },
  "fives":           { name: "Fives", x: 3, y: 0 },
  "madeleine":       { name: "Madeleine Caulier", x: 1.5, y: 0 },
  "flandres":        { name: "Gare Lille-Flandres", x: 0, y: 0, rail: true },
  "rihour":          { name: "Rihour", x: 0, y: 1.5 },
  "republique":      { name: "République - Beaux-Arts", x: -1.5, y: 3 },
  "gambetta":        { name: "Gambetta", x: -1.5, y: 4.5 },
  "wazemmes":        { name: "Wazemmes", x: -3, y: 6 },
  "portes-postes":   { name: "Porte des Postes", x: -4.5, y: 7.5 },
  "chr-oscar":       { name: "CHU - Centre Oscar-Lambret", x: -6, y: 9, rail: true },
  "chu-euras":       { name: "CHU - Eurasanté", x: -7.5, y: 10.5 },

  // ---- Ligne 2 (stations propres, hors correspondances déjà définies) ----
  "st-philibert":       { name: "Saint-Philibert", x: -21, y: 4.5 },
  "bourg":              { name: "Bourg", x: -19.5, y: 4.5 },
  "maison-enfants":     { name: "Maison des Enfants", x: -18, y: 4.5 },
  "mitterie":           { name: "Mitterie", x: -16.5, y: 4.5 },
  "pont-sup":           { name: "Pont Supérieur", x: -15, y: 4.5 },
  "lomme-lambersart":   { name: "Lomme - Lambersart - Arthur-Notebart", x: -13.5, y: 4.5 },
  "canteleu":           { name: "Canteleu - Euratechnologies", x: -12, y: 4.5 },
  "bois-blancs":        { name: "Bois Blancs", x: -10.5, y: 4.5 },
  "port-lille":         { name: "Port de Lille", x: -9, y: 6 },
  "cormontaigne":       { name: "Cormontaigne", x: -7.5, y: 6 },
  "montebello":         { name: "Montebello", x: -6, y: 6 },
  "porte-arras":        { name: "Porte d'Arras", x: -4.5, y: 6 },
  "porte-douai":        { name: "Porte de Douai - Jardin des Plantes", x: -3, y: 4.5 },
  "porte-valenciennes": { name: "Porte de Valenciennes", x: -3, y: 3 },
  "grand-palais":       { name: "Lille Grand Palais", x: -1.5, y: 1.5 },
  "mairie-lille":       { name: "Mairie de Lille", x: -1.5, y: 0 },
  "europe":             { name: "Gare Lille-Europe", x: 1.8, y: -1.8, rail: true },
  "st-maurice":         { name: "Saint-Maurice Pellevoisin", x: 3.6, y: -3.6 },
  "mons-sarts":         { name: "Mons Sarts", x: 5.4, y: -5.4 },
  "mairie-mons":        { name: "Mairie de Mons", x: 7.2, y: -7.2 },
  "fort-mons":          { name: "Fort de Mons", x: 9, y: -9 },
  "pres-pisani":        { name: "Les Prés - Edgard-Pisani", x: 10.8, y: -10.8 },
  "jean-jaures":        { name: "Jean-Jaurès", x: 12.6, y: -12.6 },
  "wasquehal-pave":     { name: "Wasquehal - Pavé de Lille", x: 14.4, y: -14.4 },
  "wasquehal-hdv":      { name: "Wasquehal - Hôtel de Ville", x: 16.2, y: -16.2 },
  "croix-centre":       { name: "Croix - Centre", x: 18, y: -18 },
  "mairie-croix":       { name: "Mairie de Croix", x: 19.8, y: -19.8 },
  "epeule":             { name: "Épeule - Montesquieu", x: 21.6, y: -21.6 },
  "roubaix-cdg":        { name: "Roubaix - Charles-de-Gaulle", x: 23.4, y: -23.4 },
  "euroteleport":       { name: "Eurotéléport", x: 24.4, y: -23.4 },
  "roubaix-gp":         { name: "Roubaix - Grand-Place", x: 25.4, y: -23.4 },
  "jean-lebas":         { name: "Gare Jean-Lebas Roubaix", x: 25.4, y: -24.4, rail: true },
  "alsace":             { name: "Alsace - Plaine Images", x: 25.4, y: -25.4 },
  "mercure":            { name: "Mercure", x: 25.4, y: -26.4 },
  "carliers":           { name: "Carliers", x: 25.4, y: -27.4 },
  "gare-tourcoing":     { name: "Gare de Tourcoing", x: 25.4, y: -28.4, rail: true },
  "tourcoing-centre":   { name: "Tourcoing - Centre", x: 25.4, y: -29.4 },
  "colbert":            { name: "Colbert", x: 25.4, y: -30.4 },
  "phalempins":         { name: "Phalempins", x: 25.4, y: -31.4 },
  "pont-neuville":      { name: "Pont de Neuville", x: 25.4, y: -32.4 },
  "bourgogne":          { name: "Bourgogne", x: 25.4, y: -33.4 },
  "ch-dron":            { name: "CH Dron", x: 25.4, y: -34.4 },
};

const LINE1_ORDER = [
  "qc","cite","triolo","vda-hdv","pont-bois","square-flandres","hellemmes",
  "marbrerie","fives","madeleine","flandres","rihour","republique","gambetta",
  "wazemmes","portes-postes","chr-oscar","chu-euras",
];

const LINE2_ORDER = [
  "st-philibert","bourg","maison-enfants","mitterie","pont-sup","lomme-lambersart",
  "canteleu","bois-blancs","port-lille","cormontaigne","montebello","portes-postes",
  "porte-arras","porte-douai","porte-valenciennes","grand-palais","mairie-lille",
  "flandres","europe","st-maurice","mons-sarts","mairie-mons","fort-mons",
  "pres-pisani","jean-jaures","wasquehal-pave","wasquehal-hdv","croix-centre",
  "mairie-croix","epeule","roubaix-cdg","euroteleport","roubaix-gp","jean-lebas",
  "alsace","mercure","carliers","gare-tourcoing","tourcoing-centre","colbert",
  "phalempins","pont-neuville","bourgogne","ch-dron",
];

const INTERCHANGE = new Set(["flandres", "portes-postes"]);

const LINES = { 1: LINE1_ORDER, 2: LINE2_ORDER };

/* ------------------------------------------------------------------
   Rendu
------------------------------------------------------------------- */

const UNIT = 52;      // px par unité de grille
const PAD = 170;       // marge autour de la carte pour les libellés
const STATION_R = 5;
const INTERCHANGE_R = 9;
const SVG_NS = "http://www.w3.org/2000/svg";

function bounds() {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const s of Object.values(STATIONS)) {
    minX = Math.min(minX, s.x); maxX = Math.max(maxX, s.x);
    minY = Math.min(minY, s.y); maxY = Math.max(maxY, s.y);
  }
  return { minX, maxX, minY, maxY };
}

function project(s, b) {
  return {
    x: PAD + (s.x - b.minX) * UNIT,
    y: PAD + (s.y - b.minY) * UNIT,
  };
}

// direction locale moyenne au niveau d'une station (pour orienter l'étiquette)
function neighborsOf(id) {
  const nbs = [];
  for (const line of [1, 2]) {
    const order = LINES[line];
    const i = order.indexOf(id);
    if (i === -1) continue;
    if (i > 0) nbs.push(order[i - 1]);
    if (i < order.length - 1) nbs.push(order[i + 1]);
  }
  return nbs;
}

function labelDirection(id) {
  const s = STATIONS[id];
  const nbs = neighborsOf(id);
  if (nbs.length === 0) return { x: 1, y: -1 };
  let dx = 0, dy = 0;
  for (const nId of nbs) {
    const n = STATIONS[nId];
    const vx = n.x - s.x, vy = n.y - s.y;
    const len = Math.hypot(vx, vy) || 1;
    dx += vx / len; dy += vy / len;
  }
  const len = Math.hypot(dx, dy);
  let dirx, diry;
  if (len < 0.01) { dirx = 1; diry = -1; } // interchange symétrique : par défaut haut-droite
  else { dirx = dx / len; diry = dy / len; }
  // perpendiculaire ("tourner à droite" du flux) pour éloigner le libellé de la ligne
  return { x: diry, y: -dirx };
}

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function buildLinePath(order, b) {
  return order.map((id) => {
    const p = project(STATIONS[id], b);
    return `${p.x},${p.y}`;
  }).join(" ");
}

function renderMap() {
  const b = bounds();
  const width = PAD * 2 + (b.maxX - b.minX) * UNIT;
  const height = PAD * 2 + (b.maxY - b.minY) * UNIT;

  const svg = svgEl("svg", {
    xmlns: SVG_NS,
    viewBox: `0 0 ${width} ${height}`,
    width, height,
  });

  // fond
  svg.appendChild(svgEl("rect", { x: 0, y: 0, width, height, fill: "#ffffff" }));

  // --- tracés des lignes ---
  const linesGroup = svgEl("g", {});
  for (const lineNum of [1, 2]) {
    const path = svgEl("polyline", {
      points: buildLinePath(LINES[lineNum], b),
      fill: "none",
      stroke: LINE_COLORS[lineNum],
      "stroke-width": 7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    });
    linesGroup.appendChild(path);
  }
  svg.appendChild(linesGroup);

  // --- petit médaillon numéro de ligne sur chaque terminus ---
  for (const lineNum of [1, 2]) {
    const order = LINES[lineNum];
    for (const endId of [order[0], order[order.length - 1]]) {
      const p = project(STATIONS[endId], b);
      const badge = svgEl("g", {});
      badge.appendChild(svgEl("circle", {
        cx: p.x, cy: p.y, r: 13,
        fill: LINE_COLORS[lineNum], stroke: "#ffffff", "stroke-width": 2.5,
      }));
      const t = svgEl("text", {
        x: p.x, y: p.y + 5, "text-anchor": "middle",
        "font-family": "Arial, Helvetica, sans-serif", "font-weight": "700",
        "font-size": 14, fill: "#ffffff",
      });
      t.textContent = lineNum;
      badge.appendChild(t);
      svg.appendChild(badge);
    }
  }

  // --- stations + libellés ---
  const stationsGroup = svgEl("g", {});
  const labelsGroup = svgEl("g", {});

  for (const [id, s] of Object.entries(STATIONS)) {
    const p = project(s, b);
    const isInterchange = INTERCHANGE.has(id);
    const isTerminus = [LINE1_ORDER[0], LINE1_ORDER[LINE1_ORDER.length - 1],
      LINE2_ORDER[0], LINE2_ORDER[LINE2_ORDER.length - 1]].includes(id);

    if (!isTerminus) {
      if (isInterchange) {
        stationsGroup.appendChild(svgEl("circle", {
          cx: p.x, cy: p.y, r: INTERCHANGE_R,
          fill: "#ffffff", stroke: "#1a1a1a", "stroke-width": 3,
        }));
      } else {
        const color = s.rail ? "#1a1a1a" : (LINE1_ORDER.includes(id) ? LINE_COLORS[1] : LINE_COLORS[2]);
        stationsGroup.appendChild(svgEl("circle", {
          cx: p.x, cy: p.y, r: STATION_R,
          fill: "#ffffff", stroke: color, "stroke-width": 3,
        }));
      }
    }

    // pictogramme gare SNCF/TER : petit losange noir décalé
    if (s.rail) {
      const rp = { x: p.x - 14, y: p.y - 14 };
      stationsGroup.appendChild(svgEl("rect", {
        x: rp.x - 5, y: rp.y - 5, width: 10, height: 10,
        fill: "#1a1a1a", transform: `rotate(45 ${rp.x} ${rp.y})`,
      }));
    }

    // libellé
    const dir = labelDirection(id);
    const offset = isInterchange ? 16 : 9;
    const lx = p.x + dir.x * offset;
    const ly = p.y + dir.y * offset;
    const anchor = dir.x >= 0 ? "start" : "end";
    const text = svgEl("text", {
      transform: `translate(${lx},${ly}) rotate(-45)`,
      "text-anchor": anchor,
      "dominant-baseline": "middle",
      "font-family": "Arial, Helvetica, sans-serif",
      "font-size": isInterchange ? 14 : 10.5,
      "font-weight": isInterchange ? "700" : "400",
      fill: "#1a1a1a",
      stroke: "#ffffff",
      "stroke-width": 3.5,
      "paint-order": "stroke",
    });
    text.textContent = s.name;
    labelsGroup.appendChild(text);
  }

  svg.appendChild(stationsGroup);
  svg.appendChild(labelsGroup);

  // --- titre + légende (coin haut-gauche) ---
  const legend = svgEl("g", { transform: `translate(24,24)` });
  legend.appendChild(svgEl("text", {
    x: 0, y: 0, "font-family": "Arial, Helvetica, sans-serif",
    "font-size": 26, "font-weight": "800", fill: "#1a1a1a",
  })).textContent = "Métro de Lille";

  let ly2 = 34;
  for (const lineNum of [1, 2]) {
    const g = svgEl("g", { transform: `translate(0, ${ly2})` });
    g.appendChild(svgEl("circle", { cx: 9, cy: -4, r: 9, fill: LINE_COLORS[lineNum] }));
    const num = svgEl("text", {
      x: 9, y: 1, "text-anchor": "middle", "font-family": "Arial, Helvetica, sans-serif",
      "font-size": 11, "font-weight": "700", fill: "#ffffff",
    });
    num.textContent = lineNum;
    g.appendChild(num);
    const label = svgEl("text", {
      x: 24, y: 0, "font-family": "Arial, Helvetica, sans-serif",
      "font-size": 13, fill: "#1a1a1a",
    });
    label.textContent = `Ligne ${lineNum} : ${LINE_TERMINI[lineNum][0]} ↔ ${LINE_TERMINI[lineNum][1]}`;
    g.appendChild(label);
    legend.appendChild(g);
    ly2 += 22;
  }

  // légende pictogrammes
  const pic = svgEl("g", { transform: `translate(0, ${ly2 + 6})` });
  pic.appendChild(svgEl("circle", {
    cx: 9, cy: -4, r: INTERCHANGE_R, fill: "#ffffff", stroke: "#1a1a1a", "stroke-width": 3,
  }));
  const picLabel1 = svgEl("text", {
    x: 24, y: 0, "font-family": "Arial, Helvetica, sans-serif", "font-size": 13, fill: "#1a1a1a",
  });
  picLabel1.textContent = "Correspondance Ligne 1 / Ligne 2";
  pic.appendChild(picLabel1);
  legend.appendChild(pic);

  const pic2 = svgEl("g", { transform: `translate(0, ${ly2 + 30})` });
  pic2.appendChild(svgEl("rect", {
    x: 9 - 5, y: -4 - 5, width: 10, height: 10, fill: "#1a1a1a", transform: "rotate(45 9 -4)",
  }));
  const picLabel2 = svgEl("text", {
    x: 24, y: 0, "font-family": "Arial, Helvetica, sans-serif", "font-size": 13, fill: "#1a1a1a",
  });
  picLabel2.textContent = "Gare SNCF / TER";
  pic2.appendChild(picLabel2);
  legend.appendChild(pic2);

  legend.appendChild(svgEl("text", {
    x: 0, y: ly2 + 58, "font-family": "Arial, Helvetica, sans-serif",
    "font-size": 11, fill: "#6b6b6b",
  })).textContent = "Réseau Ilévia — 2 lignes, 60 stations, 45 km";

  svg.appendChild(legend);

  return svg;
}

function mountMap() {
  const container = document.getElementById("map-container");
  container.innerHTML = "";
  const svg = renderMap();
  container.appendChild(svg);
  return svg;
}

/* ------------------------------------------------------------------
   Téléchargement
------------------------------------------------------------------- */

function serializeSvg(svg) {
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", SVG_NS);
  return new XMLSerializer().serializeToString(clone);
}

function downloadSvg(svg) {
  const source = serializeSvg(svg);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "plan-metro-lille.svg";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadPng(svg) {
  const scale = 2.5; // export haute résolution
  const width = parseFloat(svg.getAttribute("width"));
  const height = parseFloat(svg.getAttribute("height"));
  const source = serializeSvg(svg);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob((pngBlob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(pngBlob);
      a.download = "plan-metro-lille.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, "image/png");
  };
  img.onerror = (e) => {
    console.error("Erreur lors du rendu PNG", e);
    alert("Le téléchargement en PNG a échoué. Essayez le téléchargement SVG.");
  };
  img.src = url;
}

/* ------------------------------------------------------------------
   Init
------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const svg = mountMap();
  document.getElementById("btn-png").addEventListener("click", () => downloadPng(document.querySelector("#map-container svg")));
  document.getElementById("btn-svg").addEventListener("click", () => downloadSvg(document.querySelector("#map-container svg")));
});
