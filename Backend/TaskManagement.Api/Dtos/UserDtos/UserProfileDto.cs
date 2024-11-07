namespace TaskManagement.Api.Dtos
{
    public class UserProfileDto
    {
          public int Id { get; set; }
        public string ProfilePictureUrl { get; set; }
        public string ContactInformation { get; set; }
        public string PhoneNumber { get; set; }
        public string UserId { get; set; }
        public int TeamId { get; set; }
        public string TeamName { get; set; } // Optional
    }
}
