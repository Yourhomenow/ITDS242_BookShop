# ITDS242 BookShop

A full-stack bookshop application built with React, Express, and MySQL. The project supports browsing and managing a book catalog, viewing book details, and administering administrator accounts.

## Technology stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS
- **Backend:** Express 5, MySQL2, JWT, bcrypt
- **Database:** MySQL

## Repository structure

```text
.
├── database/
│   ├── schema.sql          # Database tables and relationships
│   └── seed.sql            # Optional sample data
├── frontend-test/          # React frontend
└── server/                 # Express API
```

## Prerequisites

- Node.js 20 or later
- npm
- MySQL 8 or later

## Database setup

1. Start MySQL.
2. Open `database/schema.sql` in your MySQL client and run it.
3. Optionally load `database/seed.sql` to add sample records.

> **Warning:** `schema.sql` first drops the `ITDS242_BookShop` database if it exists. Running it will delete existing data in that database.

## Backend configuration

Create `server/.env`:

```dotenv
PORT=3005
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ITDS242_BookShop
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
JWT_SECRET=replace-with-a-long-random-secret
```

Do not commit real credentials or your `.env` file.

## Run locally

Start the API:

```bash
cd server
npm install
npm run dev
```

The API listens on `http://localhost:3005` by default.

Start the frontend in a second terminal:

```bash
cd frontend-test
npm install
npm run dev
```

Vite will print the local frontend address, usually `http://localhost:5173`.

## Frontend commands

From `frontend-test/`:

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## API overview

The Express application exposes routes under `/api`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/test` | Check API availability |
| `GET` | `/api/books` | List books |
| `GET` | `/api/books/:id` | Get a book and its images |
| `GET` | `/api/books/:id/related` | Get related books |
| `POST` | `/api/books` | Create a book |
| `PUT` | `/api/books/:id` | Update a book |
| `DELETE` | `/api/books/:id` | Delete a book |
| `GET` | `/api/admins` | List administrators |

Book listing and detail responses use JSON objects containing `success` and `data` fields. The related-books endpoint returns up to 10 results.

## Frontend routes

- `/search` — Search and browse books
- `/detail/:id` — View a book's details
- `/adminManagement` — Manage administrators
- `/adminCreate` — Create an administrator
- `/adminChange` — Update an administrator

## Development notes

- The React application is located in `frontend-test/`.
- The backend entry point is `server/src/server.js`.
- The supplied backend `npm test` script is currently a placeholder and does not run an automated test suite.
