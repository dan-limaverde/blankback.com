# BlankBack Mindfulness Interface

A minimalist terminal-style interface for BlankBack's mindfulness platform.

## Setup

1. Clone this repository
2. Open `index.html` in your browser
3. For development, use a local server (e.g., `python -m http.server`)

## Deployment

This site is configured for GitHub Pages with a custom domain. To deploy:

1. Push to the `main` branch
2. Go to repository Settings > Pages
3. Ensure custom domain is set to `blankback.com`
4. Wait for GitHub Pages to build and deploy

## Domain Configuration

Add these DNS records to your domain provider:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   your-username.github.io
