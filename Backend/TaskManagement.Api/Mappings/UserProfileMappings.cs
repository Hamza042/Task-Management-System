using TaskManagement.Api.Dtos;
using TaskManagement.Api.Dtos.AuthDtos;
using TaskManagement.Api.Dtos.UserDtos;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Mappings
{
    public static class UserProfileMappings
    {
        public static UserProfile ToProfileDto(this User newUser){
            return new UserProfile
                        {
                            UserId = newUser.Id,
                            ProfilePictureUrl = null,
                            ContactInformation = null,
                            PhoneNumber = null,
                            TeamId = 0 // Set default or null value for TeamId
                        };
        }
        public static UserProfileDto ToUserProfileDto(this UserProfile userProfile)
        {
            return new UserProfileDto
            {
                Id = userProfile.Id,
                ProfilePictureUrl = userProfile.ProfilePictureUrl,
                ContactInformation = userProfile.ContactInformation,
                PhoneNumber = userProfile.PhoneNumber,
                UserId = userProfile.UserId,
                TeamId = userProfile.TeamId,
                TeamName = userProfile.Team?.Name // Assuming you want to include the team name
            };
        }

        public static UserProfile ToEntity(this CreateUserProfileDto createUserProfileDto)
        {
            return new UserProfile
            {
                ProfilePictureUrl = createUserProfileDto.ProfilePictureUrl,
                ContactInformation = createUserProfileDto.ContactInformation,
                PhoneNumber = createUserProfileDto.PhoneNumber,
                UserId = createUserProfileDto.UserId,
                TeamId = createUserProfileDto.TeamId
            };
        }

        public static UserProfile ToEntity(this UpdateUserProfileDto updateUserProfileDto, UserProfile userProfile)
        {
            userProfile.ProfilePictureUrl = updateUserProfileDto.ProfilePictureUrl;
            userProfile.ContactInformation = updateUserProfileDto.ContactInformation;
            userProfile.PhoneNumber = updateUserProfileDto.PhoneNumber;
            userProfile.TeamId = updateUserProfileDto.TeamId;
            return userProfile;
        }
    }
}
