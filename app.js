/* ------------------------------------------------------------------
   Lille Plans — rendu SVG façon plans RATP, pour plusieurs réseaux
   Sources topologiques : Wikipédia
     - "Ligne 1 / Ligne 2 du métro de Lille" (métro, 60 stations)
     - "Tramway du Grand Boulevard" (tramway Mongy, lignes R/T, 36 stations)
------------------------------------------------------------------- */

const SVG_NS = "http://www.w3.org/2000/svg";
const STATION_R = 5;
const INTERCHANGE_R = 9;
const APP_TITLE = "Lille Plans";

/* ------------------------------------------------------------------
   Réseau 1 — Métro (lignes 1 et 2)
------------------------------------------------------------------- */

const METRO_STATIONS = {
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

const METRO_LINE1_ORDER = [
  "qc","cite","triolo","vda-hdv","pont-bois","square-flandres","hellemmes",
  "marbrerie","fives","madeleine","flandres","rihour","republique","gambetta",
  "wazemmes","portes-postes","chr-oscar","chu-euras",
];

const METRO_LINE2_ORDER = [
  "st-philibert","bourg","maison-enfants","mitterie","pont-sup","lomme-lambersart",
  "canteleu","bois-blancs","port-lille","cormontaigne","montebello","portes-postes",
  "porte-arras","porte-douai","porte-valenciennes","grand-palais","mairie-lille",
  "flandres","europe","st-maurice","mons-sarts","mairie-mons","fort-mons",
  "pres-pisani","jean-jaures","wasquehal-pave","wasquehal-hdv","croix-centre",
  "mairie-croix","epeule","roubaix-cdg","euroteleport","roubaix-gp","jean-lebas",
  "alsace","mercure","carliers","gare-tourcoing","tourcoing-centre","colbert",
  "phalempins","pont-neuville","bourgogne","ch-dron",
];

/* ------------------------------------------------------------------
   Réseau 2 — Tramway Mongy (lignes R et T)
   Tronc commun Gare Lille-Flandres <-> Croisé-Laroche, puis
   branche R vers Roubaix - Eurotéléport et branche T vers Tourcoing - Centre.
------------------------------------------------------------------- */

const TRAM_STATIONS = {
  // tronc commun
  "flandres":    { name: "Gare Lille-Flandres", x: 0, y: 0, rail: true },
  "europe":      { name: "Gare Lille-Europe", x: 1, y: -1, rail: true },
  "romarin":     { name: "Romarin", x: 2, y: -2 },
  "botanique":   { name: "Botanique", x: 3, y: -3 },
  "saint-maur":  { name: "Saint-Maur", x: 4, y: -4 },
  "buisson":     { name: "Buisson", x: 5, y: -5 },
  "brossolette": { name: "Brossolette", x: 6, y: -6 },
  "clemenceau":  { name: "Clemenceau - Hippodrome", x: 7, y: -7 },
  "croise-laroche": { name: "Croisé-Laroche", x: 8, y: -8 },

  // branche R -> Roubaix
  "acacias":           { name: "Acacias", x: 9, y: -9 },
  "pont-wasquehal":    { name: "Pont de Wasquehal", x: 10, y: -10 },
  "la-terrasse":       { name: "La Terrasse", x: 11, y: -11 },
  "wasquehal-pave-tram": { name: "Wasquehal - Pavé de Lille", x: 12, y: -12, metroLink: true },
  "le-sart":           { name: "Le Sart", x: 13, y: -13 },
  "planche-epinoy":    { name: "Planche-Épinoy", x: 14, y: -14 },
  "la-marque":         { name: "La Marque", x: 15, y: -15 },
  "villa-cavrois":     { name: "Villa Cavrois", x: 16, y: -16 },
  "bol-dair":          { name: "Bol d'air", x: 17, y: -17 },
  "parc-barbieux":     { name: "Parc Barbieux", x: 18, y: -18 },
  "victor-provo":      { name: "Hôpital Victor-Provo", x: 19, y: -19 },
  "jean-moulin":       { name: "Jean-Moulin", x: 20, y: -20 },
  "alfred-mongy":      { name: "Alfred-Mongy", x: 21, y: -21 },
  "euroteleport-tram": { name: "Eurotéléport", x: 22, y: -22, metroLink: true },

  // branche T -> Tourcoing
  "foch":              { name: "Foch", x: 8, y: -9 },
  "le-quesne":         { name: "Le Quesne", x: 9, y: -10 },
  "cerisaie":          { name: "Cerisaie - Centre d'Affaires", x: 9, y: -11 },
  "chateau-rouge":     { name: "Château Rouge", x: 10, y: -12 },
  "cartelot":          { name: "Cartelot", x: 10, y: -13 },
  "grand-cottignies":  { name: "Grand Cottignies", x: 11, y: -14 },
  "triez":             { name: "Triez", x: 11, y: -15 },
  "trois-suisses":     { name: "Trois Suisses", x: 12, y: -16 },
  "faidherbe":         { name: "Faidherbe", x: 12, y: -17 },
  "ma-campagne":       { name: "Ma Campagne", x: 13, y: -18 },
  "pont-hydraulique":  { name: "Pont Hydraulique", x: 13, y: -19 },
  "victoire":          { name: "Victoire", x: 14, y: -20 },
  "tourcoing-centre-tram": { name: "Tourcoing - Centre", x: 14, y: -21, metroLink: true },
};

const TRAM_TRUNK = [
  "flandres", "europe", "romarin", "botanique", "saint-maur",
  "buisson", "brossolette", "clemenceau", "croise-laroche",
];

const TRAM_R_ORDER = TRAM_TRUNK.concat([
  "acacias", "pont-wasquehal", "la-terrasse", "wasquehal-pave-tram", "le-sart",
  "planche-epinoy", "la-marque", "villa-cavrois", "bol-dair", "parc-barbieux",
  "victor-provo", "jean-moulin", "alfred-mongy", "euroteleport-tram",
]);

const TRAM_T_ORDER = TRAM_TRUNK.concat([
  "foch", "le-quesne", "cerisaie", "chateau-rouge", "cartelot",
  "grand-cottignies", "triez", "trois-suisses", "faidherbe", "ma-campagne",
  "pont-hydraulique", "victoire", "tourcoing-centre-tram",
]);

/* ------------------------------------------------------------------
   Définition des réseaux
------------------------------------------------------------------- */

const NETWORKS = {
  metro: {
    key: "metro",
    title: "Plan du métro",
    subtitle: "Ligne 1 · Ligne 2 — 60 stations",
    appTitle: "Métro de Lille",
    filenameBase: "plan-metro-lille",
    stations: METRO_STATIONS,
    lines: {
      1: { order: METRO_LINE1_ORDER, color: "#E4032E" },
      2: { order: METRO_LINE2_ORDER, color: "#0072BC" },
    },
    interchange: new Set(["flandres", "portes-postes"]),
    unit: 52,
    pad: 170,
    thumbFocus: "flandres",
    legendNote: "Réseau Ilévia — 2 lignes, 60 stations, 45 km",
    legendPictos: [
      { kind: "interchange", label: "Correspondance Ligne 1 / Ligne 2" },
      { kind: "rail", label: "Gare SNCF / TER" },
    ],
  },
  tram: {
    key: "tram",
    title: "Plan du tramway",
    subtitle: "Ligne R · Ligne T (Mongy) — 36 stations",
    appTitle: "Tramway de Lille (Mongy)",
    filenameBase: "plan-tramway-lille",
    stations: TRAM_STATIONS,
    lines: {
      R: { order: TRAM_R_ORDER, color: "#F5821F" },
      T: { order: TRAM_T_ORDER, color: "#00966C" },
    },
    interchange: new Set(["flandres", "croise-laroche"]),
    trunk: {
      ids: TRAM_TRUNK,
      outerColor: "#F5821F",
      innerColor: "#00966C",
      outerWidth: 9,
      innerWidth: 3.5,
    },
    unit: 95,
    pad: 160,
    thumbFocus: "croise-laroche",
    legendNote: 'Réseau Ilévia — Tramway « Mongy », 2 lignes, 36 stations, 17,5 km',
    legendPictos: [
      { kind: "interchange", label: "Correspondance Ligne R / Ligne T" },
      { kind: "rail", label: "Gare SNCF / TER" },
      { kind: "metro", label: "Correspondance métro" },
    ],
  },
  bus: {
    key: "bus",
    type: "geo",
    title: "Plan des bus",
    subtitle: "154 lignes — tracés réels (GTFS)",
    appTitle: "Bus de Lille",
    filenameBase: "plan-bus-lille",
    dataUrl: "data/bus-routes.json",
    legendNote: "Réseau Ilévia — données GTFS ouvertes, 154 lignes de bus",
  },
};

/* ------------------------------------------------------------------
   Géométrie générique
------------------------------------------------------------------- */

function bounds(stations) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const s of Object.values(stations)) {
    minX = Math.min(minX, s.x); maxX = Math.max(maxX, s.x);
    minY = Math.min(minY, s.y); maxY = Math.max(maxY, s.y);
  }
  return { minX, maxX, minY, maxY };
}

function project(s, b, unit, pad) {
  return {
    x: pad + (s.x - b.minX) * unit,
    y: pad + (s.y - b.minY) * unit,
  };
}

function neighborsOf(id, lineOrders) {
  const nbs = [];
  for (const order of lineOrders) {
    const i = order.indexOf(id);
    if (i === -1) continue;
    if (i > 0) nbs.push(order[i - 1]);
    if (i < order.length - 1) nbs.push(order[i + 1]);
  }
  return nbs;
}

function labelDirection(id, stations, lineOrders) {
  const s = stations[id];
  const nbs = neighborsOf(id, lineOrders);
  if (nbs.length === 0) return { x: 1, y: -1 };
  let dx = 0, dy = 0;
  for (const nId of nbs) {
    const n = stations[nId];
    const vx = n.x - s.x, vy = n.y - s.y;
    const len = Math.hypot(vx, vy) || 1;
    dx += vx / len; dy += vy / len;
  }
  const len = Math.hypot(dx, dy);
  let dirx, diry;
  if (len < 0.01) { dirx = 1; diry = -1; }
  else { dirx = dx / len; diry = dy / len; }
  return { x: diry, y: -dirx };
}

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

/* ------------------------------------------------------------------
   Rendu d'un réseau complet
------------------------------------------------------------------- */

function buildNetworkSvg(network) {
  const stations = network.stations;
  const b = bounds(stations);
  const unit = network.unit || 55;
  const pad = network.pad || 160;
  const width = pad * 2 + (b.maxX - b.minX) * unit;
  const height = pad * 2 + (b.maxY - b.minY) * unit;
  const proj = (s) => project(s, b, unit, pad);
  const ptsOf = (order) => order.map((id) => { const p = proj(stations[id]); return `${p.x},${p.y}`; }).join(" ");

  const svg = svgEl("svg", { xmlns: SVG_NS, viewBox: `0 0 ${width} ${height}`, width, height });
  svg.appendChild(svgEl("rect", { x: 0, y: 0, width, height, fill: "#ffffff" }));

  const lineKeys = Object.keys(network.lines);
  const lineOrders = lineKeys.map((k) => network.lines[k].order);

  // --- tracés ---
  const linesGroup = svgEl("g", {});
  if (network.trunk) {
    const trunkPts = ptsOf(network.trunk.ids);
    linesGroup.appendChild(svgEl("polyline", {
      points: trunkPts, fill: "none", stroke: network.trunk.outerColor,
      "stroke-width": network.trunk.outerWidth, "stroke-linecap": "round", "stroke-linejoin": "round",
    }));
    linesGroup.appendChild(svgEl("polyline", {
      points: trunkPts, fill: "none", stroke: network.trunk.innerColor,
      "stroke-width": network.trunk.innerWidth, "stroke-linecap": "round", "stroke-linejoin": "round",
    }));
    for (const key of lineKeys) {
      const order = network.lines[key].order;
      const branchOrder = order.slice(network.trunk.ids.length - 1);
      linesGroup.appendChild(svgEl("polyline", {
        points: ptsOf(branchOrder), fill: "none", stroke: network.lines[key].color,
        "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round",
      }));
    }
  } else {
    for (const key of lineKeys) {
      linesGroup.appendChild(svgEl("polyline", {
        points: ptsOf(network.lines[key].order), fill: "none", stroke: network.lines[key].color,
        "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round",
      }));
    }
  }
  svg.appendChild(linesGroup);

  // --- médaillons de terminus ---
  const termini = new Set();
  for (const key of lineKeys) {
    const order = network.lines[key].order;
    for (const endId of [order[0], order[order.length - 1]]) {
      termini.add(endId);
      const p = proj(stations[endId]);
      const badge = svgEl("g", {});
      badge.appendChild(svgEl("circle", {
        cx: p.x, cy: p.y, r: 13, fill: network.lines[key].color, stroke: "#ffffff", "stroke-width": 2.5,
      }));
      const t = svgEl("text", {
        x: p.x, y: p.y + 5, "text-anchor": "middle", "font-family": "Arial, Helvetica, sans-serif",
        "font-weight": "700", "font-size": 14, fill: "#ffffff",
      });
      t.textContent = key;
      badge.appendChild(t);
      svg.appendChild(badge);
    }
  }

  // --- stations + libellés ---
  const stationsGroup = svgEl("g", {});
  const labelsGroup = svgEl("g", {});
  const interchange = network.interchange || new Set();

  for (const [id, s] of Object.entries(stations)) {
    const p = proj(s);
    const isInterchange = interchange.has(id);
    const isTerminus = termini.has(id);

    if (!isTerminus) {
      if (isInterchange) {
        stationsGroup.appendChild(svgEl("circle", {
          cx: p.x, cy: p.y, r: INTERCHANGE_R, fill: "#ffffff", stroke: "#1a1a1a", "stroke-width": 3,
        }));
      } else {
        const ownerKey = lineKeys.find((k) => network.lines[k].order.includes(id));
        const color = s.rail ? "#1a1a1a" : network.lines[ownerKey].color;
        stationsGroup.appendChild(svgEl("circle", {
          cx: p.x, cy: p.y, r: STATION_R, fill: "#ffffff", stroke: color, "stroke-width": 3,
        }));
      }
    }

    if (s.rail) {
      const rp = { x: p.x - 14, y: p.y - 14 };
      stationsGroup.appendChild(svgEl("rect", {
        x: rp.x - 5, y: rp.y - 5, width: 10, height: 10, fill: "#1a1a1a", transform: `rotate(45 ${rp.x} ${rp.y})`,
      }));
    }
    if (s.metroLink) {
      const mp = { x: p.x + 14, y: p.y - 14 };
      stationsGroup.appendChild(svgEl("circle", { cx: mp.x, cy: mp.y, r: 7, fill: "#1a1a1a" }));
      const mt = svgEl("text", {
        x: mp.x, y: mp.y + 3.5, "text-anchor": "middle", "font-family": "Arial, Helvetica, sans-serif",
        "font-weight": "700", "font-size": 9, fill: "#ffffff",
      });
      mt.textContent = "M";
      stationsGroup.appendChild(mt);
    }

    const dir = labelDirection(id, stations, lineOrders);
    const offset = isInterchange ? 16 : 9;
    const lx = p.x + dir.x * offset, ly = p.y + dir.y * offset;
    const anchor = dir.x >= 0 ? "start" : "end";
    const text = svgEl("text", {
      transform: `translate(${lx},${ly}) rotate(-45)`,
      "text-anchor": anchor, "dominant-baseline": "middle",
      "font-family": "Arial, Helvetica, sans-serif",
      "font-size": isInterchange ? 14 : 10.5,
      "font-weight": isInterchange ? "700" : "400",
      fill: "#1a1a1a", stroke: "#ffffff", "stroke-width": 3.5, "paint-order": "stroke",
    });
    text.textContent = s.name;
    labelsGroup.appendChild(text);
  }
  svg.appendChild(stationsGroup);
  svg.appendChild(labelsGroup);

  // --- titre + légende ---
  const legend = svgEl("g", { transform: "translate(24,24)" });
  const titleEl = svgEl("text", {
    x: 0, y: 0, "font-family": "Arial, Helvetica, sans-serif", "font-size": 26, "font-weight": "800", fill: "#1a1a1a",
  });
  titleEl.textContent = network.appTitle;
  legend.appendChild(titleEl);

  let ly = 34;
  for (const key of lineKeys) {
    const order = network.lines[key].order;
    const g = svgEl("g", { transform: `translate(0, ${ly})` });
    g.appendChild(svgEl("circle", { cx: 9, cy: -4, r: 9, fill: network.lines[key].color }));
    const num = svgEl("text", {
      x: 9, y: 1, "text-anchor": "middle", "font-family": "Arial, Helvetica, sans-serif",
      "font-size": 11, "font-weight": "700", fill: "#ffffff",
    });
    num.textContent = key;
    g.appendChild(num);
    const label = svgEl("text", {
      x: 24, y: 0, "font-family": "Arial, Helvetica, sans-serif", "font-size": 13, fill: "#1a1a1a",
    });
    label.textContent = `Ligne ${key} : ${stations[order[0]].name} ↔ ${stations[order[order.length - 1]].name}`;
    g.appendChild(label);
    legend.appendChild(g);
    ly += 22;
  }

  ly += 6;
  for (const picto of network.legendPictos || []) {
    const g = svgEl("g", { transform: `translate(0, ${ly})` });
    if (picto.kind === "interchange") {
      g.appendChild(svgEl("circle", { cx: 9, cy: -4, r: INTERCHANGE_R, fill: "#ffffff", stroke: "#1a1a1a", "stroke-width": 3 }));
    } else if (picto.kind === "rail") {
      g.appendChild(svgEl("rect", { x: 4, y: -9, width: 10, height: 10, fill: "#1a1a1a", transform: "rotate(45 9 -4)" }));
    } else if (picto.kind === "metro") {
      g.appendChild(svgEl("circle", { cx: 9, cy: -4, r: 7, fill: "#1a1a1a" }));
      const mt = svgEl("text", {
        x: 9, y: -0.5, "text-anchor": "middle", "font-family": "Arial, Helvetica, sans-serif",
        "font-weight": "700", "font-size": 9, fill: "#ffffff",
      });
      mt.textContent = "M";
      g.appendChild(mt);
    }
    const label = svgEl("text", { x: 24, y: 0, "font-family": "Arial, Helvetica, sans-serif", "font-size": 13, fill: "#1a1a1a" });
    label.textContent = picto.label;
    g.appendChild(label);
    legend.appendChild(g);
    ly += 24;
  }

  legend.appendChild((() => {
    const t = svgEl("text", { x: 0, y: ly + 10, "font-family": "Arial, Helvetica, sans-serif", "font-size": 11, fill: "#6b6b6b" });
    t.textContent = network.legendNote || "";
    return t;
  })());

  svg.appendChild(legend);
  return svg;
}

/* ------------------------------------------------------------------
   Vignette (aperçu recadré pour la carte d'accueil)
------------------------------------------------------------------- */

function buildThumbSvg(network) {
  const full = buildNetworkSvg(network);
  const clone = full.cloneNode(true);
  const b = bounds(network.stations);
  const unit = network.unit || 55, pad = network.pad || 160;
  const focus = network.stations[network.thumbFocus];
  const p = project(focus, b, unit, pad);
  const w = 640, h = 420;
  const fullW = parseFloat(full.getAttribute("width"));
  const fullH = parseFloat(full.getAttribute("height"));
  const x = Math.max(0, Math.min(p.x - w / 2, fullW - w));
  const y = Math.max(0, Math.min(p.y - h / 2, fullH - h));
  clone.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
  clone.removeAttribute("width");
  clone.removeAttribute("height");
  clone.setAttribute("preserveAspectRatio", "xMidYMid slice");
  clone.style.width = "100%";
  clone.style.height = "100%";
  clone.style.display = "block";
  return clone;
}

/* ------------------------------------------------------------------
   Réseau géographique — Bus (données GTFS Ilévia, tracés réels)
------------------------------------------------------------------- */

let busData = null;
let busDataPromise = null;

function loadBusData() {
  if (busDataPromise) return busDataPromise;
  busDataPromise = fetch(NETWORKS.bus.dataUrl)
    .then((r) => r.json())
    .then((data) => { busData = data; return data; });
  return busDataPromise;
}

const BUS_GROUP_ORDER = [
  "Lianes", "Citadines", "Corolle", "Express", "Lignes urbaines",
  "Périurbaines", "Flexo / à la demande", "Scolaires", "Noctambus", "Autres",
];

function classifyBusRoute(name) {
  if (/^L\d+$/.test(name)) return "Lianes";
  if (/^CO\d*$/.test(name)) return "Corolle";
  if (/^C\d+$/.test(name)) return "Citadines";
  if (/^E\d+F?$/.test(name)) return "Express";
  if (/^S\d+$/.test(name)) return "Scolaires";
  if (/F$/.test(name) || /^F\d+$/.test(name)) return "Flexo / à la demande";
  if (/^A\d+$/.test(name)) return "Lignes urbaines";
  if (/^P\d+$/.test(name)) return "Périurbaines";
  if (/^N\d+$/.test(name)) return "Noctambus";
  if (/^\d+$/.test(name)) return "Lignes urbaines";
  return "Autres";
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function geoBoundsOf(routes) {
  let minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
  for (const r of routes) {
    for (const v of r.variants) {
      for (const [lat, lon] of v.coords) {
        minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
        minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon);
      }
    }
  }
  return { minLat, maxLat, minLon, maxLon };
}

function buildBusThumbSvg(network) {
  const routes = busData || [];
  const w = 640, h = 420, pad = 16;
  const svg = svgEl("svg", { xmlns: SVG_NS, viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: "xMidYMid meet" });
  svg.style.width = "100%"; svg.style.height = "100%"; svg.style.display = "block";
  svg.appendChild(svgEl("rect", { x: 0, y: 0, width: w, height: h, fill: "#e9ebe4" }));
  if (!routes.length) return svg;

  const b = geoBoundsOf(routes);
  const latAvg = (b.minLat + b.maxLat) / 2;
  const cos = Math.cos((latAvg * Math.PI) / 180);
  const spanX = (b.maxLon - b.minLon) * cos || 1;
  const spanY = b.maxLat - b.minLat || 1;
  const scale = Math.min((w - 2 * pad) / spanX, (h - 2 * pad) / spanY);
  const offX = (w - spanX * scale) / 2;
  const offY = (h - spanY * scale) / 2;
  const proj = (lat, lon) => ({
    x: offX + (lon - b.minLon) * cos * scale,
    y: h - (offY + (lat - b.minLat) * scale),
  });

  const g = svgEl("g", {});
  for (const r of routes) {
    for (const v of r.variants) {
      const pts = v.coords.map(([lat, lon]) => { const p = proj(lat, lon); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" ");
      g.appendChild(svgEl("polyline", {
        points: pts, fill: "none", stroke: r.color, "stroke-width": 1.1,
        "stroke-opacity": 0.75, "stroke-linecap": "round", "stroke-linejoin": "round",
      }));
    }
  }
  svg.appendChild(g);
  return svg;
}

let leafletMap = null;
const busLineLayers = new Map(); // route.id -> [L.Polyline, ...]

function ensureLeafletMap() {
  if (leafletMap) return leafletMap;
  leafletMap = L.map("leaflet-map", { zoomControl: true }).setView([50.6292, 3.0573], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(leafletMap);
  return leafletMap;
}

function renderBusMap(network, routes) {
  const map = ensureLeafletMap();
  for (const layers of busLineLayers.values()) layers.forEach((l) => map.removeLayer(l));
  busLineLayers.clear();

  const allLatLngs = [];
  for (const route of routes) {
    const layers = [];
    for (const variant of route.variants) {
      const poly = L.polyline(variant.coords, { color: route.color, weight: 3, opacity: 0.8 });
      poly.bindPopup(
        `<strong>${escapeHtml(route.name)}</strong><br>` +
        `${escapeHtml(variant.firstStop)} → ${escapeHtml(variant.lastStop)}`
      );
      poly.addTo(map);
      layers.push(poly);
      allLatLngs.push(...variant.coords);
    }
    busLineLayers.set(route.id, layers);
  }
  if (allLatLngs.length) map.fitBounds(allLatLngs, { padding: [20, 20] });

  buildLinePanel(routes);
  setTimeout(() => map.invalidateSize(), 60);
}

function buildLinePanel(routes) {
  const container = document.getElementById("line-panel-groups");
  container.innerHTML = "";
  const groups = new Map();
  for (const r of routes) {
    const g = classifyBusRoute(r.name);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(r);
  }
  const orderedKeys = [
    ...BUS_GROUP_ORDER.filter((g) => groups.has(g)),
    ...[...groups.keys()].filter((g) => !BUS_GROUP_ORDER.includes(g)),
  ];

  for (const groupName of orderedKeys) {
    const list = groups.get(groupName);
    const section = document.createElement("div");
    section.className = "line-group";
    const title = document.createElement("div");
    title.className = "line-group-title";
    title.textContent = `${groupName} (${list.length})`;
    section.appendChild(title);

    for (const route of list) {
      const rep = route.variants.find((v) => v.dir === "0") || route.variants[0];
      const row = document.createElement("label");
      row.className = "line-row";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.addEventListener("change", () => {
        const layers = busLineLayers.get(route.id) || [];
        for (const l of layers) {
          if (checkbox.checked) l.addTo(leafletMap); else leafletMap.removeLayer(l);
        }
      });

      const swatch = document.createElement("span");
      swatch.className = "line-swatch";
      swatch.style.background = route.color;

      const label = document.createElement("span");
      label.textContent = `${route.name} — ${rep.firstStop} → ${rep.lastStop}`;

      row.appendChild(checkbox);
      row.appendChild(swatch);
      row.appendChild(label);
      section.appendChild(row);
    }
    container.appendChild(section);
  }
}

function setAllBusLines(show) {
  document.querySelectorAll("#line-panel-groups input[type=checkbox]").forEach((cb) => {
    cb.checked = show;
    cb.dispatchEvent(new Event("change"));
  });
}

function downloadGeoJson(routes, filenameBase) {
  const features = [];
  for (const route of routes) {
    for (const variant of route.variants) {
      features.push({
        type: "Feature",
        properties: {
          id: route.id, name: route.name, longName: route.longName, color: route.color,
          direction: variant.dir, firstStop: variant.firstStop, lastStop: variant.lastStop,
        },
        geometry: { type: "LineString", coordinates: variant.coords.map(([lat, lon]) => [lon, lat]) },
      });
    }
  }
  const geojson = { type: "FeatureCollection", features };
  const blob = new Blob([JSON.stringify(geojson)], { type: "application/geo+json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${filenameBase}.geojson`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ------------------------------------------------------------------
   Téléchargement
------------------------------------------------------------------- */

function serializeSvg(svg) {
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", SVG_NS);
  return new XMLSerializer().serializeToString(clone);
}

function downloadSvg(svg, filenameBase) {
  const source = serializeSvg(svg);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filenameBase}.svg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadPng(svg, filenameBase) {
  const scale = 2.5;
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
      a.download = `${filenameBase}.png`;
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
   Écrans : accueil (liste de cartes) / détail (plan + téléchargements)
------------------------------------------------------------------- */

let currentSvg = null;
let currentNetwork = null;

function renderHome() {
  const list = document.getElementById("card-list");
  list.innerHTML = "";
  for (const key of Object.keys(NETWORKS)) {
    const network = NETWORKS[key];
    const card = document.createElement("button");
    card.type = "button";
    card.className = "map-card";
    card.addEventListener("click", () => navigate(key));

    const thumbWrap = document.createElement("div");
    thumbWrap.className = "map-card-thumb";
    if (network.type === "geo") {
      loadBusData().then(() => thumbWrap.appendChild(buildBusThumbSvg(network)));
    } else {
      thumbWrap.appendChild(buildThumbSvg(network));
    }

    const scrim = document.createElement("div");
    scrim.className = "map-card-scrim";

    const titleWrap = document.createElement("div");
    titleWrap.className = "map-card-title";
    const mainSpan = document.createElement("span");
    mainSpan.className = "map-card-title-main";
    mainSpan.textContent = network.title;
    const subSpan = document.createElement("span");
    subSpan.className = "map-card-title-sub";
    subSpan.textContent = network.subtitle;
    titleWrap.appendChild(mainSpan);
    titleWrap.appendChild(subSpan);

    card.appendChild(thumbWrap);
    card.appendChild(scrim);
    card.appendChild(titleWrap);
    list.appendChild(card);
  }
}

function renderDetail(key) {
  const network = NETWORKS[key];
  currentNetwork = network;

  const isGeo = network.type === "geo";
  document.getElementById("toolbar-schematic").classList.toggle("hidden", isGeo);
  document.getElementById("toolbar-geo").classList.toggle("hidden", !isGeo);
  document.getElementById("map-container").classList.toggle("hidden", isGeo);
  document.getElementById("geo-view").classList.toggle("hidden", !isGeo);

  if (isGeo) {
    loadBusData().then((routes) => renderBusMap(network, routes));
    return;
  }

  currentSvg = buildNetworkSvg(network);
  const container = document.getElementById("map-container");
  container.innerHTML = "";
  container.appendChild(currentSvg);
  container.scrollTop = 0;
  container.scrollLeft = 0;
}

function showView(name) {
  const isHome = name === "home";
  document.getElementById("view-home").classList.toggle("hidden", !isHome);
  document.getElementById("view-detail").classList.toggle("hidden", isHome);
  document.getElementById("back-btn").classList.toggle("hidden", isHome);
  document.getElementById("app-title").textContent = isHome ? APP_TITLE : currentNetwork.appTitle;
}

function navigate(key) {
  location.hash = key ? `#${key}` : "";
}

function applyRoute() {
  const key = location.hash.replace("#", "");
  if (key && NETWORKS[key]) {
    renderDetail(key);
    showView("detail");
  } else {
    showView("home");
    renderHome();
  }
}

/* ------------------------------------------------------------------
   Thème (bouton réglages)
------------------------------------------------------------------- */

function initTheme() {
  let theme = "light";
  try { theme = localStorage.getItem("lille-plans-theme") || "light"; } catch (e) { /* ignore */ }
  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("lille-plans-theme", next); } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------------
   Init
------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  document.getElementById("app-title").textContent = APP_TITLE;

  document.getElementById("back-btn").addEventListener("click", () => navigate(""));
  document.getElementById("settings-fab").addEventListener("click", toggleTheme);
  document.getElementById("btn-png").addEventListener("click", () => downloadPng(currentSvg, currentNetwork.filenameBase));
  document.getElementById("btn-svg").addEventListener("click", () => downloadSvg(currentSvg, currentNetwork.filenameBase));
  document.getElementById("btn-geojson").addEventListener("click", () => downloadGeoJson(busData || [], currentNetwork.filenameBase));
  document.getElementById("btn-toggle-panel").addEventListener("click", () => {
    document.getElementById("line-panel").classList.toggle("hidden");
    setTimeout(() => leafletMap && leafletMap.invalidateSize(), 60);
  });
  document.getElementById("btn-lines-all").addEventListener("click", () => setAllBusLines(true));
  document.getElementById("btn-lines-none").addEventListener("click", () => setAllBusLines(false));

  window.addEventListener("hashchange", applyRoute);
  applyRoute();
});
