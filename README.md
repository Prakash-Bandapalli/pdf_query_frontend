# PDF Question Answering - Frontend (React)

This is the frontend interface for the PDF Question Answering application, built with React and Vite. It allows users to upload PDF documents and interact with a backend API to ask questions about the document content.

## Features

* User interface for uploading PDF files.
* Displays the conversation history (user questions and AI answers).
* Input field for asking new or follow-up questions.
* Handles communication with the backend API (`/upload` and `/ask` endpoints).
* Provides loading states and error feedback.
* Styled using Tailwind CSS.

## Technologies Used

* **Framework/Library:** React 18+
* **Build Tool:** Vite
* **Language:** JavaScript (JSX)
* **API Client:** Axios
* **Styling:** Tailwind CSS
* **Deployment:** Vercel (or your chosen platform)

## Prerequisites

* Node.js (LTS version recommended, e.g., 18.x or 20.x)
* npm or yarn
* Git

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [Your Repository URL]
   cd [Your Repository Folder]/pdf-qa-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

This project uses environment variables to configure the backend API URL. Vite requires variables exposed to the frontend to be prefixed with `VITE_`.

1. **Create `.env.development`:** Create this file in the project root for local development:
   ```dotenv
   # .env.development
   VITE_BACKEND_URL=http://localhost:8000
   ```
   *(Ensure your backend is running locally on port 8000 when using this).*

2. **Production Environment Variable:** For deployment, you **must** set the `VITE_BACKEND_URL` environment variable in your deployment platform's settings (e.g., Vercel, Netlify) to point to your **live backend URL** (e.g., `https://your-backend-name.onrender.com`). The `.env.production` file is typically only used for build-time defaults if the platform variable isn't set.

3. Ensure `.env*.local` files are added to your `.gitignore` if used.

## Running Locally

1. Make sure the backend service is running (either locally or the deployed version if you configure `.env.development` accordingly).

2. Start the Vite development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## Building for Production

To create an optimized static build for deployment:

```bash
npm run build
# or
yarn build
```

The production-ready files will be located in the `dist/` directory.

## Deployment

This frontend is configured for easy deployment on platforms like Vercel or Netlify.

* Connect your Git repository to the platform.
* Configure the build command: `npm run build` (or `vite build`).
* Configure the output directory: `dist`.
* Crucially, set the `VITE_BACKEND_URL` environment variable in the platform's settings to your deployed backend URL.
