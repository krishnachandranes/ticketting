# 🎫 Ticketing System - Backend

Express.js backend for the Ticketing System application.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get single ticket
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### Users
- `GET /api/users` - Get all users

## 📁 Data Storage

Data is stored in JSON files:
- `data/tickets.json` - All ticket data
- `data/users.json` - User information

## 🔧 Configuration

- **Port**: 5000 (configurable via PORT environment variable)
- **CORS**: Enabled for `http://localhost:3000`
- **Body Parser**: JSON support enabled

## 📝 Request/Response Examples

### Create Ticket
```bash
POST /api/tickets
Content-Type: application/json

{
  "title": "Website Issue",
  "description": "Users cannot login",
  "priority": "High",
  "assignedTo": "john@example.com"
}
```

### Update Ticket
```bash
PUT /api/tickets/:id
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "Medium"
}
```

## 🛠️ Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **uuid** - Unique ID generation

## 🔍 Error Handling

- 400: Bad Request (validation errors)
- 404: Not Found (resource not found)
- 500: Internal Server Error (server errors)

All errors return JSON format:
```json
{
  "error": "Error message"
}
```

