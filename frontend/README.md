# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Backend Environment Variables

The backend reads database and email credentials from a `.env` file located in `backend/`.
Example configuration:

```env
DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypass
DB_NAME=acp
JWT_SECRET=changeme
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
SES_ACCESS_KEY=yourkey
SES_SECRET_KEY=yoursecret
EMAIL_FROM=no-reply@example.com
```

## PHP Backend

A simple PHP implementation is available in the `php-backend` directory.
Run it locally with:

```bash
php -S localhost:8080 -t php-backend
```

Refer to `php-backend/README.md` for API details and database schema.

### User Profile API

The Node backend exposes an authenticated endpoint to fetch the current
user's information and ticket purchases:

```http
GET /api/user/profile
Authorization: Bearer <token>
```

It returns the user's name, email and an array of purchased tickets.

### Alumni CRUD API

The following endpoints allow managing festival alumni profiles. Each record
stores a name, role, bio, picture URL and specialization.

```http
GET    /api/alumni            # List all alumni
GET    /api/alumni/:id        # Retrieve a single entry
POST   /api/alumni            # Create a new entry
PUT    /api/alumni/:id        # Update an existing entry
DELETE /api/alumni/:id        # Remove an entry
```

Use these endpoints to power the alumni directory on `/festival/aaf/AlumniPage`.
