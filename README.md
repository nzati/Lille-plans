# Plans de Lille

Application web statique, façon appli mobile (écran d'accueil en liste de cartes + bouton réglages), qui génère des plans schématiques des réseaux de transport de Lille dans le même style visuel que les plans RATP : lignes colorées à angles de 45°/90°, stations en pastilles, correspondances en gros ronds, texte incliné. Chaque plan peut être téléchargé en PNG haute résolution ou en SVG vectoriel.

Deux réseaux sont disponibles :
- **Métro** — lignes 1 et 2, 60 stations
- **Tramway (Mongy)** — lignes R et T, 36 stations, tronc commun jusqu'à Croisé-Laroche

| Plan du métro | Plan du tramway |
| --- | --- |
| ![Aperçu du plan du métro de Lille](screenshot.png) | ![Aperçu du plan du tramway de Lille](screenshot-tram.png) |

## Utilisation

Aucune dépendance ni build : ouvrir `index.html` dans un navigateur, ou lancer un petit serveur local :

```bash
npx serve .
```

Sur l'écran d'accueil, chaque carte ouvre le plan correspondant avec deux boutons de téléchargement :
- **Télécharger en PNG** — export raster haute résolution
- **Télécharger en SVG** — export vectoriel éditable

Le bouton ⚙ en bas à droite bascule entre thème clair et sombre.

## Données

Topologie et noms de stations issus de Wikipédia :
- « Ligne 1 » et « Ligne 2 du métro de Lille »
- « Tramway du Grand Boulevard » (tramway Mongy)

Réseau exploité par Ilévia.

## Avertissement

Plans schématiques non contractuels, réalisés à titre personnel.
