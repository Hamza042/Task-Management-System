using System.ComponentModel.DataAnnotations;


namespace TaskManagement.Api.Models;

public class TaskModel
{
     public int Id{get;set;}
  [Required] public string? Name {get; set;}
  [Required] public string? Description{get;set;}
  [Required] public string? Priority{get;set;}
  [Required] public string? Category{get;set;}
  [Required] public DateTime Duedate{get;set;} 
  [Required] public User User{get;set;}
  public string Status{get;set;}
}
