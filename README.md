# Auto Redirect Web App

A simple Node.js web application that automatically redirects visitors to a destination URL configured via environment variables.

## Features

- ⚡ Automatic redirect to any URL
- 🔧 Configurable via environment variables
- 🎨 Beautiful loading page with fallback
- 🏥 Health check endpoint
- 🚀 Simple and lightweight

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure your destination URL:

```bash
cp env.example .env
```

Edit the `.env` file and set your desired destination URL:

```env
DESTINATION_URL=https://www.google.com
PORT=3000
```

### 3. Start the Server

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

### 4. Test the Redirect

Visit `http://localhost:3000` and you'll be automatically redirected to your configured destination URL.

## Configuration

### Environment Variables

| Variable          | Description            | Default  |
| ----------------- | ---------------------- | -------- |
| `DESTINATION_URL` | The URL to redirect to | Required |
| `PORT`            | Server port            | 3000     |

### Example .env file

```env
DESTINATION_URL=https://www.example.com
PORT=3000
```

## API Endpoints

- `GET /` - Main redirect endpoint
- `GET /health` - Health check endpoint
- `GET /*` - Catch-all redirect for any path

## Health Check

Check the application status:

```bash
curl http://localhost:3000/health
```

Response:

```json
{
  "status": "OK",
  "destination": "https://www.example.com",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Deployment

### Local Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t auto-redirect .
docker run -p 3000:3000 -e DESTINATION_URL=https://www.example.com auto-redirect
```

## Troubleshooting

### Common Issues

1. **"DESTINATION_URL not configured" error**

   - Make sure you have created a `.env` file
   - Ensure `DESTINATION_URL` is set in the `.env` file

2. **Port already in use**

   - Change the `PORT` in your `.env` file
   - Or kill the process using the current port

3. **Redirect not working**
   - Check that the destination URL is valid
   - Ensure the destination URL includes the protocol (http:// or https://)

## License

MIT
#   a u t o - r e d i r e c t  
 