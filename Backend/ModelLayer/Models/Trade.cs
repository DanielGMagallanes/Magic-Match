using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ModelLayer
{
    public class Trade
    {
        [Key]
        public int tradeId { get; set; }
        [Required]
        public Guid postPlayer { get; set; }
        public Guid acceptPlayer { get; set; }
        [Required]
        public int postPlayerCardOffer { get; set; }
        public int acceptPlayerCardOffer { get; set; }
        public bool active { get; set; }
        public bool accepted { get; set; }
    }
}
