# PHP Backend for User Portal

This directory contains a small PHP based API that provides registration,
login, event listing and event registration endpoints. It is meant as a
reference implementation for a user portal backend.

## Endpoints

- `POST /register` – Register a new user. Expects JSON body with
  `name`, `email`, `city`, `age`, `gender`, `password` and
  `confirm_password`. Stores user with hashed password and sends an OTP
  email for verification.
- `POST /verify` – Verify email address by submitting the OTP.
- `POST /login` – Log a user in using email and password. Uses PHP
  sessions for authentication.
- `GET /events` – List upcoming events sorted by date.
- `POST /events/{id}/register` – Register for an event. Provide an array
  of ticket objects with attendee names. A unique QR code is generated
  for each ticket.
- `GET /tickets` – Retrieve a list of purchased tickets for the logged in
  user.

## Database

The `schema.sql` file defines tables for users, events, sessions and
purchased tickets. Adjust the credentials in `config.php` to match your
MySQL setup.

## Security Notes

- Passwords are hashed using `password_hash` (bcrypt).
- OTP codes expire after 10 minutes.
- Input validation is minimal and should be extended for production.
- For actual deployments configure proper mailing and HTTPS.
