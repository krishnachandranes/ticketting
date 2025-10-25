# 🎫 Ticketing System - Frontend

React 18+ frontend for the Ticketing System application.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will run on `http://localhost:3000`

## 📱 Features

- **Dashboard** - Statistics and charts
- **Ticket Management** - CRUD operations
- **User Management** - User list and assignment
- **Responsive Design** - Mobile-friendly
- **Real-time Updates** - Toast notifications

## 🛠️ Tech Stack

- **React 18+** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.js       # Navigation header
│   └── Sidebar.js      # Navigation sidebar
├── pages/            # Page components
│   ├── Dashboard.js   # Main dashboard
│   ├── TicketList.js  # Ticket listing
│   ├── TicketForm.js  # Create/edit tickets
│   ├── TicketDetail.js # Ticket details
│   └── UserManagement.js # User management
├── services/          # API services
│   └── api.js         # API client
├── App.js            # Main app component
├── index.js          # Entry point
└── index.css         # Global styles
```

## 🎨 UI Components

### Header
- Application branding
- User profile section
- Navigation links

### Sidebar
- Main navigation menu
- Active state indicators
- Responsive design

### Dashboard
- Statistics cards
- Interactive charts
- Latest tickets list

### Ticket Management
- Filterable ticket list
- Create/edit forms
- Detailed ticket view
- Status and priority indicators

## 📊 Charts

Using Recharts library:
- **Pie Chart** - Tickets by status
- **Bar Chart** - Tickets by priority
- **Responsive** - Adapts to screen size

## 🎯 Routing

- `/` - Dashboard (redirect)
- `/dashboard` - Main dashboard
- `/tickets` - Ticket list
- `/tickets/new` - Create ticket
- `/tickets/:id` - Ticket details
- `/tickets/:id/edit` - Edit ticket
- `/users` - User management

## 🔧 API Integration

All API calls are handled through the `services/api.js` file:
- Centralized API configuration
- Error handling
- Request/response interceptors

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS utilities
- Flexible grid layouts
- Touch-friendly interfaces

## 🚀 Build & Deploy

1. Build for production:
```bash
npm run build
```

2. The build folder contains static files ready for deployment

## 🔧 Development

- Hot reload enabled
- ESLint configuration
- Error boundaries
- Component-based architecture

