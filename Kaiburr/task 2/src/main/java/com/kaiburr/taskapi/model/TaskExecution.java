package com.kaiburr.taskapi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class TaskExecution {

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS'Z'")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS'Z'")
    private LocalDateTime endTime;

    private String output;

    // Default constructor
    public TaskExecution() {
    }

    // Constructor
    public TaskExecution(LocalDateTime startTime, LocalDateTime endTime, String output) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.output = output;
    }

    // Getters and Setters
    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    @Override
    public String toString() {
        return "TaskExecution{" +
                "startTime=" + startTime +
                ", endTime=" + endTime +
                ", output='" + output + '\'' +
                '}';
    }
}
