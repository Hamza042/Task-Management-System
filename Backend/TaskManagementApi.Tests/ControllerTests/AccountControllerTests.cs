using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Api.Controllers;
using TaskManagement.Api.Dtos.AuthDtos;
using TaskManagement.Api.Interfaces;
using TaskManagement.Api.Models;
using TaskManagement.Api.Repositories;
using Xunit;

namespace TaskManagementApi.Tests.ControllerTests
{
    public class AccountControllerTests
    {
        private readonly ITokenService _tokenService;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly AccountController _controller;

        public AccountControllerTests()
        {
            _tokenService = A.Fake<ITokenService>();
            _userProfileRepository = A.Fake<IUserProfileRepository>();
            _userManager = A.Fake<UserManager<User>>();
            _signInManager = A.Fake<SignInManager<User>>();

            _controller = new AccountController(_userManager, _tokenService, _signInManager, _userProfileRepository);
        }

        [Fact]
        public async Task AccountController_Login_ValidCredentials_ReturnsOkResult()
        {
            // Arrange
            var loginDto = new LoginDto { Username = "testuser", Password = "password123" };
            var user = new User { Id = "1", UserName = "testuser", Email = "testuser@example.com" };
            var userRoles = new List<string> { "User" };

            var fakeUserSet = A.Fake<IQueryable<User>>();
            var userEnumerable = new List<User> { user }.AsQueryable();

            A.CallTo(() => fakeUserSet.Provider).Returns(userEnumerable.Provider);
            A.CallTo(() => fakeUserSet.Expression).Returns(userEnumerable.Expression);
            A.CallTo(() => fakeUserSet.ElementType).Returns(userEnumerable.ElementType);
            A.CallTo(() => fakeUserSet.GetEnumerator()).Returns(userEnumerable.GetEnumerator());

            A.CallTo(() => _userManager.Users).Returns(fakeUserSet);

            A.CallTo(() => _userManager.GetRolesAsync(user))
                .Returns(userRoles);
            A.CallTo(() => _tokenService.CreateToken(user))
                .Returns("token123");

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            var newUserDto = okResult.Value as NewUserDto;
            newUserDto.Should().NotBeNull();
            newUserDto.Id.Should().Be("1");
            newUserDto.Username.Should().Be("testuser");
            newUserDto.Email.Should().Be("testuser@example.com");
            newUserDto.Token.Should().Be("token123");
            newUserDto.Role.Should().Be("User");
        }

        [Fact]
        public async Task AccountController_Login_InvalidUsername_ReturnsUnauthorized()
        {
            // Arrange
            // Arrange
            var loginDto = new LoginDto { Username = "invaliduser", Password = "password123" };

            var fakeUserSet = A.Fake<IQueryable<User>>();
            var userEnumerable = new List<User>().AsQueryable();

            A.CallTo(() => fakeUserSet.Provider).Returns(userEnumerable.Provider);
            A.CallTo(() => fakeUserSet.Expression).Returns(userEnumerable.Expression);
            A.CallTo(() => fakeUserSet.ElementType).Returns(userEnumerable.ElementType);
            A.CallTo(() => fakeUserSet.GetEnumerator()).Returns(userEnumerable.GetEnumerator());

            A.CallTo(() => _userManager.Users).Returns(fakeUserSet);




            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            result.Should().BeOfType<UnauthorizedObjectResult>();
            var unauthorizedResult = result as UnauthorizedObjectResult;
            unauthorizedResult.Value.Should().Be("Invalid username!");
        }

        [Fact]
        public async Task AccountController_Register_ValidData_ReturnsOkResult()
        {
            // Arrange
            var registerDto = new RegisterDto
            {
                Username = "newuser",
                Email = "newuser@example.com",
                Password = "password123"
            };
            var user = new User { Id = "1", UserName = "newuser", Email = "newuser@example.com" };
            var roleResult = IdentityResult.Success;
            var userProfile = new UserProfile { UserId = user.Id, ProfilePictureUrl = "", ContactInformation = "", PhoneNumber = "", TeamId = 1 };

            A.CallTo(() => _userManager.CreateAsync(A<User>._, registerDto.Password))
                .Returns(IdentityResult.Success);
            A.CallTo(() => _userManager.AddToRoleAsync(user, "User"))
                .Returns(roleResult);
            A.CallTo(() => _userProfileRepository.AddUserProfileAsync(A<UserProfile>._))
                .Returns(Task.FromResult(userProfile));
            A.CallTo(() => _userManager.GetRolesAsync(user))
                .Returns(new List<string> { "User" });
            A.CallTo(() => _tokenService.CreateToken(user))
                .Returns("token123");

            // Act
            var result = await _controller.Register(registerDto);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            var newUserDto = okResult.Value as NewUserDto;
            newUserDto.Should().NotBeNull();
            newUserDto.Id.Should().Be("1");
            newUserDto.Username.Should().Be("newuser");
            newUserDto.Email.Should().Be("newuser@example.com");
            newUserDto.Token.Should().Be("token123");
            newUserDto.Role.Should().Be("User");
        }

        [Fact]
        public async Task AccountController_Register_InvalidData_ReturnsBadRequest()
        {
            // Arrange
            var registerDto = new RegisterDto
            {
                Username = "",
                Email = "newuser@example.com",
                Password = "password123"
            };

            _controller.ModelState.AddModelError("Username", "Username is required");

            // Act
            var result = await _controller.Register(registerDto);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task AccountController_RegisterAdmin_ValidData_ReturnsOkResult()
        {
            // Arrange
            var registerDto = new RegisterDto
            {
                Username = "adminuser",
                Email = "adminuser@example.com",
                Password = "password123"
            };
            var user = new User { Id = "1", UserName = "adminuser", Email = "adminuser@example.com" };
            var roleResult = IdentityResult.Success;
            var userProfile = new UserProfile { UserId = user.Id, ProfilePictureUrl = "", ContactInformation = "", PhoneNumber = "", TeamId = 1 };

            A.CallTo(() => _userManager.CreateAsync(A<User>._, registerDto.Password))
                .Returns(IdentityResult.Success);
            A.CallTo(() => _userManager.AddToRoleAsync(user, "Admin"))
                .Returns(roleResult);
            A.CallTo(() => _userProfileRepository.AddUserProfileAsync(A<UserProfile>._))
                 .Returns(Task.FromResult(userProfile));
            A.CallTo(() => _userManager.GetRolesAsync(user))
                .Returns(new List<string> { "Admin" });
            A.CallTo(() => _tokenService.CreateToken(user))
                .Returns("token123");

            // Act
            var result = await _controller.RegisterAdmin(registerDto);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            var newUserDto = okResult.Value as NewUserDto;
            newUserDto.Should().NotBeNull();
            newUserDto.Id.Should().Be("1");
            newUserDto.Username.Should().Be("adminuser");
            newUserDto.Email.Should().Be("adminuser@example.com");
            newUserDto.Token.Should().Be("token123");
            newUserDto.Role.Should().Be("Admin");
        }

        [Fact]
        public async Task AccountController_RegisterAdmin_InvalidData_ReturnsBadRequest()
        {
            // Arrange
            var registerDto = new RegisterDto
            {
                Username = "",
                Email = "adminuser@example.com",
                Password = "password123"
            };

            _controller.ModelState.AddModelError("Username", "Username is required");

            // Act
            var result = await _controller.RegisterAdmin(registerDto);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
        }
    }
}
