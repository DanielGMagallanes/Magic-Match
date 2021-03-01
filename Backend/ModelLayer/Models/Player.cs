using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ModelLayer
{
    public class Player
    {
        [Key]
        public Guid playerId { get; set; } = new Guid();

        [StringLength(25, ErrorMessage ="The user name must be within 3 to 25 characters",MinimumLength = 3)]
        [Required]
        [Display(Name = "User Name")]
        public string userName { get; set; }

        [StringLength(25, ErrorMessage = "The user name must be within 3 to 25 characters", MinimumLength = 3)]
        [Required]
        [PasswordPropertyText(true)]
        public string password { get; set; }

        [Range(0,int.MaxValue)]
        [Display(Name = "Matches Won")]
        public int wins { get; set; }

        [Range(0, int.MaxValue)]
        [Display(Name = "Matches Lost")]
        public int losses { get; set; }

        //public int cardsLost { get; set;}
        //public int cardsWon { get; set; }

        public int tokens { get; set; }

        public bool login { get; set; }
    }
}
