# MAFAN Website Assets

Images used by the website (paths are relative to the site root):

## Main assets (this folder)

| File | Usage |
|------|--------|
| **logo.png** | Ministry logo in the header (Miracle Arena For All Nations — God's Ambassadors). |
| **pastor.jpg** | Hero image on the home section (Dr. Pst. Viome Gumbs-Dyer, Senior Pastor). If missing, a placeholder is shown. Recommended: ~600×500 px or similar. |

## Credentials (subfolder)

| Folder | Usage |
|--------|--------|
| **credentials/** | Certificate and diploma images. See `credentials/README.md` for filenames. |

## Gallery (subfolder)

| Folder | Usage |
|--------|--------|
| **gallery/** | Photos shown in the Gallery section, grouped by category: `pastor/`, `facility/`, `ceremonies/`, `leadership/`, `children-youth/`, `community/`, `events/`. Add new images in the right category and reference them in `index.html` if you want them on the site. |

All image paths in `index.html` use `assets/` or `assets/credentials/` or `assets/gallery/` so they work when the site is served from the `mafan-website` folder.
