package com.kaiburr.taskapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "tasks")
public class Task {

    @Id
    private String id;

    @NotBlank(message = "Task name is required")
    private String name;

    @NotBlank(message = "Task owner is required")
    private String owner;

    @NotBlank(message = "Command is required")
    @Pattern(regexp = "^(?!.*[;&|`$(){}\\[\\]<>\"'\\\\]).*$", message = "Command contains unsafe characters. Allowed characters: letters, numbers, spaces, and basic shell commands without special characters like ;, &, |, `, $, (), {}, [], <>, quotes, or backslashes")
    private String command;

    private List<TaskExecution> taskExecutions;

    // Default constructor
    public Task() {
        this.taskExecutions = new ArrayList<>();
    }

    // Constructor
    public Task(String id, String name, String owner, String command) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.command = command;
        this.taskExecutions = new ArrayList<>();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public List<TaskExecution> getTaskExecutions() {
        return taskExecutions;
    }

    public void setTaskExecutions(List<TaskExecution> taskExecutions) {
        this.taskExecutions = taskExecutions;
    }

    public void addTaskExecution(TaskExecution execution) {
        if (this.taskExecutions == null) {
            this.taskExecutions = new ArrayList<>();
        }
        this.taskExecutions.add(execution);
    }

    @Override
    public String toString() {
        return "Task{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", owner='" + owner + '\'' +
                ", command='" + command + '\'' +
                ", taskExecutions=" + taskExecutions +
                '}';
    }
}
