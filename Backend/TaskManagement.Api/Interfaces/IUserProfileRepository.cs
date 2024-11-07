using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Interfaces
{
    public interface IUserProfileRepository
    {
         Task<UserProfile> GetUserProfileByIdAsync(int id);
        Task<List<UserProfile>> GetUserProfilesAsync();
        Task<UserProfile> GetUserProfileByUserIdAsync(string userId);
        Task<UserProfile> AddUserProfileAsync(UserProfile userProfile);
        Task<UserProfile> UpdateUserProfileAsync(UserProfile userProfile);
        Task<bool> DeleteUserProfileAsync(int id);
    }
}
