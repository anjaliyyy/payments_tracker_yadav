using System;
using System.Linq;
using JpfPaymentsApi.Models;

namespace JpfPaymentsApi.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            // Only seed once
            if (context.Vendors.Any()) return;

            // Vendors
            var carbone = new Vendor
            {
                VendorId = Guid.NewGuid(),
                VendorName = "Carbone Italian Food",
                Category = "Restaurant",
                CreatedDate = DateTime.Now
            };

            var flowers = new Vendor
            {
                VendorId = Guid.NewGuid(),
                VendorName = "Flowers Co",
                Category = "Florist",
                CreatedDate = DateTime.Now
            };

            var ocean = new Vendor
            {
                VendorId = Guid.NewGuid(),
                VendorName = "Ocean Spa",
                Category = "Wellness",
                CreatedDate = DateTime.Now
            };

            context.Vendors.AddRange(carbone, flowers, ocean);
            context.SaveChanges();

            // Bills
            var bill1 = new Bill
            {
                BillId = Guid.NewGuid(),
                VendorId = carbone.VendorId,
                BillNumber = "CB-001",
                BillDate = DateTime.Now.AddDays(-10),
                DueDate = DateTime.Now.AddDays(10),
                Amount = 1200.00m,
                PaidAmount = 0m,
                Status = "Pending"
            };

            var bill2 = new Bill
            {
                BillId = Guid.NewGuid(),
                VendorId = flowers.VendorId,
                BillNumber = "FL-002",
                BillDate = DateTime.Now.AddDays(-20),
                DueDate = DateTime.Now.AddDays(-2),
                Amount = 750.00m,
                PaidAmount = 250.00m,
                Status = "Partially Paid"
            };

            var bill3 = new Bill
            {
                BillId = Guid.NewGuid(),
                VendorId = ocean.VendorId,
                BillNumber = "OS-003",
                BillDate = DateTime.Now.AddDays(-30),
                DueDate = DateTime.Now.AddDays(-5),
                Amount = 500.00m,
                PaidAmount = 500.00m,
                Status = "Paid"
            };

            context.Bills.AddRange(bill1, bill2, bill3);
            context.SaveChanges();

            // Payments (for partial/paid bills)
            var payment1 = new Payment
            {
                PaymentId = Guid.NewGuid(),
                BillId = bill2.BillId,
                Amount = 250.00m,
                PaymentDate = DateTime.Now.AddDays(-5),
                Method = "Credit Card"
            };

            var payment2 = new Payment
            {
                PaymentId = Guid.NewGuid(),
                BillId = bill3.BillId,
                Amount = 500.00m,
                PaymentDate = DateTime.Now.AddDays(-10),
                Method = "Bank Transfer"
            };

            context.Payments.AddRange(payment1, payment2);
            context.SaveChanges();
        }
    }
}
