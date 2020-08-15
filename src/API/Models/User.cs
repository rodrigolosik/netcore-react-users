using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } 
        public DateTime DateBirth { get; set; }
        public Gender Gender { get; set; }
        public Address Address { get; set; }
    }
}