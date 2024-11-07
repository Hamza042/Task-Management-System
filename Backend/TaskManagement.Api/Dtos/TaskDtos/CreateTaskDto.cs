using System.ComponentModel.DataAnnotations;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Dtos.TaskDtos;

public class CreateTaskDto
{

 [Required] public string? Name {get; set;}
  [Required] public string? Description{get;set;}
  [Required] public string? Priority{get;set;}
  [Required] public string? Category{get;set;}
  [Required] public DateTime Duedate{get;set;} 
  [Required] public string Username{get;set;}
}
