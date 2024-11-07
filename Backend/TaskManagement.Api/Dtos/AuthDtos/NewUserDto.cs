using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Api.Dtos.AuthDtos
{
    public class NewUserDto
    {
        public string? Id {get;set;}
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
    }
}