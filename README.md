# ITDS242 BookShop

A bookshop web application for browsing book listings and managing the shop catalog. The repository contains a React frontend, an Express API, and MySQL database schema and seed data.

## Project structure

```text
.
├── database/
│   ├── schema.sql          # MySQL database and table definitions
│   └── seed.sql            # Sample records
├── frontend-test/          # React 19 + Vite frontend
└── server/                 # Express 5 API and MySQL connection
```

## Requirements

- Node.js and npm
- MySQL

## Database setup

1. Create the database and tables by running `database/schema.sql` with your MySQL client.
2. Optionally load the sample data by running `database/seed.sql` after the schema.

> **Warning:** `schema.sql` begins by dropping the `ITDS242_BookShop` database if it already exists. This deletes existing data in that database. Back up any data you need before running it.

## Configuration

The server loads configuration from environment variables. Create `server/.env` with your local MySQL credentials:

```dotenv
PORT=3005
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ITDS242_BookShop
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
```

Do not commit real credentials. The server defaults to port `3005` and database name `myapp` when those variables are not set, so set `DB_NAME` to `ITDS242_BookShop` for the supplied schema.

## Run locally

Start the API in one terminal:

```bash
cd server
npm install
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend-test
npm install
npm run dev
```

Vite prints the local frontend URL when it starts. The API listens on `http://localhost:3005` by default. The frontend package also provides `npm run build`, `npm run preview`, and `npm run lint` scripts.

## API

The Express application mounts routes under `/api`. Available endpoints include:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/test` | Check that the API is responding |
| `GET` | `/api/books` | List books |
| `GET` | `/api/books/:id` | Get a book and its images |
| `GET` | `/api/books/:id/related` | Find books in the same category |
| `POST` | `/api/books` | Create a book |
| `PUT` | `/api/books/:id` | Update a book |
| `DELETE` | `/api/books/:id` | Delete a book |
| `GET` | `/api/admins` | List administrators |

Responses from book listing and detail routes use a JSON object with `success` and `data` fields. The related-books route returns up to 10 books.

## Frontend routes

The current frontend includes book search and detail pages, along with administrator management screens:

- `/search`
- `/detail/:id`
- `/adminManagement`
- `/adminCreate`
- `/adminChange`

## Notes

- The frontend project is currently located in `frontend-test/`.
- The backend package's `npm test` script is a placeholder and does not run an automated test suite yet.
