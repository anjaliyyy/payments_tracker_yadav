using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JpfPaymentsApi.Data;
using JpfPaymentsApi.Models;
using System.Text.Json;

namespace JpfPaymentsApi.Controllers
{
    [ApiController]
    [Route("api/payments")] //  route so Angular hits correctly
    public class PaymentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PaymentsController(AppDbContext context)
        {
            _context = context;
        }

        //  GET /api/payments?billId={guid}
        [HttpGet]
        public async Task<IActionResult> GetPayments([FromQuery] Guid billId)
        {
            var payments = await _context.Payments
                .Where(p => p.BillId == billId)
                .OrderByDescending(p => p.PaymentDate)
                .ToListAsync();

            return Ok(payments);
        }

        //  POST /api/payments
        [HttpPost]
        public async Task<IActionResult> AddPayment()
        {
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();

            Console.WriteLine("\n=== /api/payments POST RAW BODY ===");
            Console.WriteLine(body);

            try
            {
                var payment = JsonSerializer.Deserialize<Payment>(body, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (payment == null)
                {
                    Console.WriteLine(" Could not deserialize payment.");
                    return BadRequest("Payment object was null or invalid.");
                }

                Console.WriteLine($" Parsed Payment:");
                Console.WriteLine($"   BillId: {payment.BillId}");
                Console.WriteLine($"   Amount: {payment.Amount}");
                Console.WriteLine($"   Method: {payment.Method}");
                Console.WriteLine($"   Date: {payment.PaymentDate}");

                //  Check if bill exists
                var bill = await _context.Bills.FirstOrDefaultAsync(b => b.BillId == payment.BillId);
                if (bill == null)
                {
                    Console.WriteLine(" Bill not found in database.");
                    return BadRequest("Bill not found.");
                }

                //  Create payment
                payment.PaymentId = Guid.NewGuid();
                payment.PaymentDate = payment.PaymentDate.ToUniversalTime();
                _context.Payments.Add(payment);

                //  Update bill status
                bill.PaidAmount += payment.Amount;
                if (bill.PaidAmount <= 0)
                    bill.Status = "Pending";
                else if (bill.PaidAmount < bill.Amount)
                    bill.Status = "Partially Paid";
                else
                    bill.Status = "Paid";

                await _context.SaveChangesAsync();

                Console.WriteLine(" Payment added successfully!");
                return Ok(payment);
            }
            catch (Exception ex)
            {
                Console.WriteLine($" Exception: {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}
