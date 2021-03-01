using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ModelLayer
{
    public class Match
    {
        [Key]
        public int matchId { get; set; }
        public Player player1 { get; set; }
        public Player player2 { get; set; }
        public int player1PairPicked { get; set; }
        public int player2PairPicked { get; set; }
    }
}
