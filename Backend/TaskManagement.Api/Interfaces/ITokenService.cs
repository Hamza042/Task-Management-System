using TaskManagement.Api.Models;

namespace TaskManagement.Api.Interfaces;

public interface ITokenService
{
    string CreateToken(User user);
}
