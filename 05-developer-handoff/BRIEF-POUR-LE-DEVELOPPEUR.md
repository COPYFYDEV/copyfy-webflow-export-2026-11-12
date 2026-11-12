# Brief de reprise pour le développeur

## Résultat recherché

Reproduire fidèlement le site marketing Copyfy à partir de ses vraies sources : design, responsive, contenus, langues, liens, interactions, SEO, redirections et mesure d’acquisition. La présente livraison s’arrête à l’export et au contexte ; aucune implémentation ou publication n’a été autorisée dans ce travail.

## Données disponibles

Deux exports natifs Webflow, dont le ZIP transmis par l’utilisateur ; 78 CSV et JSON couvrant les 13 collections dans six langues ; 2 367 entrées localisées ; 1 410 fichiers HTML publics ; 3 873 ressources téléchargées ; 280 redirections ; réglages de polices, SEO, domaines et intégrations ; code global de head/footer et code embarqué ; schémas CMS et inventaire des formulaires.

Commencer par `CONTEXTE-MIGRATION.md`, `POINTS-DE-VIGILANCE.md`, puis les manifestes. Ne pas confondre le Designer courant avec le contenu publié, ni le site marketing avec l’application `app.copyfy.io`.

## Critères à utiliser lors de la future reconstruction

- Choix explicite de l’état de référence quand les deux archives et la publication diffèrent.
- Identité visuelle et polices originales, sections et contenu fidèles, comparaison à plusieurs tailles dont les breakpoints réels du CSS.
- Navigation, menus mobiles, périodicité des tarifs, FAQ, carrousels, compteurs et animations vérifiés sur les états réellement visibles.
- Import des références CMS, slugs traduits, textes riches, images, états de brouillon et d’archive ; aucun remplissage automatique des langues manquantes sans décision explicite.
- Maintien des URL, redirections et paramètres d’acquisition ; vérification des métadonnées, canoniques, hreflang et données structurées.
- Fonctionnement réel des formulaires et des outils intégrés, avec une décision explicite sur leurs backends et hébergements.
- Configuration du consentement et du tracking vérifiée avec le propriétaire ; pas de doubles événements lors des navigations.
- Écarts à la source et limites restantes écrits, au lieu d’une affirmation de parité fondée uniquement sur une capture.

Les documents sous `06-framework-context/` cadrent les points particuliers à CodePen, React et Next.js. Ils ne contiennent pas de starter ni de conversion générée.
