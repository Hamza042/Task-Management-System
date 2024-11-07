using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TaskManagement.Api.Data;
using TaskManagement.Api.Interfaces;
using TaskManagement.Api.Models;
using TaskManagement.Api.Repositories;
using TaskManagement.Api.Services;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();



// Configure CORS services
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Allow only this origin
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure database services
builder.Services.AddDbContext<ApplicationDBContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddIdentity<User, IdentityRole>(options=>{
    options.Password.RequireDigit=true;
}).AddEntityFrameworkStores<ApplicationDBContext>();

builder.Services.AddAuthentication(options=>{
 options.DefaultAuthenticateScheme=
 options.DefaultChallengeScheme=
 options.DefaultForbidScheme=
 options.DefaultScheme=
 options.DefaultSignInScheme=
 options.DefaultSignOutScheme= JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options=>{
    options.TokenValidationParameters=new TokenValidationParameters{
        ValidateIssuer=true,
        ValidIssuer=builder.Configuration["JWT: Issuer"],
        ValidateAudience=true,
        ValidAudience=builder.Configuration["JWT: Audience"],
        ValidateIssuerSigningKey=true,
        IssuerSigningKey=new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        )
    };
});

builder.Services.AddScoped<ITokenService,TokenService>();
builder.Services.AddScoped<ITasksRepository, TaskRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();
var app = builder.Build();


app.UseAuthentication();
app.UseAuthorization();
// Configure middleware
app.UseRouting();
app.UseCors(); // Use the default CORS policy
app.MapControllers();

app.Run();
