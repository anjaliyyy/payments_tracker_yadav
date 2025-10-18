using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JpfPaymentsApi.Models
{
    public class Vendor
    {
        [Key]
        public Guid VendorId { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(200)]
        public string VendorName { get; set; }

        [MaxLength(100)]
        public string Category { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<Bill> Bills { get; set; } = new List<Bill>();
    }
}
