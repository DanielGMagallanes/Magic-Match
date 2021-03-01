using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ModelLayer
{
    public class PairMatch
    {
        [Key]
        public int pairId { get; set; }
        public int matchId { get; set; }
        public Player player { get; set; }
        public int cardId { get; set; }
    }
}
