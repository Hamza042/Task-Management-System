using TaskManagement.Api.Dtos.TaskDtos;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Interfaces
{
    public interface ITasksRepository
{
    Task<List<TaskModel>> GetAllAsync();
    Task<TaskModel?> GetByIdAsync(int id);
    Task<List<TaskModel>> GetTasksByUserAsync(string username);

    Task<TaskModel> CreateAsync(CreateTaskDto taskDto);
    Task<TaskModel> UpdateAsync(int id, UpdateTaskDto taskModel);
    Task<TaskModel?> DeleteAsync(int id);
}
}


