# BookSwap Frontend Application Delivery

BookSwap is a responsive React + Vite frontend prototype for a community book exchange platform. It uses React Router, local JSON records, localStorage, and a simulated client-side JWT session. There is no backend, database, API, remote storage, or real authentication server.

## Setup

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Routes

Public: `/`, `/register`, `/login`, `/books`, `/books/:bookId`, `/community`.
Protected: `/dashboard`, `/profile`, `/books/new`, `/books/:bookId/edit`, `/requests`, `/requests/history`.
Unknown routes show a not-found state with a Browse link.

## Demo accounts

- Maya Verma — `maya@demo.local` / `ReadMore8`
- Arjun Mehta — `arjun@demo.local` / `ShelfLife7`
- Nisha Rao — `nisha@demo.local` / `BookTrail9`
- Kabir Singh — `kabir@demo.local` / `PagesOpen6`
- Tara Iyer — `tara@demo.local` / `QuietRead5`
- Dev Shah — `dev@demo.local` / `StoryStack4`

## Simulated JWT session

Login and registration create a three-part JWT-style token in localStorage. The token payload stores user id, email, and expiry. Protected routes decode and validate the token locally. Sign out and Reset demo data clear the token.

## Local data and data reset

The app loads supplied users, books, exchange requests, and community activity from `src/data`. Demo interactions are preserved in localStorage. Profile includes **Reset demo data**, which restores supplied records and signs the user out.

## Location handling

Every listing has an exchange location. Supplied records use the owner's neighborhood as the default exchange location. New and edited books require a location. Request records display the book location for handover planning.

## Responsive behavior

Layouts support 320px, 768px, and 1440px+ review widths. Navigation collapses on smaller screens, controls remain touch-friendly, cards and forms stack, and request records remain readable without horizontal page scroll.

## Accessibility

The app uses semantic links, buttons, forms, labels, focus indicators, status text, toast messages, and dialog roles. Primary controls meet the 44px touch target requirement.

## Project structure

- `src/assets` supplied logo, covers, and avatars
- `src/data` supplied JSON records
- `src/hooks` shared app state and auth behavior
- `src/styles` shared styling
- `screenshots` desktop, tablet, and mobile review placeholders

## Limitations

This is a frontend prototype. It does not include backend services, server-verified authentication, chat, maps, notifications, social sign-in, ratings, or admin moderation.
