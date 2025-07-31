# Deployment Guide

## Vercel Deployment

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Deploy to Vercel

```bash
vercel
```

### 3. Set Environment Variables in Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:
   - `DESTINATION_URL`: `https://arqilanotes.notion.site/Catatan-Kuliah-Sistem-dan-Teknologi-Informasi-ITB-Arqila-24135539e3b5801fb2cbcb88bc28f066?source=copy_link`
   - `NODE_ENV`: `production`

### 4. Redeploy

```bash
vercel --prod
```

## Alternative Deployment Options

### Netlify

1. Create a `netlify.toml` file:

```toml
[build]
  command = "npm install"
  publish = "public"
  functions = "functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Railway

1. Deploy directly from GitHub
2. Set environment variables in Railway dashboard
3. Railway will automatically detect the Node.js app

### Heroku

1. Create a `Procfile`:

```
web: node server.js
```

2. Deploy using Heroku CLI or GitHub integration
3. Set environment variables in Heroku dashboard

## Troubleshooting Deployment Issues

### Common Issues:

1. **Environment Variables Not Set**

   - Make sure `DESTINATION_URL` is set in your deployment platform
   - Check that the URL is properly formatted with quotes if needed

2. **Redirect Not Working**

   - Check the deployment logs for any errors
   - Verify the destination URL is accessible
   - Try accessing `/health` endpoint to check configuration

3. **CORS Issues**
   - The current setup should handle CORS automatically
   - If issues persist, check if the destination site allows redirects

### Testing Your Deployment:

1. **Health Check**: Visit `https://your-domain.vercel.app/health`
2. **Main Redirect**: Visit `https://your-domain.vercel.app/`
3. **Fallback Page**: Visit `https://your-domain.vercel.app/fallback`

### Environment Variables Reference:

| Variable          | Description                        | Example               |
| ----------------- | ---------------------------------- | --------------------- |
| `DESTINATION_URL` | The URL to redirect to             | `https://example.com` |
| `NODE_ENV`        | Environment mode                   | `production`          |
| `PORT`            | Server port (auto-set by platform) | `3000`                |

## Local Testing Before Deployment

```bash
# Test with production environment
NODE_ENV=production npm start

# Test with different destination
DESTINATION_URL=https://google.com npm start
```
