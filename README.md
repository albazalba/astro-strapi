# astro-strapi

## Contents

1. [Features](#features)
2. [Setup](#setup)
   - [Backend (Strapi)](#backend-strapi)
   - [Frontend (Astro)](#frontend-astro)
3. [Temporary .env File](#temporary-env-file)

## Features

This application combines Astro for the frontend and Strapi for the backend, offering the following features:

- User authentication (Sign up and Sign in)
- Product listing
- Product details view
- Add to cart functionality

## Setup

### Backend (Strapi)

1. Navigate to the backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Add the provided `.env` file to the backend folder.

4. Start the Strapi development server:
   ```
   npm run develop
   ```

### Frontend (Astro)

1. Navigate to the frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Astro development server:
   ```
   npm run dev
   ```

Now you can access the application through your browser and explore its features.

## Temporary .env File
```
HOST=0.0.0.0
PORT=1337
APP_KEYS="a0e33fb7d9f8b9e1c5f6d8e3b2a7c4f9,b1d4e7a2c5f8b3a6d9e2c7f0a3b6d8e1"
API_TOKEN_SALT=7c4f9a2b5e8d1a3b6c9f2e5d8a1b4e7
ADMIN_JWT_SECRET=9f2e5d8a1b4e7c3a6b9d2f5e8c1a4b7
TRANSFER_TOKEN_SALT=3b6c9f2e5d8a1b4e7c4f9a2b5e8d1a
JWT_SECRET=5e8d1a3b6c9f2e5d8a1b4e7c4f9a2b5
```

For development purposes, use the following temporary `.env` file in the `backend` folder:
