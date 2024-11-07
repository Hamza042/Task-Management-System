using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace TaskManagement.Api.Data;

public class ApplicationDBContext : IdentityDbContext<User>
{
    public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {

    }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Team> Teams { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
        builder.Entity<IdentityRole>().HasData(roles);

        builder.Entity<Team>().HasData(
                new Team { Id = 1, Name = "Requirements Gathering" },
                new Team { Id = 2, Name = "Design" },
                new Team { Id = 3, Name = "Development" },
                new Team { Id = 4, Name = "Testing" },
                new Team { Id = 5, Name = "Deployment" },
                new Team { Id = 6, Name = "Maintenance" },
                new Team { Id = 7, Name = "Project Management" },
                new Team { Id = 8, Name = "Documentation" },
                new Team { Id = 9, Name = "Quality Assurance" },
                new Team { Id = 10, Name = "Training" },
                new Team { Id = 11, Name = "Research and Development" },
                new Team { Id = 12, Name = "Client Support" },
                new Team { Id = 13, Name = "Sales and Marketing" },
                new Team { Id = 14, Name = "Human Resources" },
                new Team { Id = 15, Name = "Finance and Administration" }
            );

            builder.Entity<Category>().HasData(
                // Requirements Gathering Categories
                new Category { Id = 1, Name = "Stakeholder Interviews", TeamId = 1 },
                new Category { Id = 2, Name = "Requirements Documentation", TeamId = 1 },
                new Category { Id = 3, Name = "Use Case Analysis", TeamId = 1 },
                new Category { Id = 4, Name = "Requirements Review", TeamId = 1 },
                
                // Design Categories
                new Category { Id = 5, Name = "System Architecture Design", TeamId = 2 },
                new Category { Id = 6, Name = "UI/UX Design", TeamId = 2 },
                new Category { Id = 7, Name = "Database Design", TeamId = 2 },
                new Category { Id = 8, Name = "Technical Specification", TeamId = 2 },
                
                // Development Categories
                new Category { Id = 9, Name = "Frontend Development", TeamId = 3 },
                new Category { Id = 10, Name = "Backend Development", TeamId = 3 },
                new Category { Id = 11, Name = "API Development", TeamId = 3 },
                new Category { Id = 12, Name = "Mobile App Development", TeamId = 3 },
                new Category { Id = 13, Name = "Integration Development", TeamId = 3 },
                
                // Testing Categories
                new Category { Id = 14, Name = "Unit Testing", TeamId = 4 },
                new Category { Id = 15, Name = "Integration Testing", TeamId = 4 },
                new Category { Id = 16, Name = "System Testing", TeamId = 4 },
                new Category { Id = 17, Name = "User Acceptance Testing (UAT)", TeamId = 4 },
                new Category { Id = 18, Name = "Performance Testing", TeamId = 4 },
                new Category { Id = 19, Name = "Security Testing", TeamId = 4 },
                
                // Deployment Categories
                new Category { Id = 20, Name = "Deployment Planning", TeamId = 5 },
                new Category { Id = 21, Name = "Server Setup", TeamId = 5 },
                new Category { Id = 22, Name = "Continuous Integration/Continuous Deployment (CI/CD)", TeamId = 5 },
                new Category { Id = 23, Name = "Environment Configuration", TeamId = 5 },
                
                // Maintenance Categories
                new Category { Id = 24, Name = "Bug Fixes", TeamId = 6 },
                new Category { Id = 25, Name = "Performance Optimization", TeamId = 6 },
                new Category { Id = 26, Name = "Security Patches", TeamId = 6 },
                new Category { Id = 27, Name = "System Monitoring", TeamId = 6 },
                
                // Project Management Categories
                new Category { Id = 28, Name = "Project Planning", TeamId = 7 },
                new Category { Id = 29, Name = "Resource Allocation", TeamId = 7 },
                new Category { Id = 30, Name = "Progress Tracking", TeamId = 7 },
                new Category { Id = 31, Name = "Risk Management", TeamId = 7 },
                new Category { Id = 32, Name = "Client Communication", TeamId = 7 },
                
                // Documentation Categories
                new Category { Id = 33, Name = "Technical Documentation", TeamId = 8 },
                new Category { Id = 34, Name = "User Manuals", TeamId = 8 },
                new Category { Id = 35, Name = "API Documentation", TeamId = 8 },
                new Category { Id = 36, Name = "Change Logs", TeamId = 8 },
                
                // Quality Assurance Categories
                new Category { Id = 37, Name = "Code Review", TeamId = 9 },
                new Category { Id = 38, Name = "Test Case Development", TeamId = 9 },
                new Category { Id = 39, Name = "Test Automation", TeamId = 9 },
                new Category { Id = 40, Name = "QA Reporting", TeamId = 9 },
                
                // Training Categories
                new Category { Id = 41, Name = "Developer Training", TeamId = 10 },
                new Category { Id = 42, Name = "User Training", TeamId = 10 },
                new Category { Id = 43, Name = "Onboarding Documentation", TeamId = 10 },
                
                // Research and Development Categories
                new Category { Id = 44, Name = "Feasibility Studies", TeamId = 11 },
                new Category { Id = 45, Name = "Proof of Concept (PoC)", TeamId = 11 },
                new Category { Id = 46, Name = "Technology Evaluation", TeamId = 11 },
                new Category { Id = 47, Name = "Prototyping", TeamId = 11 },
                
                // Client Support Categories
                new Category { Id = 48, Name = "Customer Support", TeamId = 12 },
                new Category { Id = 49, Name = "Help Desk", TeamId = 12 },
                new Category { Id = 50, Name = "Technical Support", TeamId = 12 },
                
                // Sales and Marketing Categories
                new Category { Id = 51, Name = "Market Research", TeamId = 13 },
                new Category { Id = 52, Name = "Sales Strategy", TeamId = 13 },
                new Category { Id = 53, Name = "Product Demos", TeamId = 13 },
                new Category { Id = 54, Name = "Marketing Campaigns", TeamId = 13 },
                
                // Human Resources Categories
                new Category { Id = 55, Name = "Recruitment", TeamId = 14 },
                new Category { Id = 56, Name = "Employee Onboarding", TeamId = 14 },
                new Category { Id = 57, Name = "Performance Reviews", TeamId = 14 },
                new Category { Id = 58, Name = "Employee Training", TeamId = 14 },
                
                // Finance and Administration Categories
                new Category { Id = 59, Name = "Budgeting", TeamId = 15 },
                new Category { Id = 60, Name = "Financial Reporting", TeamId = 15 },
                new Category { Id = 61, Name = "Invoice Management", TeamId = 15 },
                new Category { Id = 62, Name = "Administrative Support", TeamId = 15 }
            );
    }

    public DbSet<TaskModel> Task { get; set; }


}
