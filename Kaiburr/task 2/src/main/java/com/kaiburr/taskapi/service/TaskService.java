package com.kaiburr.taskapi.service;

import com.kaiburr.taskapi.model.Task;
import com.kaiburr.taskapi.model.TaskExecution;
import com.kaiburr.taskapi.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private KubernetesService kubernetesService;

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

        // Execute the command in Kubernetes pod and capture output
        TaskExecution execution = executeCommand(taskId, command);

        // Add execution to task
        task.addTaskExecution(execution);

        // Save and return updated task
        return taskRepository.save(task);
    }

    private TaskExecution executeCommand(String taskId, String command) {
        LocalDateTime startTime = LocalDateTime.now();

        // Execute command in Kubernetes pod using busybox
        String output = kubernetesService.executeCommandInPod(taskId, command);

        LocalDateTime endTime = LocalDateTime.now();

        return new TaskExecution(startTime, endTime, output);
    }

    public boolean existsById(String id) {
        return taskRepository.existsById(id);
    }
}
