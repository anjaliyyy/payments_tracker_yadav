# payments_tracker_yadav
JPF Capital take home project,
Estimated time 6-7 hours

# Mini Payments Tracker

A full-stack web application built for tracking vendors, bills, and payments.  
This project was created as a candidate coding project for JPF Capital, showcasing both backend and frontend integration with a clean UI and persistent data storage.

---

##  Features

- Vendor Management : View all vendors and their balances.
- Bill Tracking : See detailed bill information per vendor.
- Payment Entry : Add new payments with date, method, and vendor selection.
- Real-Time Balance Updates : Automatically updates vendor balances when payments are added.
- Pre-Seeded Demo Data : Includes sample vendors and bills for easy testing.

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
|Frontend | Angular 17, TypeScript, TailwindCSS |
| Backend | ASP.NET Core Web API (C#), Entity Framework Core |
| Database | SQLite (local `app.db`) |
| Runtime | .NET 9.0 |
| UI Framework | TailwindCSS |

---

---

## Preloaded Demo Vendors


| # | Vendor | Category | Balance |
|---|--------|-----------|----------|
| 1 | Flowers Co | Florist | \$500.00 |
| 2 | Carbone Italian Food | Restaurant | \$1,200.00 |
| 3 | Ocean Spa | Wellness | \$0.00 |

---

## Setup Instructions
Backend

Navigate to the backend folder: cd JpfPaymentsApi

Run the project dotnet run

The API should start at: http://localhost:5117

Frontend Open a new terminal and navigate to the Angular app: cd payments-ui

Install dependencies: npm install npm install chart.js ng2-charts npm install @angular/common @angular/core @angular/forms @angular/platform-browser npm install rxjs

Start the frontend: ng serve

Open your browser and visit: http://localhost:4200

If you need to reset the database:

dotnet ef database drop -f dotnet ef migrations add InitialCreate dotnet ef database update
