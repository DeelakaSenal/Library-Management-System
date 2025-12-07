# Library Management System

A full-stack Library Management System built with C# .NET Web API (backend) and React TypeScript (frontend). This application allows users to manage books with full CRUD operations and includes user authentication.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Authentication](#authentication)
- [Screenshots](#screenshots)

## ✨ Features

### Core Features

- **Book Management**
  - Create new book records
  - View all books with search functionality
  - Update existing book information
  - Delete books from the library

### User Features

- **Authentication & Authorization**
  - User registration
  - User login with JWT tokens
  - Secure password hashing
  - Protected routes

### UI/UX

- Responsive design
- Modern and clean interface
- Real-time search and filtering
- Form validation
- Error handling with user-friendly messages

## 🛠 Technology Stack

### Backend

- **Framework**: .NET 9.0 Web API
- **Database**: SQLite with Entity Framework Core
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: BCrypt
- **ORM**: Entity Framework Core 9.0

### Frontend

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3

## 📁 Project Structure

```
library_management_system/
├── backend/
│   └── LibraryManagementAPI/
│       ├── Controllers/
│       │   ├── AuthController.cs       # Authentication endpoints
│       │   └── BooksController.cs      # Book CRUD endpoints
│       ├── Data/
│       │   └── LibraryDbContext.cs     # Database context
│       ├── DTOs/
│       │   ├── AuthDto.cs              # Auth data transfer objects
│       │   └── BookDto.cs              # Book data transfer objects
│       ├── Models/
│       │   ├── Book.cs                 # Book entity
│       │   └── User.cs                 # User entity
│       ├── Services/
│       │   ├── IAuthService.cs         # Auth service interface
│       │   └── AuthService.cs          # Auth service implementation
│       ├── Program.cs                   # Application entry point
│       └── appsettings.json            # Configuration
│
└── frontend/
    └── library-management-ui/
        ├── src/
        │   ├── components/
        │   │   ├── Login.tsx           # Login component
        │   │   ├── Register.tsx        # Registration component
        │   │   ├── BookList.tsx        # Book list display
        │   │   ├── BookForm.tsx        # Book create/edit form
        │   │   ├── Navbar.tsx          # Navigation bar
        │   │   └── *.css               # Component styles
        │   ├── context/
        │   │   └── AuthContext.tsx     # Authentication context
        │   ├── pages/
        │   │   ├── AuthPage.tsx        # Login/Register page
        │   │   └── Dashboard.tsx       # Main dashboard
        │   ├── services/
        │   │   └── api.ts              # API service layer
        │   ├── types/
        │   │   └── index.ts            # TypeScript interfaces
        │   ├── App.tsx                 # Root component
        │   └── main.tsx                # Application entry
        └── package.json
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **.NET SDK 9.0 or higher**

  - Download from: https://dotnet.microsoft.com/download
  - Verify: `dotnet --version`

- **Node.js 18.0 or higher**

  - Download from: https://nodejs.org/
  - Verify: `node --version`

- **npm or yarn**
  - Comes with Node.js
  - Verify: `npm --version`

## 🚀 Installation & Setup

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend/LibraryManagementAPI
   ```

2. **Restore NuGet packages:**

   ```bash
   dotnet restore
   ```

3. **Apply database migrations:**

   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

   _Note: If `dotnet ef` is not recognized, install it globally:_

   ```bash
   dotnet tool install --global dotnet-ef
   ```

4. **Build the project:**
   ```bash
   dotnet build
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend/library-management-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## ▶️ Running the Application

### Start the Backend (Terminal 1)

```bash
cd backend/LibraryManagementAPI
dotnet run
```

The API will start at: **http://localhost:5000**

### Start the Frontend (Terminal 2)

```bash
cd frontend/library-management-ui
npm run dev
```

The UI will start at: **http://localhost:5173**

### Access the Application

1. Open your browser and go to: **http://localhost:5173**
2. Register a new account
3. Login with your credentials
4. Start managing books!

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response: 200 OK
{
  "token": "jwt_token_string",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response: 200 OK
{
  "token": "jwt_token_string",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string"
  }
}
```

### Book Endpoints (Requires Authentication)

#### Get All Books

```http
GET /api/books
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 1,
    "title": "string",
    "author": "string",
    "description": "string",
    "publishedYear": 2024
  }
]
```

#### Get Book by ID

```http
GET /api/books/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "title": "string",
  "author": "string",
  "description": "string",
  "publishedYear": 2024
}
```

#### Create Book

```http
POST /api/books
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "author": "string",
  "description": "string",
  "publishedYear": 2024
}

Response: 201 Created
{
  "id": 1,
  "title": "string",
  "author": "string",
  "description": "string",
  "publishedYear": 2024
}
```

#### Update Book

```http
PUT /api/books/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": 1,
  "title": "string",
  "author": "string",
  "description": "string",
  "publishedYear": 2024
}

Response: 204 No Content
```

#### Delete Book

```http
DELETE /api/books/{id}
Authorization: Bearer {token}

Response: 204 No Content
```

## 🗄 Database

### Database Technology

- **SQLite** - A lightweight, file-based database
- Database file location: `backend/LibraryManagementAPI/library.db`

### Database Schema

#### Users Table

| Column       | Type    | Description                 |
| ------------ | ------- | --------------------------- |
| Id           | INTEGER | Primary key, auto-increment |
| Username     | TEXT    | Unique username             |
| Email        | TEXT    | Unique email address        |
| PasswordHash | TEXT    | BCrypt hashed password      |

#### Books Table

| Column        | Type    | Description                 |
| ------------- | ------- | --------------------------- |
| Id            | INTEGER | Primary key, auto-increment |
| Title         | TEXT    | Book title                  |
| Author        | TEXT    | Book author                 |
| Description   | TEXT    | Book description            |
| PublishedYear | INTEGER | Year of publication         |

## 🔐 Authentication

### JWT Authentication Flow

1. **User Registration/Login**

   - User provides credentials
   - Backend validates and generates JWT token
   - Token is stored in browser's localStorage

2. **Authenticated Requests**

   - Frontend includes token in Authorization header
   - Backend validates token on protected routes
   - Access granted if token is valid

3. **Token Storage**
   - Token stored in localStorage
   - Automatically included in API requests
   - Cleared on logout

### Security Features

- Passwords hashed using BCrypt
- JWT tokens with configurable expiration
- Protected API endpoints
- CORS configured for security

## 🎨 Frontend Features

### Components

1. **Authentication Components**

   - Login form with validation
   - Registration form with password confirmation
   - Automatic redirect on authentication

2. **Book Management Components**

   - Book list with grid layout
   - Search/filter functionality
   - Create/Edit modal form
   - Delete confirmation

3. **Navigation**
   - Sticky navigation bar
   - User information display
   - Logout functionality

### State Management

- React Context API for authentication state
- Local state management for component data
- Persistent authentication via localStorage

## 🧪 Testing the Application

### Manual Testing Checklist

#### Authentication

- [ ] Register a new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Logout functionality
- [ ] Token persistence across page refreshes

#### Book Management

- [ ] Create a new book
- [ ] View all books
- [ ] Search for books by title/author
- [ ] Edit an existing book
- [ ] Delete a book
- [ ] Validation on form fields

## 🐛 Troubleshooting

### Backend Issues

**Issue: Port 5000 already in use**

```bash
# Solution: Change port in Properties/launchSettings.json
# Or kill the process using port 5000
```

**Issue: Database not found**

```bash
# Solution: Run migrations
dotnet ef database update
```

### Frontend Issues

**Issue: Cannot connect to API**

```bash
# Solution: Check API_BASE_URL in src/services/api.ts
# Ensure backend is running on http://localhost:5000
```

**Issue: CORS error**

```bash
# Solution: Verify CORS configuration in backend Program.cs
# Ensure frontend URL is in allowed origins
```

## 📝 Development Notes

### Key Design Decisions

1. **SQLite Database**: Chosen for simplicity and portability
2. **JWT Authentication**: Stateless authentication for scalability
3. **React Context**: Global state management for authentication
4. **TypeScript**: Type safety and better developer experience
5. **Component-based Architecture**: Reusable and maintainable code

### Best Practices Implemented

- ✅ Separation of concerns (Controllers, Services, Models)
- ✅ DTOs for data transfer
- ✅ Async/await for database operations
- ✅ Error handling and validation
- ✅ Responsive design
- ✅ Clean code principles
- ✅ TypeScript for type safety
- ✅ RESTful API design

## 🔮 Future Enhancements

- [ ] Book borrowing system
- [ ] User roles (Admin, Librarian, Member)
- [ ] Book categories and tags
- [ ] Advanced search and filters
- [ ] Book cover image upload
- [ ] Reading history
- [ ] Book recommendations
- [ ] Email notifications
- [ ] Export data to PDF/Excel
- [ ] Unit and integration tests

## 👨‍💻 Development Timeline

- **Day 1-2**: Backend setup, models, and database
- **Day 3**: Authentication implementation
- **Day 4**: Book CRUD API endpoints
- **Day 5-6**: Frontend components and styling
- **Day 7**: Testing, bug fixes, and documentation

## 📄 License

This project is developed as an assignment for educational purposes.

## 🙏 Acknowledgments

- .NET documentation
- React documentation
- Entity Framework Core documentation
- JWT authentication best practices

---

**Developed by**: [Your Name]
**Date**: December 2025
**Version**: 1.0.0
