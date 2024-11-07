using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Data;
using TaskManagement.Api.Dtos.TaskDtos;
using TaskManagement.Api.Interfaces;
using TaskManagement.Api.Mappings;
using TaskManagement.Api.Models;


namespace TaskManagement.Api.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskControllers : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        private readonly UserManager<User> _userManager;
        private readonly ITasksRepository _tasksRepo;
        public TaskControllers(UserManager<User> userManager, ApplicationDBContext context, ITasksRepository tasksRepo)
        {
            _context = context;
            _userManager = userManager;
            _tasksRepo=tasksRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _tasksRepo.GetAllAsync();
            var taskDtos = tasks.Select(task => task.ToTaskDetailsDto());
            return Ok(taskDtos);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var task = await _tasksRepo.GetByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task.ToTaskDetailsDtoWithUsername());
        }
        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetAllByUserId([FromRoute] string username)
        {
            var tasks = await _tasksRepo.GetTasksByUserAsync(username);
              
            if (tasks == null)
            {
                return NotFound();
            }
           

            var taskDtos = tasks.Select(task => task.ToTaskDetailsDto());
            return Ok(taskDtos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto taskDto)
        {
            var newTask = await _tasksRepo.CreateAsync(taskDto);
            if(newTask==null){
                return StatusCode(500, "user does not exist");
            }
            return CreatedAtAction(nameof(GetById), new { id = newTask.Id }, newTask.ToTaskDetailsDto());

        }
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateTask([FromRoute] int id, [FromBody] UpdateTaskDto updatedTaskDto)
        {
            var updatedTask = await _tasksRepo.UpdateAsync(id,updatedTaskDto);
            return Ok(updatedTask.ToTaskSummaryDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask([FromRoute] int id)
        {
            var existingTask = await _tasksRepo.DeleteAsync(id);
            if (existingTask == null)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}

