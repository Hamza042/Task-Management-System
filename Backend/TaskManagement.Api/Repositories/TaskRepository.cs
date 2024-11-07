using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using TaskManagement.Api.Data;
using TaskManagement.Api.Dtos.TaskDtos;
using TaskManagement.Api.Interfaces;
using TaskManagement.Api.Mappings;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Repositories;

public class TaskRepository : ITasksRepository
{
    private readonly ApplicationDBContext _context;
    private readonly UserManager<User> _userManager;
    public TaskRepository(ApplicationDBContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<TaskModel> CreateAsync(CreateTaskDto taskDto)
    {
         var newTask = taskDto.ToEntity();
        newTask.User = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == taskDto.Username);
        if (newTask.User ==null){
            return null;
        }
        newTask.Status = "pending";
        await _context.Task.AddAsync(newTask);
        await _context.SaveChangesAsync();
        return newTask;
    }

    public async Task<TaskModel?> DeleteAsync(int id)
    {
        var existingTask = await _context.Task.FirstOrDefaultAsync(user => Convert.ToInt32(user.Id) == id);
        if (existingTask == null)
        {
            return null;
        }
        _context.Remove(existingTask);
        await _context.SaveChangesAsync();
        return existingTask;
    }

    public Task<List<TaskModel>> GetAllAsync()
    {
        return _context.Task.ToListAsync();
    }

    public async Task<TaskModel?> GetByIdAsync(int id)
    {
         return await _context.Task
        .Include(t => t.User) // Include the User property
        .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<List<TaskModel>> GetTasksByUserAsync(string username)
    {
        var currentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
        if (currentUser == null)
        {
            return null;
        }
        return await _context.Task
            .Where(task => task.User.Id == currentUser.Id)
            .ToListAsync();

    }

    public async Task<TaskModel> UpdateAsync(int id, UpdateTaskDto updatedTaskDto)
    {
        var existingTask = await _context.Task.FirstOrDefaultAsync(task => Convert.ToInt32(task.Id) == id);
        if (existingTask == null)
        {
            return null;
        }
        existingTask.Name = updatedTaskDto.Name;
        existingTask.Description = updatedTaskDto.Description;
        existingTask.Duedate = updatedTaskDto.Duedate;
        existingTask.Category = updatedTaskDto.Category;
        existingTask.Priority = updatedTaskDto.Priority;
        existingTask.Status = updatedTaskDto.Status;


        await _context.SaveChangesAsync();
        return existingTask;
    }
}
