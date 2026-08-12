# Hanfu Dress Guide

The most complete English-language resource for traditional Chinese **Hanfu dresses**. Covers dynasty styles (Tang, Song, Ming, Han), how-to-wear guides, fabric and color deep-dives, etiquette, sizing, honest buying advice, and East Asian garment comparisons.

Built with [Astro](https://astro.build) — fully static, SEO-optimized (sitemap, schema.org JSON-LD, Open Graph), and deployable anywhere.

## Pages

- **Homepage (pillar)** — `/`
- **Styles** — `/styles/{tang,song,ming,modern,wedding,women,men,kids}`
- **Dynasties** — `/dynasty/{han,tang,song,ming}`
- **Accessories** — `/accessories/{hairpins,fans,shoes,belts}`
- **Guides (10)** — `/guides/{history,meaning,how-to-wear,fabrics,colors,etiquette,hairstyles,washing,sizing,accessories}`
- **Buying (5)** — `/buying/{where-to-buy,best-brands,beginner,authentic,budget}`
- **Comparisons (4)** — `/comparisons/{kimono,hanbok,qipao,cheongsam}`
- **Supplemental** — `/about`, `/newsletter`, `/legal/{contact,privacy,terms}`, `/404`

## Project structure

```text
/
├── public/
│   ├── robots.txt          # references sitemap-index.xml
│   ├── llms.txt            # AI/bot-readable site map
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro    # SEO head: canonical, OG, schema, breadcrumbs
│   ├── components/
│   │   ├── SiteHeader.astro
│   │   ├── SiteFooter.astro
│   │   ├── StyleRecommender.astro
│   │   └── SizeGuide.astro # interactive size calculator
│   ├── styles/global.css   # design tokens + shared component classes
│   └── pages/              # static routes (45 total)
└── astro.config.mjs        # site URL + @astrojs/sitemap
```

## Commands

| Command                  | Action                                    |
| :----------------------- | :---------------------------------------- |
| `npm install`            | Install dependencies                      |
| `npm run dev`            | Dev server at `localhost:4321`             |
| `npm run build`          | Build production site to `dist/` (static) |
| `npm run preview`        | Preview the production build             |
| `npm run astro -- --help`| Astro CLI help                            |

## Content & SEO

- **Breadcrumbs + article schema** on every deep page via `Layout.astro` props.
- **FAQPage** and **HowTo** JSON-LD on the homepage.
- **Sitemap** auto-generated at build (`sitemap-index.xml`), linked from `robots.txt`.
- **llms.txt** for AI/search-engine citation readiness (GEO).