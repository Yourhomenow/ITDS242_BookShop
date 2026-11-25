# ITDS242 BookShop — มหาสมุด 

A book catalog and administrator management application for ITDS242, built with React, Express, and MySQL. The Thai-language frontend displays prices in Thai baht (THB) and provides public browsing pages alongside tools for maintaining books and administrator accounts.

## Features

- **Public catalog:** home page with a book carousel and new-arrival section, title search, category/author/publisher/maximum-price filters, book details, and related books.
- **Book management:** search by ID or name, filter by category and stock availability, browse six records per page, create/edit books, and delete individual or multiple selected books.
- **Book metadata:** stock, price, ISBN, size, publication date, description, publisher, multiple authors/categories, and cover images.
- **Image uploads:** PNG/JPEG uploads directly from the browser to Cloudinary, with image references stored in MySQL.
- **Administrator management:** create accounts, search usernames, filter by status, edit credentials/status, and delete accounts.
- **Authentication:** administrator login/logout using a JWT stored in an HTTP-only cookie.
- **Team page:** project member profiles and responsibilities.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, React Router 7, Vite 8, Tailwind CSS 4 |
| Backend | Node.js ES modules, Express 5, mysql2, dotenv, cors |
| Authentication | bcrypt password hashing, jsonwebtoken (HS256) |
| Database | MySQL with relational constraints |
| Images | Cloudinary browser uploads and hosted image URLs |
| Development | Nodemon, ESLint |

## Repository structure

```text
.
├── database/
│   ├── schema.sql                 # Recreates the database and its 11 tables
│   └── seed.sql                   # Sample catalog, administrators, and log records
├── frontend-test/
│   ├── public/                    # Favicon and SVG icons
│   ├── src/
│   │   ├── app/                   # React entry point, routes, and styles
│   │   ├── assets/                # Logos, banners, and team photos
│   │   ├── features/
│   │   │   ├── adminManagement/
│   │   │   ├── bookManagement/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── product-catalog/
│   │   │   └── team/
│   │   └── shared/                # Navigation, cards, icons, and utilities
│   └── vite.config.js             # React/Tailwind plugins and /api proxy
├── server/
│   └── src/
│       ├── config/                # Environment configuration and MySQL pool
│       ├── controllers/           # HTTP request/response handlers
│       ├── middleware/            # JWT cookie authentication
│       ├── routes/                # API route definitions
│       ├── services/              # SQL queries and data transformations
│       ├── utils/login/           # Cookie parsing and token generation
│       ├── app.js                 # Express, JSON parsing, CORS, /api mount
│       └── server.js              # Database check and server startup
└── README.md
```

The frontend and backend are separate npm packages. The root `package.json` has no scripts or workspace configuration; install and run each package from its own directory.

## Local setup

### 1. Prerequisites

- Node.js **22.13+ on the 22.x line, or 24+** to satisfy the checked-in Vite and ESLint engine requirements.
- npm.
- MySQL 8+ and a MySQL account able to create the database and tables.
- Internet access for npm dependencies, hosted cover images, Google Fonts, and Cloudinary uploads.

### 2. Create the database

**`schema.sql` drops `ITDS242_BookShop` if it already exists, deleting its data. Use a disposable development database or back up existing data first.**

Run these commands from the repository root, replacing `your_mysql_user`:

```bash
mysql -u your_mysql_user -p < database/schema.sql
mysql -u your_mysql_user -p ITDS242_BookShop < database/seed.sql
```

Alternatively, execute the schema in a MySQL client, then select `ITDS242_BookShop` before running the seed. The seed does not contain a `USE` statement.

Seeding is optional but useful for the demo: it adds 9 books, 3 administrators, 3 publishers, 3 authors, 5 categories, 11 image references, and sample log records. Run it once against a fresh schema; it assumes generated IDs start at 1 and is not designed for repeated imports.

The seeded administrator passwords are bcrypt hashes; their plaintext passwords are not documented in the seed. Create your own account using the steps below.

### 3. Configure the backend

Create `server/.env`:

```dotenv
PORT=3005
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ITDS242_BookShop
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
JWT_SECRET=replace_with_generated_value
```

Generate a secret and paste the result into `JWT_SECRET`:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Startup requires a JWT secret of at least **32 bytes**. Set `DB_NAME` explicitly: the fallback in the code is `myapp`, not the schema's database name. Environment files are git-ignored; keep real credentials out of source control.

### 4. Start both servers

In one terminal, from the repository root:

```bash
cd server
npm ci
npm run dev
```

The API defaults to `http://localhost:3005`. Nodemon restarts it when backend files change.

In a second terminal, from the repository root:

```bash
cd frontend-test
npm ci
npm run dev -- --port 5173 --strictPort
```

Open `http://localhost:5173`. Use `localhost` consistently for the frontend and API because the authentication helper calls `http://localhost:3005` directly.

Most frontend requests use relative `/api` URLs, forwarded by Vite to `http://localhost:3005`. An optional `frontend-test/.env` can change that proxy target:

```dotenv
API_PROXY_TARGET=http://localhost:3005
```

Changing the proxy alone does **not** change every request: the login helper in `frontend-test/src/features/login/api.js` and the administrator update request in `AdminChange.jsx` hardcode `http://localhost:3005`. Custom hosts/ports require updating those locations too. Backend CORS currently allows credentialed requests from `http://localhost:5173` and `http://127.0.0.1:5173`.

### 5. Test (For ITDS242)
after start frontend and backend from topic 4.
1. Open  http://localhost:5173/. As you can see user without login can navigate to our main page.

![alt text](./readmeImg/image-14.png)

You can also click each book to see more detail.

![alt text](./readmeImg/image-15.png)

You can use search bar to search book name.

![alt text](./readmeImg/image-16.png)

You can use navbar to filter popular category of books.

![alt text](./readmeImg/image-17.png)

You can also use sidebar to filter books in more detail.

![alt text](./readmeImg/image-18.png)

At the bottom, you can see "ทีมพัฒนา" in footer click it and you'll see us.

![alt text](./readmeImg/image-20.png)

![alt text](./readmeImg/image-21.png)

3. Click "เข้าสู่ระบบ" button.

![alt text](./readmeImg/image-1.png)

4. Login as one of our admin, using Username = Kason_w , Password = 11111111. then click "เข้าสู่ระบบ" button.(Note that session are 15 minutes long.)

![alt text](./readmeImg/image-2.png)

5. After login, website will navigate you to adminManagement page. try to use search bar and filter status.

![alt text](./readmeImg/image-3.png)

6. In the same page, try to create new admin by click into "เพิ่มบัญชีใหม่" button. and write username and password then click "บันทึกบัญชีผู้ใช้"

![alt text](./readmeImg/image-4.png)

7. From page /adminManagement you also can edit admin account by click into this button.

![alt text](./readmeImg/image-5.png)

And after edit you can click บันทึกการเปลี่ยนแปลงทั้งหมด for save.

![alt text](./readmeImg/image-6.png)

you can also delete each admin account.

![alt text](./readmeImg/image-7.png)

8. Navigate to BookManagement using sidebar.

![alt text](./readmeImg/image-8.png)

9. You can search book stock using search bar.

![alt text](./readmeImg/image-9.png)

10. You,as a admin, can also add new book when click "เพิ่มหนังสือใหม่" and fill the form and click "บันทึกสินค้าใหม่".

![alt text](./readmeImg/image-10.png)

11. You can also delete books from stock by click to check each book and click "ลบสินค้า".

![alt text](./readmeImg/image-11.png)

12. You can edit each book by click edit button and fill the form and click "บันทึกสินค้า" to save.

![alt text](./readmeImg/image-12.png)

![alt text](./readmeImg/image-13.png)

13. Lastly, after login you can logout using "logout" button.

![alt text](./readmeImg/image-19.png)


### 6. Image uploads(External API)

Both book forms use Cloudinary cloud name `itds242-bookshop` and upload preset `itds242-bookshop`, hardcoded in:

- `frontend-test/src/features/bookManagement/bookCreate.jsx`
- `frontend-test/src/features/bookManagement/bookChange.jsx`

Uploads require that cloud and its unsigned upload preset to accept requests. To use your own Cloudinary account, update the upload URL and preset in both files. There are no Cloudinary environment variables or backend upload routes in this implementation. Books can also be created without images.

## Frontend routes

Routes are defined in [App.jsx](frontend-test/src/app/App.jsx).

| Path | Page |
| --- | --- |
| `/`, `/home` | Home page and book listings |
| `/search`, `/search/:keyword` | Catalog and title search; accepts `?category=Novel`, for example |
| `/detail/:id` | Book details and related titles |
| `/team` | Project team |
| `/login` | Administrator login |
| `/adminManagement` | Administrator list, search, status filter, and deletion |
| `/adminCreate` | Administrator registration |
| `/adminChange/:id` | Edit administrator username, password, and status |
| `/bookManagement` | Book list, filters, pagination, and deletion |
| `/bookCreate` | Create a book and upload images |
| `/bookChange/:id` | Edit a book and add/remove image references |

## API reference

The base URL for local development is `http://localhost:3005/api`. Definitions are in [routes.js](server/src/routes/routes.js) and [routes/index.js](server/src/routes/index.js).

“Required” means the endpoint uses `requireAuth` and expects a valid `access_token` cookie. A Bearer authorization header is not used by this middleware.

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| GET | `/api/test` | None | API availability; returns `status` and `timestamp` |
| GET | `/api/books` | None | Public catalog |
| GET | `/api/books/:id` | None | Book details with image references |
| GET | `/api/books/:id/related` | None | Up to 10 other books sharing a category |
| GET | `/api/admins/books` | Required | Books in the management data format |
| GET | `/api/admins/books/:id` | Required | Management details as an array |
| POST | `/api/admins/books` | Required | Create a book and its relationships |
| PUT | `/api/admins/books/:id` | Required | Update book fields, relationships, and images |
| DELETE | `/api/admins/books/:id` | Required | Delete a book |
| GET | `/api/admins` | None | Administrator IDs, usernames, and statuses |
| GET | `/api/admins/:id` | Required | One administrator; `?e=1` lists all except this ID |
| PUT | `/api/admins/:id` | Required | Update username, status, and password |
| DELETE | `/api/admins/:id` | Required | Delete an administrator |
| POST | `/api/register` | Required | Create an active administrator |
| POST | `/api/login` | None | Verify credentials and set the authentication cookie |
| GET | `/api/me` | Required | Return `AdminID` from the verified JWT |
| POST | `/api/logout` | None | Clear the browser's authentication cookie |

## Database model

The schema defines 11 tables:

| Tables | Purpose |
| --- | --- |
| `ADMIN` | Unique usernames, password hashes, and account status |
| `BOOK`, `PUBLISHER` | Book metadata and each book's publisher |
| `AUTHOR`, `WRITE` | Authors and the many-to-many book/author relationship |
| `CATEGORY`, `IN` | Categories and the many-to-many book/category relationship |
| `PICTURE` | Image names and URLs belonging to a book |
| `LOGINLOG` | Login log structure and seeded examples |
| `USERTRANSACTION` | Administrator-change log structure and seeded examples |
| `BOOKTRANSACTION` | Book-change records |



## Commands and verification

| Directory | Command | Purpose |
| --- | --- | --- |
| `server/` | `npm run dev` | API with Nodemon |
| `server/` | `node src/server.js` | API without automatic restart |
| `frontend-test/` | `npm run dev` | Vite development server |
| `frontend-test/` | `npm run build` | Build frontend into `dist/` |
| `frontend-test/` | `npm run preview` | Preview the frontend build |
| `frontend-test/` | `npm run lint` | Run ESLint |

The backend `npm test` is a placeholder that exits with an error. There is no configured frontend test script or checked-in automated test suite.

After starting the API, basic read-only checks are:

```bash
curl http://localhost:3005/api/test
curl http://localhost:3005/api/books
```

The first should return `status: "ok"` and a timestamp; the second should return `success: true` and the catalog. `/api/test` does not check the database. Startup can print `DB status: not set!!!!!!!` for either an empty `BOOK` table or a connection failure; inspect preceding errors and check `/api/books` to distinguish them.

For a manual feature check, browse a seeded book, try catalog filters, register and log in, then create/edit/delete a disposable book and log out. The behavior described here is based on source inspection; these steps are instructions, not a record of completed runtime tests.
