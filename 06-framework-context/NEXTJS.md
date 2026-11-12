# Contexte pour une reprise Next.js

Aucun projet Next.js ni route n’a été créé. Ce document fournit le contexte d’architecture, pas du code d’application.

La reprise pourra utiliser l’App Router avec des gabarits de pages alimentés par le CMS migré. Les pages et textes statiques sont de bons candidats au rendu serveur ou statique ; les menus, onglets et animations nécessitant le navigateur devront être isolés dans des composants client. Les API et conventions exactes sont à vérifier dans la version Next.js choisie pour l’implémentation.

Le routage doit conserver le français à la racine et les cinq préfixes internationaux, les slugs traduits, les pages CMS et les pages statiques particulières. Les fichiers `routes-and-seo.csv`, `sitemap.xml`, `page-manifest.json` et les exports CMS apportent les correspondances à reprendre.

Les redirections de Webflow doivent être adaptées au système de redirection choisi, en préservant les query strings d’acquisition et en vérifiant le comportement des règles génériques. Les métadonnées, canoniques, Open Graph, données structurées, hreflang, robots et sitemap doivent être reconstruits à partir des sources archivées.

Les fonts et médias peuvent être auto-hébergés grâce aux fichiers téléchargés et aux manifestes URL → fichier. Ne pas substituer une police ou une image approchante lorsque l’original est disponible. Les scripts de tracking et leurs stratégies de chargement doivent être décidés séparément des interactions visuelles, avec contrôle des doubles événements lors des navigations côté client.

Prévoir les services de remplacement des formulaires, de la recherche et des outils intégrés avant de déclarer une parité fonctionnelle. Le skill `next-best-practices` a été consulté pour cadrer ce document ; aucune règle de ce skill n’a déclenché d’implémentation ou de publication.
