namespace TaskManagement.Api.Dtos.UserDtos
{
    public class UpdateUserProfileDto
    {
        public string ProfilePictureUrl { get; set; }
        public string ContactInformation { get; set; }
        public string PhoneNumber { get; set; }
        public int TeamId { get; set; }
    }
}
