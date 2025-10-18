using System;
using JpfPaymentsApi.Models; 

namespace JpfPaymentsApi.Models
{
    public class Payment
    {
        public Guid PaymentId { get; set; }
        public Guid BillId { get; set; }
        public Bill Bill { get; set; } = null!;  
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Method { get; set; } = string.Empty;
    }
}
