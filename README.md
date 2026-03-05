# Miracle Arena For All Nations (MAFAN) Website

A single-page church website for **Miracle Arena For All Nations**, matching the design of miraclearena.ca with your content.

## Contents

- **index.html** — Main page with all sections (hero, mission, community, ministries, pastors’ welcome, service times, verse, events, sermons, donate, contact).
- **styles.css** — Layout and styling (purple/yellow/white theme, responsive).
- **app.js** — Smooth scroll, active nav on scroll, footer year.
- **assets/** — Add `pastors.jpg` here for the hero image (see `assets/README.md`).

## How to run locally

1. **Simple HTTP server (recommended)**  
   From the `mafan-website` folder:
   - **Node:** `npx serve .` then open http://localhost:3000
   - **Python 3:** `python -m http.server 8080` then open http://localhost:8080

2. **Open file directly**  
   Double-click `index.html` or open it from your browser. Note: some features (e.g. smooth scroll to anchors) work best when served over HTTP.

## Customization

- **Prayer line / email / social links:** Edit the utility bar and contact section in `index.html`.
- **Service times:** Update the “Join Us For Fellowship” section in `index.html`.
- **Events:** Edit the “What’s Next On Our Calendar” block and add more event cards as needed.
- **Colors/fonts:** Adjust CSS variables in `styles.css` (`:root`).

## Deploy

Upload the contents of `mafan-website` to any static host (e.g. Netlify, Vercel, GitHub Pages, or your existing miraclearena.ca hosting). No build step required.
