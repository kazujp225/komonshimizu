# Deployment Guide

## 🚀 Vercel Deployment (Recommended)

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kazujp225/komonshimizu)

### Manual Setup

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

### Environment Variables
Set these in Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_GA_ID
OPENAI_API_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

### Custom Domain
1. Go to Vercel Dashboard → Settings → Domains
2. Add `hanataba.jp` and `www.hanataba.jp`
3. Update DNS records:
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

## 🔷 AWS Deployment

### Prerequisites
- AWS Account
- AWS CLI configured
- Docker installed

### Using AWS Amplify

1. **Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. **Initialize Amplify**
```bash
amplify init
```

3. **Add Hosting**
```bash
amplify add hosting
```

4. **Deploy**
```bash
amplify publish
```

### Using EC2 + Docker

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

2. **Build and Push to ECR**
```bash
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin [ECR_URI]
docker build -t hanataba .
docker tag hanataba:latest [ECR_URI]/hanataba:latest
docker push [ECR_URI]/hanataba:latest
```

3. **Deploy with ECS**
Create `task-definition.json` and deploy using ECS service.

## ☁️ Google Cloud Platform

### Using Cloud Run

1. **Build Container**
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/hanataba
```

2. **Deploy to Cloud Run**
```bash
gcloud run deploy hanataba \
  --image gcr.io/PROJECT_ID/hanataba \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated
```

### Using App Engine

1. **Create app.yaml**
```yaml
runtime: nodejs18
env: standard
instance_class: F2

env_variables:
  NODE_ENV: "production"

handlers:
- url: /.*
  secure: always
  script: auto
```

2. **Deploy**
```bash
gcloud app deploy
```

## 🟦 Azure Deployment

### Using Azure Static Web Apps

1. **Create Static Web App**
```bash
az staticwebapp create \
  --name hanataba \
  --resource-group hanataba-rg \
  --source https://github.com/kazujp225/komonshimizu \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location ".next"
```

2. **Configure Build**
Create `.github/workflows/azure-static-web-apps.yml`

### Using Azure App Service

1. **Create App Service**
```bash
az webapp create \
  --resource-group hanataba-rg \
  --plan hanataba-plan \
  --name hanataba-app \
  --runtime "NODE|18-lts"
```

2. **Deploy with ZIP**
```bash
npm run build
zip -r deploy.zip . -x "node_modules/*" ".git/*"
az webapp deploy --resource-group hanataba-rg --name hanataba-app --src-path deploy.zip
```

## 🐳 Docker Deployment

### Production Dockerfile
```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
    restart: unless-stopped
```

## 🔐 SSL/TLS Setup

### Let's Encrypt with Certbot
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get Certificate
sudo certbot --nginx -d hanataba.jp -d www.hanataba.jp

# Auto-renewal
sudo certbot renew --dry-run
```

### Cloudflare SSL
1. Add site to Cloudflare
2. Update nameservers
3. Enable "Full (strict)" SSL mode
4. Configure Page Rules for caching

## 📊 Monitoring & Logging

### Vercel Analytics
Automatically included with Vercel deployment.

### Custom Monitoring

1. **Sentry Setup**
```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

2. **Custom Logging**
```javascript
// lib/logger.js
import winston from 'winston';
import { Logtail } from '@logtail/node';

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    logtail.winston()
  ]
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Already configured in `.github/workflows/ci.yml`

### Additional Deployment Hooks

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔧 Health Checks

### API Health Endpoint
```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}
```

### Uptime Monitoring
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)
- [StatusPage](https://www.statuspage.io)

## 📈 Performance Optimization

### CDN Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.hanataba.jp'],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/hanataba/'
  }
};
```

### Cache Headers
```javascript
// pages/api/[...].js
res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=59');
```

## 🚨 Rollback Strategy

### Vercel Rollback
```bash
vercel rollback [deployment-url]
```

### Git Rollback
```bash
git revert HEAD
git push origin main
```

### Database Rollback
Always create backups before deployment:
```bash
pg_dump database_url > backup_$(date +%Y%m%d).sql
```

## 📝 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate active
- [ ] Monitoring configured
- [ ] Error tracking enabled
- [ ] Backup created
- [ ] Health checks passing
- [ ] Performance tested
- [ ] Security headers configured
- [ ] CDN configured

---

**Support**: devops@hanataba.jp
**Status Page**: https://status.hanataba.jp