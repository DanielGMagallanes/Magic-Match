using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ModelLayer.ModelViews
{
    public class PlayerViewModel
    {
        [StringLength(25, ErrorMessage = "The user name must be within 3 to 25 characters", MinimumLength = 3)]
        [Required]
        [Display(Name = "User Name")]
        public string userName { get; set; }

        [StringLength(25, ErrorMessage = "The user name must be within 3 to 25 characters", MinimumLength = 3)]
        [Required]
        [PasswordPropertyText(true)]
        public string password { get; set; }
    }
}
