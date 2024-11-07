using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Data;
using TaskManagement.Api.Interfaces;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly ApplicationDBContext _context;

        public UserProfileRepository(ApplicationDBContext context)
        {
            _context = context;
        }
      public async Task<UserProfile> GetUserProfileByIdAsync(int id)
        {
            return await _context.UserProfiles.Include(up => up.Team).FirstOrDefaultAsync(up => up.Id == id);
        }
        public async Task<List<UserProfile>> GetUserProfilesAsync()
        {
            return await _context.UserProfiles.Include(up => up.Team).Include(up => up.User).ToListAsync();
        }

        public async Task<UserProfile> GetUserProfileByUserIdAsync(string userId)
        {
            return await _context.UserProfiles.Include(up => up.Team).Include(up => up.User)
                                              .FirstOrDefaultAsync(up => up.UserId == userId);
        }

        public async Task<UserProfile> AddUserProfileAsync(UserProfile userProfile)
        {
            _context.UserProfiles.Add(userProfile);
            await _context.SaveChangesAsync();
            return userProfile;
        }

        public async Task<UserProfile> UpdateUserProfileAsync(UserProfile userProfile)
        {
            _context.Entry(userProfile).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return userProfile;
        }

        public async Task<bool> DeleteUserProfileAsync(int id)
        {
            var userProfile = await _context.UserProfiles.FindAsync(id);
            if (userProfile == null)
            {
                return false;
            }

            _context.UserProfiles.Remove(userProfile);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
