# Refer 🔗 - Affiliate & Personal Link Manager

A sleek, modern URL shortener and redirect manager built with **Hono**, **TypeScript**, and **Cloudflare KV**. It features a modern dark-slate UI, live stats, asynchronous redirect click tracking, and an admin dashboard protected by Hono Basic Auth.

---

## Features

- 🔒 **Secure Admin Dashboard**: Full link management dashboard under `/dashboard`, protected via Hono Basic Auth.
- 🔗 **Affiliate & Personal Link Redirects**: Easily create short redirects (e.g., `/my-link` or random hashes) that point to long URLs.
- ✏️ **Edit & Manage Redirects**: Instantly change the destination URL or friendly label of any active short code without changing the link itself.
- ⚡ **Background Click Tracker**: Redirects are instantaneous; clicks are logged in the background asynchronously using Cloudflare's `c.executionCtx.waitUntil`.
- 🔍 **Live Search Filter**: Filter short codes, descriptions, and destination URLs instantly on the client side with smooth fading animations.
- 📋 **Interactive Clipboard Copy**: Modern button feedback with dynamic icon transitions and toast notifications.
- 🛠️ **Developer Friendly**: Includes a backwards-compatible `POST /api/shorten` API endpoint that registers metadata in the dashboard.

---

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Wrangler will spin up a local development server (usually at `http://127.0.0.1:8788`).

3. **Admin Dashboard Login**:
   Open `http://localhost:8788/dashboard` in your browser.
   - **Default Username**: `admin`
   - **Default Password**: `admin`

---

## Production Deployment

Deploy directly to your Cloudflare account:
```bash
npm run deploy
```

### Configuring Authentication Secrets

It is highly recommended to set custom admin credentials for production using Wrangler secrets:
```bash
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
```

---

## API Documentation

### Programmatic Shortening
Create links programmatically using JSON APIs (useful for custom scripts or extensions):

**Request**:
```http
POST /api/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/products/affiliate-link",
  "label": "My Affiliate Product"
}
```

**Response**:
```json
{
  "shortenedUrl": "https://refer.yourdomain.com/abc123"
}
```
