using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Api.Dtos.TaskDtos;

public class TaskDetailsDtoWithUsername
{
    public int Id { get; set; }
    [Required] public string? Name { get; set; }
    [Required] public string? Description { get; set; }
    [Required] public string? Priority { get; set; }
    [Required] public string? Category { get; set; }
    [Required] public DateTime Duedate { get; set; }
    public string Status { get; set; }
    public string Username { get; set; }
}
