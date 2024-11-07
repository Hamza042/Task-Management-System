namespace TaskManagement.Api.Dtos.UserDtos
{
    public class CreateUserProfileDto
    {
       public string ProfilePictureUrl { get; set; }
        public string ContactInformation { get; set; }
        public string PhoneNumber { get; set; }
        public string UserId { get; set; }
        public int TeamId { get; set; }
    }
}
