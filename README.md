# react-booking

A room-booking web app. Users sign in, pick a room and a time slot, and manage their own reservations. Copy is available in Catalan, Spanish, and English.

The app is a single-page React client. Authentication and data live in [Supabase](https://supabase.com/). The production build is published to [GitHub Pages](https://sergialca.github.io/react-booking).

## Tools and frameworks

### Application runtime

**React 18** is the UI library. Components are function components that use hooks (`useState`, `useEffect`, `useContext`). The app mounts with `react-dom`’s `createRoot` API in `src/index.js`.

There is no state-management library. Shared state is React Context, created in `src/context/` and provided from `src/App.js`:

| Context | What it holds |
| --- | --- |
| `LangContext` | Active language (`ca`, `es`, or `en`) |
| `UserContext` | Signed-in user (name, email, token, id) |
| `MenuContext` | Current navigation label |
| `FiltersContext` | Dashboard room and date filters |
| `BookingContext` | The reservation being created |
| `DeleteContext` | The reservation selected for deletion |

**React Router 5** (`react-router` and `react-router-dom`) handles client-side routing. `BrowserRouter` wraps the tree and uses `PUBLIC_URL` as its basename so routes work under the GitHub Pages subpath. `Switch`, `Route`, and `Redirect` in `src/App.js` map `/login`, `/signup`, `/`, `/myspace`, and `/profile`. Protected pages go through `AppRoute`, which redirects unauthenticated users to login.

### Backend

**Supabase** (`@supabase/supabase-js`) is the backend. `src/supabaseClient.js` creates the client from two environment variables:

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

The client is used for two things:

- **Auth.** Email and password sign-up and sign-in, session restore on load (`auth.getSession` and `auth.onAuthStateChange`), and sign-out. The access token and user metadata are stored in `UserContext`.
- **Postgres data.** `src/api/api.js` reads and writes the `rooms`, `bookings`, and `errors` tables through the Supabase query builder (`from(...).select/insert/delete`).

If either environment variable is missing, the client is `null` and API calls throw instead of talking to a backend.

### Dates, forms, and UI libraries

**Moment.js** formats and compares dates. Filter state stores a Moment object plus a locale string (`format("L")`) and a European day string (`D/M/YYYY`). It also detects Sundays so the dashboard can treat that day differently.

**react-dates** supplies the dashboard calendar. The page calls `react-dates/initialize`, loads the library stylesheet, and renders `SingleDatePicker`. Selected days are Moment objects, which is why Moment stays in the project alongside this picker.

**react-select** is the room dropdown on the dashboard.

**react-spinners** (`ClipLoader`) shows a loading indicator on the dashboard, My Space, and submit buttons while a request is in flight.

**react-icons** provides the SVG icons in the navbar and forms (`md`, `bs`, `ti`, and `go` icon sets).

### Styling

**Sass** (`sass` 1.77) compiles component stylesheets. Each page, layout, and component imports its own `.scss` file (for example `dashboard.scss` next to `dashboard.js`). Global rules live in `src/index.css`, and shared font rules live in `src/styles/font.scss`. Create React App compiles Sass automatically; there is no separate PostCSS or Tailwind setup.

### Languages

There is no i18n library. Each screen imports three JSON files (`*Ca.json`, `*Es.json`, `*En.json` under `src/json/`) and picks one from `LangContext`. The language switcher is the floating control built from `floatLang` and `langDropdown`.

### Build toolchain

The project was bootstrapped with **Create React App** and still builds through **react-scripts 5.0.1**. That package owns the toolchain, so Webpack, Babel, the dev server, and the production bundler are not configured in this repo:

- `pnpm start` runs the dev server with hot reload on [http://localhost:3000](http://localhost:3000).
- `pnpm run build` writes an optimized, content-hashed bundle to `build/`.
- ESLint uses the `react-app` config from `package.json`, plus `eslint-plugin-react-hooks`.
- `browserslist` in `package.json` sets the production and development browser targets that Babel and Autoprefixer follow.

`pnpm run eject` would copy that hidden config into the repo. It is one-way and is not required for normal work.

**pnpm 11** (`packageManager` field, lockfile `pnpm-lock.yaml`) installs dependencies. The workspace file hoists packages and skips native builds that this app does not need (`core-js`, `es5-ext`, `fsevents`, `node-sass`). Styles use the Dart Sass package (`sass`), not `node-sass`.

### Tests

**Jest** ships with react-scripts. `pnpm test` starts it in watch mode.

**React Testing Library** (`@testing-library/react`) renders components in tests. **jest-dom** adds DOM matchers such as `toBeInTheDocument`, loaded from `src/setupTests.js`. **user-event** is installed for simulating clicks and typing; the current test file does not import it yet.

### Deployment and progressive web app shell

**gh-pages** publishes the `build/` folder. `predeploy` runs the production build and copies `index.html` to `404.html` so GitHub Pages serves the client router for unknown paths. `homepage` in `package.json` is `https://sergialca.github.io/react-booking`, which Create React App uses as `PUBLIC_URL`.

Create React App also left a **service worker** (`src/serviceWorker.js`) and a web app manifest (`public/manifest.json`). `src/index.js` calls `serviceWorker.unregister()`, so the app is not installed as an offline PWA. The manifest is still served with the static files.

### Installed but not used in the UI

**react-table** is listed in `package.json`. The reservations table in `src/components/table/table.js` is a plain HTML table and does not import it.

## Available scripts

### `pnpm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000). The page reloads on edits, and lint errors show in the console.

### `pnpm test`

Launches the Jest test runner in interactive watch mode.

### `pnpm run build`

Builds the app for production into the `build` folder. The output is minified and filenames include content hashes.

### `pnpm run deploy`

Builds the app, copies `404.html`, and publishes `build/` to the `gh-pages` branch.
