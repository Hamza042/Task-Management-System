using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.Dtos;
using TaskManagement.Api.Dtos.UserDtos;
using TaskManagement.Api.Interfaces;
using TaskManagement.Api.Mappings;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;

        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserProfiles()
        {
            var userProfiles = await _userProfileRepository.GetUserProfilesAsync();
            return Ok(userProfiles.Select(s=>s.ToUserProfileDto()));
        }

         [HttpGet("{id}")]
        public async Task<IActionResult> GetUserProfile(int id)
        {
            var userProfile = await _userProfileRepository.GetUserProfileByIdAsync(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile.ToUserProfileDto());
        }

         [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUserProfile(string id)
        {
            var userProfile = await _userProfileRepository.GetUserProfileByUserIdAsync(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile.ToUserProfileDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserProfile([FromBody] CreateUserProfileDto createUserProfileDto)
        {
            var userProfile = createUserProfileDto.ToEntity();
            await _userProfileRepository.AddUserProfileAsync(userProfile);
            return CreatedAtAction(nameof(GetUserProfile), new { id = userProfile.Id }, userProfile.ToUserProfileDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserProfile(string id, [FromBody] UpdateUserProfileDto updateUserProfileDto)
        {
            var userProfile = await _userProfileRepository.GetUserProfileByUserIdAsync(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            userProfile = updateUserProfileDto.ToEntity(userProfile);
            await _userProfileRepository.UpdateUserProfileAsync(userProfile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserProfile(int id)
        {
            var userProfile = await _userProfileRepository.GetUserProfileByIdAsync(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            await _userProfileRepository.DeleteUserProfileAsync(id);
            return NoContent();
        }
    }
}
