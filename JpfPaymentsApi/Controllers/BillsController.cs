using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JpfPaymentsApi.Data;
using System;

namespace JpfPaymentsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BillsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBills([FromQuery(Name = "vendorId")] string vendorId)
        {
            if (!Guid.TryParse(vendorId, out Guid parsedVendorId))
                return BadRequest("Invalid vendorId format.");

            var bills = await _context.Bills
                .Where(b => b.VendorId == parsedVendorId)
                .Select(b => new
                {
                    b.BillId,
                    b.BillNumber,
                    b.BillDate,
                    b.DueDate,
                    b.Amount,
                    b.PaidAmount,
                    b.Status
                })
                .ToListAsync();

            return Ok(bills);
        }
    }
}
