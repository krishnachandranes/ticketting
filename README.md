# 🎫 Ticketing System

A complete full-stack ticketing system built with React 18+ and Node.js/Express.js, featuring JSON file storage for data persistence.

## 🚀 Features

- **Authentication System** - Mock login with JWT-like tokens
- **Dashboard** with ticket statistics and interactive charts
- **Ticket Management** - Create, view, edit, delete tickets
- **User Management** - Assign tickets to users
- **Real-time Statistics** - Track ticket counts by status and priority
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Built with Tailwind CSS
- **Protected Routes** - Secure access to all features

## 🛠️ Tech Stack

### Frontend
- React 18+
- React Router for navigation
- Axios for API calls
- Recharts for data visualization
- Tailwind CSS for styling
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- JSON file storage (tickets.json, users.json)
- CORS enabled for frontend communication
- UUID for unique ID generation

## 📁 Project Structure

```
ticketing/
├── backend/
│   ├── index.js              # Main server file
│   ├── routes/
│   │   ├── tickets.js        # Ticket API routes
│   │   └── users.js          # User API routes
│   ├── data/
│   │   ├── tickets.json      # Ticket data storage
│   │   └── users.json        # User data storage
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── App.js           # Main app component
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout (optional)

### Tickets (Protected)
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get single ticket
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### Users (Protected)
- `GET /api/users` - Get all users

**Note:** All routes except `/api/auth/login` require authentication via Bearer token.

## 🔐 Authentication

### Demo Credentials
- **Admin:** admin@test.com / admin123
- **User:** user1@test.com / user123

### Login Flow
1. Navigate to `/login`
2. Enter credentials
3. On success, redirect to `/dashboard`
4. All routes are protected except `/login`

## 🎯 Usage

1. **Login** - Authenticate with email/password
2. **Dashboard** - View ticket statistics and charts
3. **Tickets** - Manage all tickets with filtering options
4. **Create Ticket** - Add new tickets with title, description, priority, and assignment
5. **Edit Ticket** - Update ticket details and status
6. **User Management** - View available users for ticket assignment
7. **Logout** - Clear session and return to login

## 📈 Dashboard Features

- Total ticket count
- Tickets by status (Open, In Progress, Closed)
- Tickets by priority (High, Medium, Low)
- Latest 5 tickets with quick access
- Interactive charts using Recharts

## 🎨 UI Components

- **Login** - Authentication form with demo credentials
- **Header** - Navigation, branding, and logout
- **Sidebar** - Main navigation menu (hidden when not authenticated)
- **ProtectedRoute** - Route protection wrapper
- **Dashboard** - Statistics and charts
- **TicketList** - Filterable ticket list
- **TicketForm** - Create/edit ticket form
- **TicketDetail** - Individual ticket view
- **UserManagement** - User list and statistics

## 🔧 Development

### Backend Development
- Uses Express.js with middleware for JSON parsing
- CORS enabled for frontend communication
- Modular route structure
- Error handling and validation
- JSON file persistence

### Frontend Development
- React 18+ with hooks
- React Router for client-side routing
- Axios for HTTP requests
- Context API for state management
- Responsive design with Tailwind CSS

## 📝 Data Structure

### Ticket Object
```json
{
  "id": "unique-uuid",
  "title": "Ticket title",
  "description": "Detailed description",
  "priority": "High|Medium|Low",
  "status": "Open|In Progress|Closed",
  "assignedTo": "user@email.com",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

### User Object
```json
{
  "id": "unique-id",
  "name": "User Name",
  "email": "user@email.com"
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up a Node.js server
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Ensure port 5000 is accessible

### Frontend Deployment
1. Build the React app: `npm run build`
2. Serve the build folder with a web server
3. Configure API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
