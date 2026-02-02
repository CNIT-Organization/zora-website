# Zora Website Backend

Backend API for Zora Education website built with Node.js and Express.

## Features

- Express.js RESTful API
- Email functionality via Nodemailer (Brevo SMTP)
- Dynamic content serving from JSON files
- Rate limiting and security middleware
- Health check endpoint
- Docker containerization

## API Endpoints

### Health Check

```
GET /api/health
```

### Configuration

```
GET /api/config         # Get all configuration
GET /api/config/:type   # Get specific config (pricing, about, contact, features, testimonials)
```

### Contact Form

```
POST /api/contact
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "Your message here"
}
```

### B2B Inquiry

```
POST /api/b2b
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Company Inc",
  "phone": "+971 XX XXX XXXX",
  "role": "Director",
  "companySize": "51-200",
  "requirements": "Your requirements"
}
```

## Configuration Files

All dynamic content is stored in `server/data/`:

- `pricing.json` - Pricing plans and tiers
- `about.json` - Company information and values
- `contact.json` - Contact details and form configuration
- `features.json` - Feature highlights
- `testimonials.json` - Customer testimonials

## Development

```bash
cd server
npm install
npm run dev
```

## Docker

Build and run:

```bash
docker-compose up -d
```

## Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `PORT` - Server port (default: 3001)
- `SMTP_*` - Email configuration
- `EMAIL_*` - Recipient email addresses
- `FRONTEND_URL` - CORS origin
- `RATE_LIMIT_*` - Rate limiting settings
