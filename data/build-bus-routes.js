/* ------------------------------------------------------------------
   Régénère data/bus-routes.json à partir du GTFS Ilévia.

   1. Télécharger et dézipper https://media.ilevia.fr/opendata/gtfs.zip
      dans ce dossier (data/), à côté de ce script.
   2. node data/build-bus-routes.js

   Le GTFS Ilévia ne fournit pas de shapes.txt (tracés d'itinéraires) :
   chaque ligne de bus est donc reconstruite en reliant par segments
   droits les arrêts (dans l'ordre) du trajet le plus long de chaque
   direction (aller / retour), pris comme motif représentatif de la ligne.
------------------------------------------------------------------- */

const fs = require("fs");
const readline = require("readline");

const DIR = __dirname;

function splitCsvLine(line) {
  // simple CSV split respecting double-quoted fields (GTFS fields rarely need it, but be safe)
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; } else { inQ = false; }
      } else cur += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { out.push(cur); cur = ""; }
      else cur += c;
    }
  }
  out.push(cur);
  return out;
}

function loadCsvSync(path) {
  const text = fs.readFileSync(path, "utf8");
  const lines = text.split(/\r?\n/);
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  const header = splitCsvLine(lines[0]);
  const idx = {};
  header.forEach((h, i) => (idx[h] = i));
  const rows = [];
  for (let i = 1; i < lines.length; i++) rows.push(splitCsvLine(lines[i]));
  return { idx, rows };
}

async function main() {
  console.log("Loading routes.txt ...");
  const routesCsv = loadCsvSync(`${DIR}/routes.txt`);
  const busRoutes = new Map(); // route_id -> {shortName, longName, color, textColor}
  for (const r of routesCsv.rows) {
    const routeType = r[routesCsv.idx.route_type];
    if (routeType !== "3") continue; // bus only
    const id = r[routesCsv.idx.route_id];
    busRoutes.set(id, {
      shortName: r[routesCsv.idx.route_short_name],
      longName: r[routesCsv.idx.route_long_name],
      color: r[routesCsv.idx.route_color] || "1a1a1a",
      textColor: r[routesCsv.idx.route_text_color] || "ffffff",
    });
  }
  console.log("Bus routes:", busRoutes.size);

  console.log("Loading trips.txt ...");
  const tripsCsv = loadCsvSync(`${DIR}/trips.txt`);
  const tripInfo = new Map(); // trip_id -> {routeId, directionId}
  for (const t of tripsCsv.rows) {
    const routeId = t[tripsCsv.idx.route_id];
    if (!busRoutes.has(routeId)) continue;
    const tripId = t[tripsCsv.idx.trip_id];
    const directionId = t[tripsCsv.idx.direction_id] || "0";
    tripInfo.set(tripId, { routeId, directionId });
  }
  console.log("Bus trips:", tripInfo.size);

  console.log("Pass 1/2: counting stops per trip (streaming stop_times.txt) ...");
  const tripStopCount = new Map(); // trip_id -> count (only for trips in tripInfo)
  {
    const rl = readline.createInterface({ input: fs.createReadStream(`${DIR}/stop_times.txt`), crlfDelay: Infinity });
    let header = null, idxTrip, idxStopId, idxSeq;
    let lineNo = 0;
    for await (const line of rl) {
      lineNo++;
      if (lineNo === 1) {
        header = splitCsvLine(line);
        idxTrip = header.indexOf("trip_id");
        continue;
      }
      if (!line) continue;
      const comma1 = line.indexOf(",");
      const tripId = line.slice(0, comma1);
      if (!tripInfo.has(tripId)) continue;
      tripStopCount.set(tripId, (tripStopCount.get(tripId) || 0) + 1);
    }
  }
  console.log("Trips with stop counts:", tripStopCount.size);

  // pick best (longest) trip per route+direction
  const bestTrip = new Map(); // `${routeId}|${dir}` -> {tripId, count}
  for (const [tripId, count] of tripStopCount) {
    const info = tripInfo.get(tripId);
    const key = `${info.routeId}|${info.directionId}`;
    const cur = bestTrip.get(key);
    if (!cur || count > cur.count) bestTrip.set(key, { tripId, count });
  }
  console.log("Route+direction patterns selected:", bestTrip.size);

  const selectedTripIds = new Set([...bestTrip.values()].map((v) => v.tripId));

  console.log("Pass 2/2: extracting stop sequences for selected trips ...");
  const tripStops = new Map(); // trip_id -> [{stopId, seq}]
  {
    const rl = readline.createInterface({ input: fs.createReadStream(`${DIR}/stop_times.txt`), crlfDelay: Infinity });
    let header = null, idxTrip, idxStopId, idxSeq;
    let lineNo = 0;
    for await (const line of rl) {
      lineNo++;
      if (lineNo === 1) {
        header = splitCsvLine(line);
        idxTrip = header.indexOf("trip_id");
        idxStopId = header.indexOf("stop_id");
        idxSeq = header.indexOf("stop_sequence");
        continue;
      }
      if (!line) continue;
      const comma1 = line.indexOf(",");
      const tripId = line.slice(0, comma1);
      if (!selectedTripIds.has(tripId)) continue;
      const f = splitCsvLine(line);
      const stopId = f[idxStopId];
      const seq = parseInt(f[idxSeq], 10);
      if (!tripStops.has(tripId)) tripStops.set(tripId, []);
      tripStops.get(tripId).push({ stopId, seq });
    }
  }

  console.log("Loading stops.txt ...");
  const stopsCsv = loadCsvSync(`${DIR}/stops.txt`);
  const stopLoc = new Map();
  for (const s of stopsCsv.rows) {
    stopLoc.set(s[stopsCsv.idx.stop_id], {
      name: s[stopsCsv.idx.stop_name],
      lat: parseFloat(s[stopsCsv.idx.stop_lat]),
      lon: parseFloat(s[stopsCsv.idx.stop_lon]),
    });
  }

  console.log("Building route features ...");
  const routes = [];
  for (const [key, best] of bestTrip) {
    const [routeId, directionId] = key.split("|");
    const meta = busRoutes.get(routeId);
    const stopsArr = tripStops.get(best.tripId) || [];
    stopsArr.sort((a, b) => a.seq - b.seq);
    const coords = [];
    const stopNames = [];
    for (const s of stopsArr) {
      const loc = stopLoc.get(s.stopId);
      if (!loc || Number.isNaN(loc.lat) || Number.isNaN(loc.lon)) continue;
      coords.push([Math.round(loc.lat * 1e5) / 1e5, Math.round(loc.lon * 1e5) / 1e5]);
      stopNames.push(loc.name);
    }
    if (coords.length < 2) continue;
    routes.push({
      id: routeId,
      dir: directionId,
      name: meta.shortName,
      longName: meta.longName,
      color: "#" + meta.color,
      stopCount: coords.length,
      firstStop: stopNames[0],
      lastStop: stopNames[stopNames.length - 1],
      coords,
    });
  }

  // group by routeId (merge directions under one line entry, keep both variants for drawing)
  const byRoute = new Map();
  for (const r of routes) {
    if (!byRoute.has(r.id)) byRoute.set(r.id, { id: r.id, name: r.name, longName: r.longName, color: r.color, variants: [] });
    byRoute.get(r.id).variants.push({ dir: r.dir, coords: r.coords, firstStop: r.firstStop, lastStop: r.lastStop, stopCount: r.stopCount });
  }

  const out = [...byRoute.values()].sort((a, b) => a.name.localeCompare(b.name, "fr", { numeric: true }));
  console.log("Final bus lines:", out.length);

  const totalPoints = out.reduce((acc, r) => acc + r.variants.reduce((a, v) => a + v.coords.length, 0), 0);
  console.log("Total coordinate points (before simplification):", totalPoints);

  fs.writeFileSync(`${DIR}/bus-routes.json`, JSON.stringify(out));
  console.log("Wrote bus-routes.json", (fs.statSync(`${DIR}/bus-routes.json`).size / 1024 / 1024).toFixed(2), "MB");
}

main().catch((e) => { console.error(e); process.exit(1); });
