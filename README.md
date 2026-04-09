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
    │   └── ProductsController.cs  ← [Authorize] API
    ├── Data/
    │   ├── AppDbContext.cs
    │   └── DbSeeder.cs            ← Seeds the Admin user/role
    └── Services/
        └── TokenService.cs        ← JWT generation with Role claims

frontend/src/app/
├── core/
│   ├── interceptors/
│   │   ├── auth.interceptor.ts    ← Attaches JWT tokens
│   │   ├── performance.interceptor.ts
│   │   ├── loading.interceptor.ts
│   │   └── error.interceptor.ts
│   └── services/
│       ├── auth.service.ts
│       ├── loading.service.ts     ← State for spinner
│       └── toast.service.ts       ← State for notifications
└── shared/components/             ← Global Spinner & Toast UI
```

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
6. **Stop the Backend** and try to refresh to see the **Network Error** toast.

---
*Developed as a professional demonstration of Full-Stack Interceptor and Security patterns.*