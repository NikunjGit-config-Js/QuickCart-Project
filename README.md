# E-Commerce Backend Project

This is a Node.js + Express backend for an e-commerce site using EJS templates, MongoDB for product storage, file upload for product images, and admin authentication.

## Features
- Product listing, creation, and management
- Admin authentication
- Cart functionality
- File upload for product images
- EJS templating for views

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up your `.env` file with MongoDB connection string and session secret:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret
   ```
3. Start the server:
   ```sh
   node app.js
   ```

## Folder Structure
- `views/` - EJS templates
- `routes/` - Express route files
- `controllers/` - Route handlers
- `models/` - Mongoose schemas
- `middleware/` - Custom middleware
- `uploads/` - Uploaded product images
- `public/` - Static assets

## License
MIT
