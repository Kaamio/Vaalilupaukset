# Vaalilupaukset

Finnish election promises tracker. A platform to track party platforms, candidate commitments, and measure whether promises move from campaign rhetoric to measurable policy action.

## Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite (local development)
- **Styling**: CSS3 with responsive design

## Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** (comes with Node.js)
- Git (for version control)

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/Kaamio/Vaalilupaukset.git
cd Vaalilupaukset
```

### 2. Install dependencies

```bash
# Install root-level concurrently package
npm install

# Install client dependencies
npm install --prefix client

# Install server dependencies
npm install --prefix server
```

### 3. Run in development mode

```bash
npm run dev
```

This starts both the frontend and backend in parallel:
- **Frontend**: http://localhost:5174 (React + Vite dev server)
- **Backend**: http://localhost:5000 (Express API)

The frontend is configured to proxy API calls to the backend, so you can access `/api/elections` directly from the React app.

### 4. View the app

Open http://localhost:5174 in your browser.

## Available Scripts

### Development

```bash
# Start both client and server
npm run dev

# Start only the frontend dev server
npm run dev:client

# Start only the backend dev server
npm run dev:server
```

### Building for production

```bash
# Build the React app (output in client/dist/)
npm run build
```

### Linting

```bash
# Lint the client code
npm run lint --prefix client
```

## Project Structure

```
Vaalilupaukset/
├── client/                           # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx                  # Main React component
│   │   ├── App.css                  # Styling
│   │   └── main.jsx                 # Entry point
│   ├── vite.config.js               # Vite config with API proxy
│   └── package.json
│
├── server/                           # Node.js/Express backend
│   ├── index.js                     # Server entry point
│   ├── src/
│   │   ├── routes/
│   │   │   └── api.js               # API endpoints
│   │   ├── config/
│   │   │   └── db.js                # SQLite database setup
│   │   ├── controllers/             # Business logic
│   │   ├── services/                # Data services
│   │   └── data/                    # Mock/seed data
│   ├── database/
│   │   ├── schema.sql               # SQLite schema
│   │   ├── seed.sql                 # Initial seed data
│   │   └── vaalilupaukset.db        # Local database (created on first run)
│   └── package.json
│
├── .gitignore                        # Git ignore rules
├── package.json                      # Root package (concurrently)
└── README.md                         # This file
```

## API Endpoints

The backend serves a REST API under `/api/`:

### Elections
- `GET /api/elections` — All elections with parties and promises
- `GET /api/elections/:id` — Specific election data

### Parties
- `GET /api/parties` — All parties
- `GET /api/parties/:id` — Party details
- `GET /api/parties/:id/promises` — Party's promises

### Promises
- `GET /api/promises` — All promises
- `GET /api/promises/:id` — Specific promise with sources

### Economic Indicators
- `GET /api/economic-indicators` — Economic data by election

### Health Check
- `GET /api/health` — API status

## Database

The app uses **SQLite** for local development. The database is automatically initialized on first run.

- **Location**: `server/database/vaalilupaukset.db`
- **Schema**: `server/database/schema.sql`
- **Seed data**: `server/database/seed.sql`

The database is excluded from Git (see `.gitignore`) so each developer has their own local copy.

## Environment Variables

Optional configuration in `server/.env`:

```
PORT=5000
CLIENT_URL=http://localhost:5174
NODE_ENV=development
```

See `server/.env.example` for defaults. Environment files are excluded from Git.

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** — run `npm run dev` to test locally

3. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add cool feature"
   git push origin feature/your-feature-name
   ```

4. **Open a pull request** on GitHub

## Roadmap (MVP First)

### ✅ Phase 1 (Current)
- Election overview and party list
- Party promises with completion scores
- Economic indicators dashboard
- Election year selector
- Responsive design

### 🔄 Phase 2 (Planned)
- Real PostgreSQL integration (Supabase)
- Candidate-specific promise tracking
- User suggestions / promise submission form
- Moderation workflow for suggestions
- Promise source linking (YLE, FSD, etc.)

### 📋 Phase 3 (Future)
- Authentication (login/signup)
- User favorites and saved comparisons
- Promise timeline and history
- Policy impact scoring
- News integration

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Port already in use
- If port 5000 (backend) or 5174 (frontend) is occupied, the app will use the next available port.
- Check what's using the port and kill it if needed.

### Database issues
- Delete `server/database/vaalilupaukset.db` and restart the server to reinitialize
- Check `server/database/schema.sql` and `seed.sql` for the current schema

### CORS errors
- Ensure the frontend proxy is set correctly in `client/vite.config.js`
- The backend CORS is configured for `localhost:5173`, `localhost:5174`, and `127.0.0.1` variants

### Dependencies not installing
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## License

ISC

## Questions?

Open an issue on GitHub or check the project board for ongoing discussions.
