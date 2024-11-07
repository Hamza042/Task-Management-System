using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace TaskManagement.Api.Models
{
    public class Team
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<UserProfile> UserProfiles { get; set; }
    }
}
