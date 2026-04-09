# AGENTS.md

This file gives coding agents project-specific instructions for working in this repository.

## Project

- App type: React + Vite
- Package manager: npm
- Dev command in PowerShell: `npm.cmd run dev`
- Build command in PowerShell: `npm.cmd run build`

## Code Structure

- Keep `src/App.jsx` focused on composition and shared state.
- Put display-only UI into small child components when a section becomes bulky.
- Keep summary-specific logic in `src/Summary.jsx`.
- Keep transaction form UI in `src/TransactionForm.jsx`.
- Keep transaction list and filtering UI in `src/TransactionList.jsx`.

## Data Handling

- Treat transaction amounts as numbers for calculations.
- When reading user input from form fields, convert numeric values before storing or summing them.
- Do not change seeded transaction data unless the user explicitly asks for sample data changes.

## Styling

- Reuse the existing styles in `src/App.css` unless there is a clear reason to split CSS further.
- Preserve the current simple visual style unless the user requests a redesign.

## Validation

- After code changes, prefer verifying with `npm.cmd run build`.
- If PowerShell blocks `npm`, use `npm.cmd` instead of `npm`.

## Change Style

- Prefer small, focused components over large files.
- Avoid unnecessary abstractions for this small app.
- Keep naming straightforward and beginner-friendly.
