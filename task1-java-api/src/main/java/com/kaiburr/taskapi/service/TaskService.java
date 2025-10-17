package com.kaiburr.taskapi.service;

import com.kaiburr.taskapi.model.Task;
import com.kaiburr.taskapi.model.TaskExecution;
import com.kaiburr.taskapi.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public List<Task> findTasksByName(String name) {
        return taskRepository.findByNameContainingIgnoreCase(name);
    }

    public Task executeTaskCommand(String taskId) throws Exception {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isEmpty()) {
            throw new RuntimeException("Task not found with id: " + taskId);
        }

        Task task = taskOptional.get();
        String command = task.getCommand();

        // Execute the command and capture output
        TaskExecution execution = executeCommand(command);

        // Add execution to task
        task.addTaskExecution(execution);

        // Save and return updated task
        return taskRepository.save(task);
    }

    private TaskExecution executeCommand(String command) throws IOException, InterruptedException {
        LocalDateTime startTime = LocalDateTime.now();

        ProcessBuilder processBuilder = new ProcessBuilder();

        // Set up command based on OS
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("win")) {
            processBuilder.command("cmd", "/c", command);
        } else {
            processBuilder.command("sh", "-c", command);
        }

        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();

        // Read output
        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }

        // Wait for process to complete with timeout
        boolean finished = process.waitFor(30, TimeUnit.SECONDS);
        if (!finished) {
            process.destroyForcibly();
            output.append("\nCommand timed out after 30 seconds");
        }

        LocalDateTime endTime = LocalDateTime.now();

        return new TaskExecution(startTime, endTime, output.toString().trim());
    }

    public boolean existsById(String id) {
        return taskRepository.existsById(id);
    }
}
