# Job Portal

A job portal website built with Node.js, Express, EJS, and in-memory data structures. It allows recruiters to post and manage job listings, and job seekers to browse and apply for jobs.

## Features

- User registration and login for recruiters
- Job CRUD operations (Create, Read, Update, Delete) for recruiters
- Job browsing and application for job seekers
- File upload for resumes
- Email notifications for job applications
- Session-based authentication
- Last visit tracking with cookies
- MVC architecture with ES6 modules

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server
4. Open `http://localhost:3000` in your browser

## Dependencies

- express: Web framework
- ejs: Templating engine
- ejs-mate: Layout support for EJS
- express-session: Session management
- cookie-parser: Cookie parsing
- multer: File upload handling
- nodemailer: Email sending

## Project Structure

- `index.js`: Main application entry point
- `models/`: Data models (User.js, Job.js)
- `controllers/`: Request handlers (userController.js, jobController.js)
- `routes/`: Route definitions (authRoutes.js, jobRoutes.js)
- `middlewares/`: Custom middlewares (auth, upload, email, etc.)
- `views/`: EJS templates
- `public/`: Static assets (CSS, JS)
- `uploads/`: Uploaded resume files

## API Endpoints

### Auth Routes
- GET /: Login page
- POST /register: Register new recruiter
- POST /login: Login recruiter
- POST /logout: Logout recruiter

### Job Routes
- GET /jobs: List all jobs
- POST /jobs: Create new job
- GET /jobs/new: New job form
- GET /jobs/:id: Job details
- PUT /jobs/:id: Update job
- DELETE /jobs/:id: Delete job
- GET /jobs/:id/update: Update job form
- GET /jobs/:id/applicants: View applicants
- POST /apply/:id: Apply for job

## Usage

1. Register as a recruiter
2. Login to access job management features
3. Create, update, or delete job postings
4. View applicants for your jobs
5. Job seekers can browse jobs and apply without logging in

## Notes

- Data is stored in memory and will be lost on server restart
- Email configuration needs to be set up for notifications
- File uploads are stored in the `uploads/` directory
