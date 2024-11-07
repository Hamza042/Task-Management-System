using System.ComponentModel.DataAnnotations;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Dtos.TaskDtos;

public class TaskSummaryDto
{

 
  [Required] public string? Name {get; set;}
  [Required] public string? Priority{get;set;}
  [Required] public string? Category{get;set;}
  [Required] public DateTime Duedate{get;set;} 
}
