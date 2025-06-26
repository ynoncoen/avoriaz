# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a ski trip planning application with both frontend and backend components:
- **Frontend**: Next.js 15 PWA deployed to GitHub Pages at `https://ynoncoen.github.io/ski/`
- **Backend**: Express.js/Vercel API for weather and restaurant data

## Development Commands

### Frontend (Next.js)
```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Start production server
npm start
```

### Backend API
```bash
# Development server (in /api directory)
cd api && vercel dev

# Alternative: local Express server
npm run server-dev

# Build TypeScript (in /api directory)
cd api && npm run build
```

## Architecture

### Frontend Structure
- **App Router**: Next.js 15 with app directory structure
- **Main Component**: `SkiTripPlanner` manages tab navigation with URL hash routing
- **Tab Components**: `TravelDetailsTab`, `PackingTab`, `RestaurantsTab`, `WeatherTab`
- **Services**: Weather and restaurant data fetching via API calls
- **PWA Features**: Service worker, push notifications, offline support

### Backend Structure
- **Dual Deployment**: Can run as Express server or Vercel serverless functions
- **Weather API**: Web scraping for Ski weather and snow conditions
- **Restaurant API**: Serves restaurant booking and recommendation data
- **Push Notifications**: Web push notification support with Redis state management

### Key Files
- `src/components/ski-trip/SkiTripPlanner.tsx`: Main app component with tab management
- `src/lib/weather-service.ts`: Frontend weather data fetching
- `src/lib/restaurant-service.ts`: Frontend restaurant data fetching
- `api/src/weather/weather.ts`: Backend weather scraping logic
- `api/src/restaurants/restaurants.ts`: Backend restaurant data API
- `src/app/layout.tsx`: Service worker registration and PWA setup

### Data Flow
1. Frontend services call backend APIs
2. Backend scrapes external sites for weather data
3. Restaurant data served from JSON files
4. Push notifications managed via Redis state

### Deployment
- Frontend: Static export to GitHub Pages with `/ski/` base path
- Backend: Vercel serverless functions
- Service worker configured for GitHub Pages deployment path

## Key Development Notes

- Project uses TypeScript throughout
- Tailwind CSS for styling with Radix UI components
- Web scraping for weather data requires CORS handling
- Hash-based routing for tab navigation
- Service worker handles push notifications and offline functionality