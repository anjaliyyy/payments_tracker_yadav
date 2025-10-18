using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JpfPaymentsApi.Models
{
    public class Bill
    {
        [Key]
        public Guid BillId { get; set; } = Guid.NewGuid();

        [Required]
        public Guid VendorId { get; set; }

        [ForeignKey(nameof(VendorId))]
        public Vendor Vendor { get; set; }

        [MaxLength(50)]
        public string BillNumber { get; set; }

        public DateTime BillDate { get; set; } = DateTime.UtcNow;
        public DateTime DueDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal PaidAmount { get; set; } = 0;

        [MaxLength(50)]
        public string Status { get; set; } = "Pending";

        // Navigation
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}
