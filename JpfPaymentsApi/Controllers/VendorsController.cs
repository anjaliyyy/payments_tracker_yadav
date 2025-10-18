using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JpfPaymentsApi.Data;
using JpfPaymentsApi.Models;

namespace JpfPaymentsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendorsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetVendors()
        {
            var vendors = await _context.Vendors
                .Include(v => v.Bills)
                .Select(v => new
                {
                    v.VendorId,
                    v.VendorName,
                    v.Category,
                    BalanceOwed = v.Bills.Sum(b => b.Amount - b.PaidAmount)
                })
                .ToListAsync();

            return Ok(vendors);
        }

        [HttpPost]
        public async Task<ActionResult<Vendor>> AddVendor(Vendor vendor)
        {
            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVendors), new { id = vendor.VendorId }, vendor);
        }
    }
}
