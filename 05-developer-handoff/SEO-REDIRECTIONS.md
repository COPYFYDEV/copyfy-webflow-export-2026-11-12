# SEO, langues et redirections

- `03-published-site/sitemap.xml` : sitemap public original, avec ses variantes linguistiques.
- `03-published-site/robots.txt` : réponse publique archivée.
- `routes-and-seo.csv` : inventaire lisible des URL demandées, URL finales, titres, descriptions, canoniques et chemins des HTML capturés.
- `03-published-site/page-manifest.json` : métadonnées et balises de liens relevées par page.
- `04-design-and-settings/redirects.csv` et `.json` : les 280 redirections exportées depuis Webflow.
- `webflow-seo.txt` et `webflow-publishing.txt` : réglages observés dans le compte.

Le domaine canonique global est `https://www.copyfy.io`. `www.copyfy.io` est le domaine par défaut dans Webflow ; le domaine nu est aussi configuré. Les deux sont indiqués comme proxifiés. L’indexation du sous-domaine Webflow est désactivée ; le sitemap est généré automatiquement. La règle robots personnalisée observée bloque `/old/`.

Conserver les anciennes URL, les langues, les canoniques, les Open Graph, les données structurées et les redirections contenant des paramètres d’acquisition. Les URL du sitemap et les entrées CMS ne sont pas nécessairement en correspondance bijective : certaines entrées sont des blocs ou références, et certaines pages sont statiques.

L’export documente la configuration Webflow et la réponse publique, sans accès aux règles du proxy/DNS, à Search Console ou aux comptes publicitaires. Les en-têtes HTTP, caches et redirections supplémentaires propres à l’hébergeur de destination devront être vérifiés lors de la future migration.
