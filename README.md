# tombrookes.dev

Plain HTML, CSS and a little JavaScript. No build step, so it works on GitHub Pages as it is.

## Files
- `index.html` home page (intro and About)
- `about.html` redirects to the home page, so old links still work
- `cv.html` CV, with a Download PDF button (put your PDF at `cv/tom-brookes-cv.pdf`)
- `projects.html` and `client-work.html` the sideways pages
- `css/style.css` all the styling. Colours and fonts are at the top in `:root`
- `js/slides.js` arrows, dots, counter, keyboard and mouse wheel for the sideways pages

## How the sideways pages work
- `<body class="is-sideways">` locks the page to the screen height.
- `.slides` scrolls left and right with `scroll-snap-type: x mandatory`.
- Each `.slide` is `flex: 0 0 100%`, so it is exactly one screen wide and snaps into place.
- The snapping is pure CSS. If you deleted `slides.js`, swiping and trackpads would still work; you'd only lose the buttons, dots and wheel.

## Adding a project
Copy one whole `<article class="slide">…</article>` block, change the `id`, text and image.
The dots and the counter update themselves.

## Images
Screenshots live in `images/` and are referenced with relative paths (`images/...`).
The striped boxes are placeholders for screenshots you don't have yet.

## Hosting
Served by GitHub Pages from the repo root. `CNAME` points the site at tombrookes.dev, so keep it.
