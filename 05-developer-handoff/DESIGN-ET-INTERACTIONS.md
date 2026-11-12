# Design et interactions

## Sources visuelles

Les dossiers natifs comprennent `css/normalize.css`, `css/webflow.css`, la feuille Copyfy, `js/`, `images/`, `videos/` et `fonts/`. Les noms exacts sont conservés dans les archives. Le CSS publié peut être découpé en ressources supplémentaires ; le manifeste du site public donne leur URL et leur fichier local.

Conserver les classes Webflow, attributs `data-w-id`, identifiants d’éléments, SVG, liens, tailles, variantes et ordre des feuilles CSS pendant la comparaison initiale. Les définitions d’interactions Webflow sont compilées dans les scripts exportés et publiés : ce n’est pas un projet d’animations React éditable.

Les sources couvrent notamment navigation et menus, construction animée de la page produit, carrousels de créas/analyses, exemples de boutiques, compteurs, onglets de tarifs, témoignages, résultats membres et FAQ. Le comportement exact reste à vérifier lors de la réimplémentation ; l’export n’est pas un test fonctionnel de ces éléments.

## Typographie et responsive

Les réglages Designer listent Inter et Inter Tight de 100 à 900, ainsi qu’une police TTF personnalisée dont le nom Webflow est conservé. Le HTML publié demande également Vollkorn, en 400/700 normal et italique. Les fichiers récupérés et les déclarations `@font-face` sont archivés.

Breakpoints observés dans le CSS : 479, 767 et 991 px maximum ; 1280, 1440 et 1920 px minimum. Une requête complémentaire commence à 768 px. Voir `responsive-media-queries.json` et les feuilles CSS originales pour les règles complètes.

`css-variables.json` contient les variables relevées dans les styles natifs. `computed-home-en.json` est un échantillon de styles calculés sur l’accueil anglais, avec les dimensions de la fenêtre et les attributs de page ; ce n’est pas une spécification exhaustive de chaque état.

## Captures et limites

Les captures `home-en-full.png` et `home-en-full-initial.png` correspondent à l’accueil anglais dans l’état initial du navigateur. Les sections animées ou paresseusement chargées peuvent rester vides dans une capture pleine page prise sans faire défiler le site. Ces images ne démontrent donc pas que toutes les sections ont été visuellement validées. Les CSS, scripts et médias sont la référence principale pour ces sections.

Aucune comparaison pixel par pixel, aucun audit mobile exhaustif et aucune reconstruction de composant n’ont été effectués. Aucun fichier de design Figma ni projet Webflow interne éditable n’est fabriqué à partir de l’export.
