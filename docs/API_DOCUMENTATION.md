# API Documentation

## Base URL
```
Production: https://api.hanataba.jp/v1
Development: http://localhost:3000/api
```

## Authentication
All API requests require authentication using Bearer tokens:
```
Authorization: Bearer YOUR_API_TOKEN
```

## Endpoints

### Assessment API

#### Submit Assessment
```http
POST /api/assessment/submit
```

**Request Body:**
```json
{
  "companyName": "string",
  "industry": "string",
  "foundedYear": "number",
  "employeeCount": "number",
  "revenue": "number",
  "growthRate": "number",
  "fundingStage": "string",
  "challenges": ["string"],
  "email": "string",
  "phone": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "assessmentId": "uuid",
    "score": 85,
    "recommendation": "string",
    "nextSteps": ["string"],
    "reportUrl": "string"
  }
}
```

### Lead Management API

#### Create Lead
```http
POST /api/leads/create
```

**Request Body:**
```json
{
  "email": "string",
  "name": "string",
  "company": "string",
  "source": "string",
  "metadata": {}
}
```

#### Get Lead Status
```http
GET /api/leads/:id
```

**Response:**
```json
{
  "id": "uuid",
  "status": "new|qualified|contacted|converted",
  "score": 75,
  "assignedTo": "string",
  "lastContact": "datetime"
}
```

### Analytics API

#### Track Event
```http
POST /api/analytics/track
```

**Request Body:**
```json
{
  "event": "string",
  "properties": {},
  "userId": "string",
  "timestamp": "datetime"
}
```

#### Get Metrics
```http
GET /api/analytics/metrics
```

**Query Parameters:**
- `start_date`: ISO 8601 date
- `end_date`: ISO 8601 date
- `metrics`: comma-separated list

**Response:**
```json
{
  "metrics": {
    "visitors": 10000,
    "leads": 200,
    "conversions": 10,
    "revenue": 3000000
  },
  "period": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

### AI Consultation API

#### Start Consultation
```http
POST /api/consultation/start
```

**Request Body:**
```json
{
  "userId": "string",
  "context": {
    "company": {},
    "goals": ["string"],
    "timeline": "string"
  }
}
```

**Response:**
```json
{
  "sessionId": "uuid",
  "messages": [
    {
      "role": "assistant",
      "content": "string",
      "timestamp": "datetime"
    }
  ]
}
```

#### Send Message
```http
POST /api/consultation/:sessionId/message
```

**Request Body:**
```json
{
  "message": "string",
  "attachments": ["url"]
}
```

### Webhook Events

#### Lead Created
```json
{
  "event": "lead.created",
  "data": {
    "id": "uuid",
    "email": "string",
    "createdAt": "datetime"
  }
}
```

#### Assessment Completed
```json
{
  "event": "assessment.completed",
  "data": {
    "assessmentId": "uuid",
    "score": 85,
    "email": "string"
  }
}
```

#### Payment Succeeded
```json
{
  "event": "payment.succeeded",
  "data": {
    "customerId": "string",
    "amount": 100000,
    "plan": "better"
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

### Common Error Codes
- `AUTH_REQUIRED`: Authentication required
- `INVALID_TOKEN`: Invalid or expired token
- `RATE_LIMIT`: Rate limit exceeded
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Internal server error

## Rate Limiting
- **Default**: 100 requests per minute
- **Authenticated**: 1000 requests per minute
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## SDK Examples

### JavaScript/TypeScript
```typescript
import { HanatabaSDK } from '@hanataba/sdk';

const client = new HanatabaSDK({
  apiKey: 'YOUR_API_KEY',
  environment: 'production'
});

// Submit assessment
const result = await client.assessment.submit({
  companyName: 'Tech Startup Inc.',
  revenue: 50000000
});

// Track event
await client.analytics.track('page_view', {
  page: '/pricing'
});
```

### Python
```python
from hanataba import Client

client = Client(api_key="YOUR_API_KEY")

# Create lead
lead = client.leads.create(
    email="user@example.com",
    company="Tech Corp"
)

# Get metrics
metrics = client.analytics.get_metrics(
    start_date="2024-01-01",
    end_date="2024-01-31"
)
```

## Postman Collection
Download our [Postman Collection](https://api.hanataba.jp/postman) for testing.

## Support
- **Documentation**: https://docs.hanataba.jp
- **Status Page**: https://status.hanataba.jp
- **Support Email**: api-support@hanataba.jp