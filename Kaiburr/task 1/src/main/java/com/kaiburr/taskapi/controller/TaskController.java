package com.kaiburr.taskapi.controller;

import com.kaiburr.taskapi.model.Task;
import com.kaiburr.taskapi.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task Management", description = "APIs for managing tasks and executions")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    @Operation(summary = "Get all tasks or a specific task by ID", description = "Returns all tasks if no ID parameter is provided, or a specific task if ID is provided")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved task(s)"),
            @ApiResponse(responseCode = "404", description = "Task not found")
    })
    public ResponseEntity<?> getTasks(
            @Parameter(description = "Task ID to retrieve specific task", required = false) @RequestParam(required = false) String id) {

        if (id != null && !id.isEmpty()) {
            Optional<Task> task = taskService.getTaskById(id);
            if (task.isPresent()) {
                return ResponseEntity.ok(task.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            List<Task> tasks = taskService.getAllTasks();
            return ResponseEntity.ok(tasks);
        }
    }

    @PutMapping
    @Operation(summary = "Create or update a task", description = "Creates a new task or updates an existing one")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task updated successfully"),
            @ApiResponse(responseCode = "201", description = "Task created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid task data")
    })
    public ResponseEntity<Task> createOrUpdateTask(@Valid @RequestBody Task task) {
        boolean exists = task.getId() != null && taskService.existsById(task.getId());
        Task savedTask = taskService.saveTask(task);

        if (exists) {
            return ResponseEntity.ok(savedTask);
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a task", description = "Deletes a task by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Task deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Task not found")
    })
    public ResponseEntity<Void> deleteTask(
            @Parameter(description = "ID of task to delete", required = true) @PathVariable String id) {

        if (taskService.existsById(id)) {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    @Operation(summary = "Search tasks by name", description = "Returns tasks whose name contains the specified string (case insensitive)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully"),
            @ApiResponse(responseCode = "404", description = "No tasks found")
    })
    public ResponseEntity<List<Task>> findTasksByName(
            @Parameter(description = "String to search for in task names", required = true) @RequestParam String name) {

        List<Task> tasks = taskService.findTasksByName(name);
        if (tasks.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}/execute")
    @Operation(summary = "Execute a task command", description = "Executes the command associated with the task and stores the execution result")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task executed successfully"),
            @ApiResponse(responseCode = "404", description = "Task not found"),
            @ApiResponse(responseCode = "500", description = "Command execution failed")
    })
    public ResponseEntity<?> executeTask(
            @Parameter(description = "ID of task to execute", required = true) @PathVariable String id) {

        try {
            Task updatedTask = taskService.executeTaskCommand(id);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Task not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error executing task: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error executing command: " + e.getMessage());
        }
    }
}
