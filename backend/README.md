# Amen Backend

This directory contains a minimal Express-based HTTP service for the AMEN FREE EMPIRE project. It exposes health information that can be used by other components to verify the backend is running.

## Getting started

### Install dependencies

```bash
cd backend
npm install
```

### Run in development mode

```bash
npm run dev
```

This starts the Express server with automatic reloads via `tsx`.

### Call the health check

With the server running locally (default port `3000`), call the health endpoint:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "amen-backend",
  "version": "0.0.1"
}
```
