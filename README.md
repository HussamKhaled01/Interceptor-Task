# Interceptor & Authorization Mastery Walkthrough

This demo project shows how JWT authentication works end-to-end using Angular HTTP Interceptors and .NET 8, while demonstrating advanced features like performance monitoring, global loading states, and automated role-based access control.

**Backend:** .NET 8 Web API with ASP.NET Identity + SQL Server  
**Frontend:** Angular 17+ with modern Functional Interceptors

---

## 🚀 Advanced Professional Features

This project has been enhanced with four professional-grade features to demonstrate "Senior-level" development practices.

### ⏱️ 1. Performance Monitoring (`performanceInterceptor`)
This interceptor tracks the "Round Trip Time" (RTT) of every HTTP request.
- **Observability:** Records a timestamp when a request starts and logs the final duration to the browser console using RxJS `finalize`.
- **Why it's important:** Real-world apps need monitoring to identify slow APIs and improve UX.

### 🔐 2. Automated Authorization Check (RBAC)
Demonstrates the difference between **Authentication** (who you are) and **Authorization** (what you can do).
- **Enforcement:** The backend uses `[Authorize(Roles = "Admin")]` to block unauthorized requests with a **403 Forbidden** status code.
- **Automated Demo:** The Dashboard includes:
  - **Blue Button ("Admin Action")**: Calls a restricted API that succeeds for your Admin user.
  - **Red Button ("Forbidden Action")**: Calls a restricted API that is blocked, demonstrating a 403 refusal.

### ⌛ 3. Global Loading Spinner
An automated UI feature that shows a full-screen blurred overlay during ANY network activity.
- **Technical Detail:** Uses **Angular Signals** and an interceptor to track the "active request count" globally.

### 🛑 4. Global Error Handling (Toasts)
Centralizes error detection. Instead of manual code in every component, a global interceptor catches errors (401, 403, 500) and displays a beautiful "Toast" notification.

---

## 📕 The Core Concept

Every API call to a protected endpoint needs an `Authorization` header. Instead of adding it manually in every service, the **`authInterceptor`** handles it automatically:

```
Request → [AuthInterceptor] → adds Bearer token → API
```

---

## 🔑 Seeded User

| Email          | Password   | Role      |
|----------------|------------|-----------|
| demo@demo.com  | Demo@1234  | **Admin** |

---

## 📂 Project Structure

```
backend/
└── AuthDemo.Api/
    ├── Controllers/
    │   ├── AuthController.cs      ← POST /login, /admin-check, /fail-check
    │   └── ProductsController.cs  ← Generic Programming Demo
    ├── Data/
    │   ├── AppDbContext.cs
    │   └── DbSeeder.cs            ← Seeds the Admin user/role
    ├── Models/
    │   ├── ApiResponse.cs         ← Generic Wrapper
    │   ├── Product.cs             ← Generic Test Model
    │   └── LoginRequest.cs
    └── Services/
        └── TokenService.cs        ← JWT generation with Role claims

frontend/src/app/
├── core/
│   ├── interceptors/
│   │   ├── auth.interceptor.ts    ← Attaches JWT tokens
│   │   ├── performance.interceptor.ts
│   │   ├── loading.interceptor.ts
│   │   └── error.interceptor.ts
│   ├── models/
│   │   ├── api-response.model.ts  ← Generic interface
│   │   └── product.model.ts
│   └── services/
│       ├── auth.service.ts
│       ├── loading.service.ts     ← State for spinner
│       └── toast.service.ts       ← State for notifications
└── shared/components/             ← Global Spinner & Toast UI
```

---

## 🏗️ Generic Programming Essentials (Task Implementation)

This project includes a **Generic Library** demonstration in both C# and TypeScript to showcase type safety and code reusability.

### 🧩 C# Implementation (Backend)
Located in `backend/AuthDemo.Api/Models/ApiResponse.cs` and `Controllers/ProductsController.cs`.
- **Generic Class**: `ApiResponse<T> where T : notnull` - A standardized wrapper for all API responses.
- **Generic Methods**: `CreateSuccess(T data)` and `CreateError(string message)` - Static helpers for consistent response handling.
- **Tested with 3 different types to prove the generic works for any data:**
    1. `ApiResponse<string>` — wraps a simple text message (`/api/products/status`)
    2. `ApiResponse<int>` — wraps a single number (`/api/products/count`)
    3. `ApiResponse<Product>` — wraps a full object (`/api/products/not-found/{id}`)

### 🔷 TypeScript Implementation (Frontend)
Located in `frontend/src/app/core/models/api-response.model.ts`.
- **Generic Interface**: `ApiResponse<T>` - Ensures the frontend can handle any wrapped data type with full IntelliSense support.
- **Generic Utility**: `logResponse<T extends { success: boolean; message: string }>(response: T)` - A constrained generic method for logging API results.

### ❓ Why Generics?
1. **Code Reusability**: Instead of creating `StringResponse`, `IntResponse`, and `ProductResponse`, a single `ApiResponse<T>` handles everything.
2. **Type Safety**: Generics catch type mismatches at compile-time rather than runtime.
3. **Clean Architecture**: Standardizes the "contract" between Backend and Frontend.

---

## 🛠️ Setup & Execution

### 💻 Backend
```bash
cd backend/AuthDemo.Api
dotnet run
```
*App runs on `http://localhost:5000`. Database is created automatically on first run.*

### 🎨 Frontend
```bash
cd frontend
npm install
ng serve
```
*App runs on `http://localhost:4200`.*

---

## 🏁 How to Verify (The Demo Flow)

1. **Start both Backend and Frontend.**
2. **Login** as `demo@demo.com`. Watch the **Spinner** appear.
3. **Check Console (F12)** to see the **Performance** timing logs.
4. **Click "Admin Action (Success)"** to see a successful role check.
5. **Click "Forbidden Action (Fail)"** to see a **403 Forbidden** toast notification.
6. **Navigate to Swagger** at `http://localhost:5000/swagger` to test the **ProductsController** with 3 different data types.

---
*Developed as a professional demonstration of Full-Stack Interceptor, Security patterns, and Generic Programming Essentials.*