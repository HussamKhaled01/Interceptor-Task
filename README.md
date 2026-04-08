# Interceptor Authentication Walkthrough

A demo project showing how JWT authentication works end-to-end using an Angular HTTP Interceptor.

**Backend:** .NET 8 Web API with ASP.NET Identity + SQL Server  
**Frontend:** Angular 17 with a functional HTTP interceptor

---

## The Concept

Every API call to a protected endpoint needs an `Authorization` header.  
Instead of adding it manually in every service, the interceptor handles it **automatically**:

```
Request → [AuthInterceptor] → adds Bearer token → API
```

Open `src/app/core/interceptors/auth.interceptor.ts` — that's the key file.

---

## Seeded User

| Email          | Password   |
|----------------|------------|
| demo@demo.com  | Demo@1234  |

---

## Setup

### Backend

1. Update the connection string in `appsettings.json` if needed  
   (default uses LocalDB — works out of the box on Windows with VS)

2. Run the API:
   ```bash
   cd backend/AuthDemo.Api
   dotnet run
   ```
   The database and seeded user are created automatically on first run.  
   API runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
ng serve
```

App runs on `http://localhost:4200`

---

## Project Structure

```
backend/
└── AuthDemo.Api/
    ├── Controllers/
    │   ├── AuthController.cs      ← POST /api/auth/login
    │   └── ProductsController.cs  ← GET  /api/products  [Authorize]
    ├── Data/
    │   ├── AppDbContext.cs
    │   └── DbSeeder.cs            ← seeds demo@demo.com
    ├── Models/
    │   ├── LoginRequest.cs
    │   └── LoginResponse.cs
    └── Services/
        └── TokenService.cs        ← JWT generation

frontend/src/app/
├── core/
│   ├── interceptors/
│   │   └── auth.interceptor.ts   ← attaches the token to every request
│   ├── guards/
│   │   └── auth.guard.ts         ← blocks unauthenticated navigation
│   └── services/
│       └── auth.service.ts       ← login / logout / token management
└── pages/
    ├── login/                    ← public route
    └── dashboard/                ← protected route (products list)
```

---

## Flow

1. User submits login form → `POST /api/auth/login`
2. API validates credentials, returns a JWT
3. Angular stores the token in `localStorage`
4. User navigates to `/dashboard` → `authGuard` checks `isLoggedIn()`
5. `DashboardComponent` calls `GET /api/products`
6. **`authInterceptor` intercepts the request**, clones it, and adds the `Authorization` header
7. API validates the JWT, returns the products


# Backend
    
    cd backend/AuthDemo.Api && dotnet run

# Frontend

    cd frontend && npm install && ng serve