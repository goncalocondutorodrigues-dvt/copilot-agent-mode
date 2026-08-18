# Octofit Tracker - Frontend Setup Guide

## Overview

The React 19 presentation tier for Octofit Tracker uses Vite, react-router-dom for navigation, and Bootstrap for styling. The application communicates with the backend API using environment-based URL configuration.

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Access to the backend API (running on port 8000)

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd octofit-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Configuration

The frontend uses Vite environment variables to configure the API endpoint. You **must** define `VITE_CODESPACE_NAME` for the application to work correctly.

### Setup Steps

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and set your Codespace name:
   ```
   VITE_CODESPACE_NAME=your-codespace-name-here
   ```

   To find your Codespace name:
   - In GitHub Codespaces: Check the URL or settings
   - Format is typically: `adjective-animal-randomid`
   - Example: `glorious-space-guacamole-pjvwv64j4rggfrww9`

### Fallback Behavior

If `VITE_CODESPACE_NAME` is not defined, the application will:
- Fall back to `http://localhost:8000/api`
- Display a warning in the console
- Still function locally during development

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components for each section
│   ├── Activities.tsx
│   ├── Leaderboard.tsx
│   ├── Teams.tsx
│   ├── Users.tsx
│   └── Workouts.tsx
├── utils/
│   └── api.ts          # API utility functions
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## API Integration

All API calls go through the `src/utils/api.ts` module, which provides:

- `getBaseApiUrl()` - Gets the configured API base URL
- `getApiEndpoint(endpoint)` - Constructs full API URLs
- `fetchApiData<T>(endpoint)` - Fetches data with pagination support
- `postApiData<T>(endpoint, data)` - Posts data to the API

### Pagination Support

The API utilities automatically handle both:
- **Paginated responses**: `{ items: [...], total: N, page: M }`
- **Array responses**: `[...]`

Both formats are normalized to return an array of items.

## Components

### Activities
- Displays logged workout activities
- Shows activity type, duration, calories burned, and date
- Table-based layout

### Leaderboard
- Competitive ranking of users
- Shows rank, username, total calories, and activity count
- Ordered by performance metrics

### Teams
- Team listings with member counts
- Card-based layout with team metadata
- Shows team creation date and member information

### Users
- User profiles and account information
- Table displaying username, full name, email, and join date
- Administration view

### Workouts
- Available workout programs
- Card-based display with difficulty indicators
- Shows duration and creation date

## Navigation

The app uses react-router-dom for client-side routing:

- `/` - Home page with quick links
- `/activities` - Activity tracking view
- `/leaderboard` - Competitive leaderboard
- `/teams` - Team management view
- `/users` - User management view
- `/workouts` - Available workouts

## Styling

Bootstrap 5 is used for responsive UI styling. The application features:
- Responsive navbar with collapse on mobile
- Bootstrap grid system for layouts
- Bootstrap components (tables, cards, buttons, alerts)
- Custom index.css for additional styling

## Troubleshooting

### API Connection Issues

1. **"VITE_CODESPACE_NAME is not set" warning**
   - Define the variable in `.env.local`
   - Restart the dev server

2. **"undefined-8000.app.github.dev" URL errors**
   - Verify `VITE_CODESPACE_NAME` is correctly set
   - Check that it matches your actual Codespace name

3. **CORS errors**
   - Ensure the backend is configured to accept requests from the frontend origin
   - Check backend CORS settings

4. **Connection refused on localhost**
   - When using fallback URL, ensure backend is running on port 8000
   - Run: `npm run dev` in the backend directory

## Deployment

When deploying to production:
1. Ensure `VITE_CODESPACE_NAME` is set in your production environment
2. Build the application: `npm run build`
3. Deploy the `dist/` directory to your hosting service
4. Verify the backend API is accessible from your deployment origin

## Dependencies

- **react** ^19.2.8 - UI library
- **react-dom** ^19.2.8 - DOM rendering
- **react-router-dom** ^7.18.2 - Routing and navigation
- **bootstrap** ^5.3.8 - CSS framework
- **vite** ^8.2.0 - Build tool
- **typescript** ~6.0.2 - Type safety

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter (oxlint)
- `npm run preview` - Preview production build locally
