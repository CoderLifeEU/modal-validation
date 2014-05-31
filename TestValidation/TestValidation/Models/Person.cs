using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TestValidation.Models
{
    public class Person
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public int Age { get; set; }
    }
}