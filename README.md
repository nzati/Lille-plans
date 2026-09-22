# Lille Plans

Application web statique, façon appli mobile (écran d'accueil en liste de cartes + bouton réglages), qui présente les plans des réseaux de transport de Lille.

Trois réseaux sont disponibles :
- **Métro** — lignes 1 et 2, 60 stations — plan schématique façon RATP (lignes à angles de 45°/90°, stations en pastilles, correspondances en gros ronds, texte incliné), téléchargeable en PNG ou SVG
- **Tramway (Mongy)** — lignes R et T, 36 stations, tronc commun jusqu'à Croisé-Laroche — même style schématique, téléchargeable en PNG ou SVG
- **Bus** — 154 lignes, tracés réels sur fond de carte (OpenStreetMap via Leaflet), à partir des données ouvertes GTFS d'Ilévia, avec panneau de filtre par ligne et export des données en GeoJSON

| Plan du métro | Plan du tramway | Plan des bus |
| --- | --- | --- |
| ![Aperçu du plan du métro de Lille](screenshot.png) | ![Aperçu du plan du tramway de Lille](screenshot-tram.png) | ![Aperçu du plan des bus de Lille](screenshot-bus.png) |

## Utilisation

Aucune dépendance à installer ni build : ouvrir `index.html` dans un navigateur (les librairies Leaflet sont chargées depuis un CDN), ou lancer un petit serveur local :

```bash
npx serve .
```

Sur l'écran d'accueil, chaque carte ouvre le plan correspondant :
- **Métro / Tramway** : boutons **Télécharger en PNG** (export raster haute résolution) et **Télécharger en SVG** (export vectoriel éditable)
- **Bus** : carte interactive (zoom/déplacement), panneau **Filtrer les lignes** groupé par famille (Lianes, Citadines, Corolle, Express, Scolaires…) et bouton **Télécharger les données (GeoJSON)**

Le bouton ⚙ en bas à droite bascule entre thème clair et sombre.

## Données

- Métro et tramway : topologie et noms de stations issus de Wikipédia (« Ligne 1 » et « Ligne 2 du métro de Lille », « Tramway du Grand Boulevard »)
- Bus : tracés issus des données ouvertes GTFS d'Ilévia ([transport.data.gouv.fr](https://transport.data.gouv.fr)), reconstruits ligne par ligne à partir des arrêts (le jeu de données ne fournit pas de tracés `shapes.txt`, donc chaque ligne relie ses arrêts par segments droits). Le script de génération est dans `data/` ; `data/bus-routes.json` est le jeu de données utilisé par l'application.

Réseau exploité par Ilévia (Métropole Européenne de Lille).

## Avertissement

Plans non contractuels, réalisés à titre personnel.
