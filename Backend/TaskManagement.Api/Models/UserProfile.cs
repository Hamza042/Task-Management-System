using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagement.Api.Models
{
    public class UserProfile
    {
        [Key]
        public int Id { get; set; }

        [Url]
        public string? ProfilePictureUrl { get; set; }

        public string? ContactInformation { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Team")]
        public int TeamId { get; set; }
        public Team Team { get; set; }

    }
}
