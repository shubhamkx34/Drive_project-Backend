[README.md](https://github.com/user-attachments/files/28934741/README.md)
# Drive_p — Cloud File Storage

A file storage web app where users can register, log in, upload any file type to the cloud, view their files, and download them securely. Built as a learning project to understand backend authentication, cloud storage, and secure file handling.

---

## Features

- User registration and login with input validation
- Password hashing using bcrypt
- JWT-based authentication stored in browser cookies
- Protected routes — unauthenticated users are blocked
- File upload to Cloudinary (images, PDFs, videos, docs — any type)
- File metadata (name, URL, owner) saved to MongoDB
- Per-user file isolation — users only see their own files
- Ownership-verified downloads — users can only download files they own
- Force-download via server-side stream piping

---

## Tech Stack

| Layer | Technology |

| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| File Storage | Cloudinary |
| File Handling | Multer + multer-storage-cloudinary |
| Templating | EJS |
| Validation | express-validator |

---

## How It Works

### Auth Flow
1. User registers — password is hashed with bcrypt and saved to MongoDB.
2. User logs in — password is compared, JWT token is generated and stored as a cookie.
3. Every protected route checks the cookie via auth middleware before proceeding.

### Upload Flow
1. User selects a file on the home page.
2. Multer intercepts the request and streams the file directly to Cloudinary.
3. Cloudinary returns a permanent URL.
4. The URL, filename, and user ID are saved to MongoDB.

### Download Flow
1. User clicks download on a file.
2. Server verifies the file belongs to the logged-in user by matching both user ID and file path in MongoDB.
3. If verified, server streams the file from Cloudinary to the browser with a `Content-Disposition: attachment` header — forcing a download instead of opening in browser.

---

## Author

**Shubham** — [@shubhamkx34](https://github.com/shubhamkx34)
