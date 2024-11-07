using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Dtos.AuthDtos;
using TaskManagement.Api.Interfaces;
using TaskManagement.Api.Mappings;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signinManager;
        private readonly IUserProfileRepository _userProfileRepository;

        public AccountController(
            UserManager<User> userManager,
            ITokenService tokenService,
            SignInManager<User> signInManager,
            IUserProfileRepository userProfileRepository)
        {
            _userManager = userManager;
            _signinManager = signInManager;
            _tokenService = tokenService;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username!");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            var userRole = await _userManager.GetRolesAsync(user);
            return Ok(new NewUserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                Role = userRole.FirstOrDefault()
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new User
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        // Create user profile
                        var userProfile = new UserProfile
                        {
                            UserId = appUser.Id,
                            ProfilePictureUrl = "",
                            ContactInformation = "",
                            PhoneNumber = "",
                            TeamId=1
                        };
                        await _userProfileRepository.AddUserProfileAsync(userProfile);

                        var userRole = await _userManager.GetRolesAsync(appUser);
                        return Ok(new NewUserDto
                        {
                            Id = appUser.Id,
                            Username = appUser.UserName,
                            Email = appUser.Email,
                            Token = _tokenService.CreateToken(appUser),
                            Role = userRole.FirstOrDefault()
                        });
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new User
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "Admin");
                    if (roleResult.Succeeded)
                    {
                        // Create user profile
                        var userProfile = new UserProfile
                        {
                            UserId = appUser.Id,
                            ProfilePictureUrl = null,
                            ContactInformation = null,
                            PhoneNumber = null,
                            TeamId = 1
                        };
                        await _userProfileRepository.AddUserProfileAsync(userProfile);

                        var userRole = await _userManager.GetRolesAsync(appUser);
                        return Ok(new NewUserDto
                        {
                            Id = appUser.Id,
                            Username = appUser.UserName,
                            Email = appUser.Email,
                            Token = _tokenService.CreateToken(appUser),
                            Role = userRole.FirstOrDefault()
                        });
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
