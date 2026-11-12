# Inventaire CMS

Export réalisé le 12 novembre 2026 dans le Designer Webflow, collection par collection et langue par langue.

**78 CSV, 78 équivalents JSON, 2 367 entrées localisées.** Le total correspond exactement aux 2 367 éléments annoncés dans les réglages généraux Webflow lors de la collecte. Les différences de quantité entre les langues sont présentes dans la source ; ce ne sont pas des traductions inventées ni des entrées créées pour remplir une langue.

| Collection | FR | EN | ES | NL | DE | PT |
|---|---:|---:|---:|---:|---:|---:|
| Alternatives | 45 | 47 | 47 | 47 | 47 | 45 |
| Authors | 1 | 1 | 1 | 1 | 1 | 1 |
| Blogs | 125 | 101 | 100 | 101 | 100 | 117 |
| Careers | 1 | 1 | 1 | 1 | 1 | 1 |
| Categories | 8 | 8 | 8 | 8 | 8 | 8 |
| Copyfy Vs | 30 | 30 | 30 | 30 | 30 | 30 |
| Demo shops | 2 | 2 | 2 | 2 | 2 | 2 |
| FAQs | 154 | 162 | 161 | 161 | 161 | 154 |
| Features | 6 | 6 | 6 | 6 | 6 | 6 |
| Features Copies | 5 | 5 | 5 | 5 | 5 | 5 |
| Free Tool Lists | 12 | 12 | 12 | 12 | 12 | 12 |
| FreeTools | 12 | 12 | 12 | 12 | 12 | 12 |
| Tags | 5 | 5 | 5 | 5 | 5 | 5 |
| **Total** | 406 | 392 | 390 | 391 | 390 | 398 |

Les CSV sont les données brutes exportées par Webflow. Les JSON conservent les mêmes noms de champs et les mêmes valeurs sous forme de chaînes ; aucune traduction, normalisation éditoriale ou réécriture du HTML riche n’a été appliquée.

- `cms-manifest.json` : collection, langue, identifiants, nombre de lignes, colonnes, états Draft/Archived, chemins et SHA-256.
- `locale-map.json` : correspondance entre langue et identifiant Webflow.
- `schemas/` : schémas lus dans l’interface Webflow, avec types et indications de champs requis.
- `schema-field-types.json` : transcription structurée des types visibles dans ces schémas. Les fichiers texte de l’interface restent la source de référence si une présentation de champ est ambiguë.
- `json/<langue>/` : copie JSON de chaque CSV.

Préserver `Collection ID`, `Locale ID`, `Item ID`, `Slug`, `Archived`, `Draft` et les dates. Les références et multi-références doivent être résolues par le développeur selon leur représentation réelle dans le CSV ; ne pas utiliser le titre traduit comme clé de jointure.
