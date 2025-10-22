
# payments_tracker_yadav

JPF Capital Take-Home Project
Estimated Time: 6–7 Hours

## Mini Payments Tracker

A full-stack web application built for tracking vendors, bills, and payments.
This project was created as a candidate coding project for JPF Capital, showcasing backend and frontend integration with a clean UI and persistent data storage.

---

## Features

* **Vendor Management**: View all vendors and their balances.
* **Bill Tracking**: See detailed bill information per vendor.
* **Payment Entry**: Add new payments with date, method, and vendor selection.
* **Real-Time Balance Updates**: Automatically updates vendor balances when payments are added.
* **Pre-Seeded Demo Data**: Includes sample vendors and bills for easy testing.

---

## Tech Stack

| Layer        | Technology                                       |
| ------------ | ------------------------------------------------ |
| Frontend     | Angular 17, TypeScript, TailwindCSS              |
| Backend      | ASP.NET Core Web API (C#), Entity Framework Core |
| Database     | SQLite (local `app.db`)                          |
| Runtime      | .NET 9.0                                         |
| UI Framework | TailwindCSS                                      |

---

## Preloaded Demo Vendors

| # | Vendor               | Category   | Balance   |
| - | -------------------- | ---------- | --------- |
| 1 | Flowers Co           | Florist    | $500.00   |
| 2 | Carbone Italian Food | Restaurant | $1,200.00 |
| 3 | Ocean Spa            | Wellness   | $0.00     |

---

## Setup Guide (For New Machines)

Follow these steps to run the Mini Payments Tracker project on any computer.

### 1. Install Prerequisites

| Tool              | Version | Install Command / Link                                                         |
| ----------------- | ------- | ------------------------------------------------------------------------------ |
| Node.js           | ≥ 18.x  | [https://nodejs.org/](https://nodejs.org/)                                     |
| npm               | ≥ 9.x   | (comes with Node)                                                              |
| Angular CLI       | ≥ 17    | `npm install -g @angular/cli`                                                  |
| .NET SDK          | 9.0     | [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download) |
| SQLite (optional) | —       | [https://sqlitebrowser.org/](https://sqlitebrowser.org/)                       |

---

### 2. Clone the Repository

```bash
git clone https://github.com/anjaliyyy/payments_tracker_yadav.git
cd payments_tracker_yadav
```

---

### 3. Backend Setup (ASP.NET Core API)

```bash
cd JpfPaymentsApi
dotnet restore
dotnet run
```

The API will start at:
`http://localhost:5117`

You should see:

```
Now listening on: http://localhost:5117
Application started. Press Ctrl+C to shut down.
```

---

### 4. Frontend Setup (Angular)

Open a new terminal window/tab:

```bash
cd payments-ui
npm install
```

If needed, install specific packages manually:

```bash
npm install chart.js ng2-charts
npm install @angular/common @angular/core @angular/forms @angular/platform-browser
npm install rxjs tailwindcss
```

Then run the Angular app:

```bash
ng serve
```

The frontend will start at:
`http://localhost:4200`

Open that link in your browser to view the dashboard.

---

### 5. Reset or Recreate the Database (Optional)

If you want to rebuild the demo data:

```bash
cd JpfPaymentsApi
dotnet ef database drop -f
dotnet ef migrations add InitialCreate
dotnet ef database update
```

This will recreate the local `app.db` file with seeded vendors and bills.

---

## Quick Start

For a brand-new setup:

```bash
git clone https://github.com/anjaliyyy/payments_tracker_yadav.git
cd payments_tracker_yadav

# Backend
cd JpfPaymentsApi
dotnet restore
dotnet run

# Frontend (new terminal)
cd payments-ui
npm install
ng serve
```

Then open [http://localhost:4200](http://localhost:4200)

---

## Tip

Everything runs locally; no external keys or credentials are required.
The project auto-seeds sample vendors, bills, and payments for immediate demo use.

---
