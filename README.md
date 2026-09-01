# Punjab Result Portal

A plain HTML/CSS/JS website. No installation, no build step, no server
required — upload the files as-is to any host (GitHub Pages, Netlify,
shared hosting, etc.) and it works. It also now opens correctly by
double-clicking index.html directly (all paths are relative).

## What's in this folder
- index.html, about.html — main pages
- 9th/10th/11th/12th-class-result.html — one page per class
- *-board-result.html — one page per Board (9 boards)
- css/style.css — all styling
- js/config.js — Board names, official website links, and each
  class's result date
- js/main.js — makes the "Check Result" button redirect to the
  right Board, and keeps the status text on the page up to date
- robots.txt, sitemap.xml — for Google

## To update a Board's link
Open js/config.js in Notepad, find that Board's resultUrl: line,
replace the link, save. That's it — no other file needs to change.

## When a result is announced
Open that class's (or Board's) .html file in Notepad, update the
<title> and <meta name="description" ...> lines near the top,
save, re-upload that one file.

## Deploying
Upload everything in this folder to your host, keeping the folder
structure (css/ and js/ folders as they are).
