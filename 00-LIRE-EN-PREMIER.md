# Export Copyfy — données et contexte de migration

Collecte du **12 novembre 2026**, depuis le compte Webflow déjà ouvert et le site public. Copie publiée sur GitHub ; voir `PUBLICATION-NOTES.md` pour les masquages de confidentialité. Aucune réécriture du site en React/Next.js, aucun projet CodePen créé et aucune publication effectuée.

## Contenu vérifié

- Deux archives Webflow natives, dont celle fournie par l’utilisateur : `copyfy-624656.webflow-11.zip`.
- Deux dossiers source décompressés ; chaque archive comprend **48 fichiers HTML** et les ressources natives associées.
- **13 collections CMS × 6 langues = 78 exports CSV**, plus leurs équivalents JSON : **2 367 entrées localisées**, total identique à celui affiché par Webflow.
- **1 410 URL dans le sitemap** ; **1 411 requêtes HTML réussies et 1 410 fichiers de pages uniques**, en incluant une variante de l’URL de page d’accueil. Ce sont des URL et variantes linguistiques, pas 1 411 mises en page distinctes.
- **3 873 ressources téléchargées** : images, feuilles de styles, scripts, polices, vidéos et documents HTML d’outils intégrés, répertoriés dans un manifeste.
- **280 redirections**, code global complet, réglages SEO, domaines, polices, intégrations, variables CSS, breakpoints et sources des interactions.

## Par où commencer

1. Lire `05-developer-handoff/CONTEXTE-MIGRATION.md` et `POINTS-DE-VIGILANCE.md`.
2. Ouvrir `01-native-export/supplied-source/` pour le ZIP transmis par l’utilisateur ; comparer si besoin avec `01-native-export/source/`, export téléchargé pendant cette collecte.
3. Utiliser `02-cms/INVENTAIRE.md`, les CSV/JSON et les schémas pour reconstruire le modèle de contenu.
4. Utiliser `03-published-site/pages/` comme référence du contenu effectivement publié dans chaque langue. Ces HTML bruts gardent leurs URL et scripts d’origine ; ils ne constituent pas un miroir hors ligne avec liens réécrits.
5. Consulter `06-framework-context/` pour les consignes de reprise CodePen, React et Next.js, sans implémentation générée.

## Limites principales

Un placeholder SVG générique Webflow répond HTTP 403 ; il est listé dans le rapport. Les services hébergés — formulaires Webflow, recherche, backends des outils intégrés, comptes de tracking — ne se transfèrent pas avec des fichiers HTML. Le dossier conserve leur configuration observable et les dépendances nécessaires à la reprise, sans jeton privé Webflow ni historique des prospects.

`MANIFEST-SHA256.txt` permet de vérifier les fichiers du dossier. Le rapport `05-developer-handoff/COUVERTURE.json` décrit précisément le périmètre.
