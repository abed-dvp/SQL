# Abed Codelab — SQL

This folder contains the interactive browser version of the SQL course.

## Runtime

The Codelab uses **sql.js**, which runs SQLite in WebAssembly directly in the browser. No backend or database account is required.

Each executable lesson:
1. resets a small practice database,
2. runs your SQL,
3. renders the result as a table,
4. runs the reference solution against the same dataset,
5. compares the results.

MySQL-specific features such as stored procedures, triggers and events are kept as conceptual / Workbench steps because SQLite does not implement the same server-side features.

## Files

- `index.html` — Codelab shell
- `styles.css` — responsive light/dark UI
- `steps.js` — lessons, exercises and solutions
- `app.js` — SQL runtime, result rendering, checks and progress

Progress is stored locally in the browser.