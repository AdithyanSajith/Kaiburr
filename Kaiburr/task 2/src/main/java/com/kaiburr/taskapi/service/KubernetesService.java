package com.kaiburr.taskapi.service;

import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.*;
import io.kubernetes.client.util.Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class KubernetesService {

    private static final Logger logger = LoggerFactory.getLogger(KubernetesService.class);

    @Value("${kubernetes.namespace:default}")
    private String namespace;

    private final CoreV1Api coreV1Api;

    public KubernetesService() {
        try {
            // Initialize Kubernetes client
            ApiClient client = Config.defaultClient();
            Configuration.setDefaultApiClient(client);
            this.coreV1Api = new CoreV1Api();
            logger.info("Kubernetes client initialized successfully");
        } catch (IOException e) {
            logger.error("Failed to initialize Kubernetes client", e);
            throw new RuntimeException("Failed to initialize Kubernetes client", e);
        }
    }

    /**
     * Execute command in a Kubernetes pod using busybox image
     */
    public String executeCommandInPod(String taskId, String command) {
        String podName = "task-execution-" + taskId + "-" + System.currentTimeMillis();

        try {
            // Create pod
            V1Pod pod = createTaskPod(podName, command);
            V1Pod createdPod = coreV1Api.createNamespacedPod(namespace, pod, null, null, null, null);
            logger.info("Created pod: {}", createdPod.getMetadata().getName());

            // Wait for pod to complete
            String output = waitForPodCompletion(podName);

            // Clean up pod
            deletePod(podName);

            return output;

        } catch (ApiException e) {
            logger.error("Kubernetes API error while executing command in pod", e);
            return "Error executing command in Kubernetes pod: " + e.getMessage();
        } catch (Exception e) {
            logger.error("Unexpected error while executing command in pod", e);
            return "Unexpected error: " + e.getMessage();
        }
    }

    private V1Pod createTaskPod(String podName, String command) {
        return new V1Pod()
                .metadata(new V1ObjectMeta()
                        .name(podName)
                        .labels(Map.of(
                                "app", "task-execution",
                                "created-by", "kaiburr-task-api")))
                .spec(new V1PodSpec()
                        .restartPolicy("Never")
                        .containers(Collections.singletonList(
                                new V1Container()
                                        .name("task-container")
                                        .image("busybox:latest")
                                        .command(Collections.singletonList("/bin/sh"))
                                        .args(Collections.singletonList("-c"))
                                        .args(Collections.singletonList(command))
                                        .resources(new V1ResourceRequirements()
                                                .limits(Map.of(
                                                        "cpu", new io.kubernetes.client.custom.Quantity("100m"),
                                                        "memory", new io.kubernetes.client.custom.Quantity("128Mi")))
                                                .requests(Map.of(
                                                        "cpu", new io.kubernetes.client.custom.Quantity("50m"),
                                                        "memory",
                                                        new io.kubernetes.client.custom.Quantity("64Mi")))))));
    }

    private String waitForPodCompletion(String podName) throws ApiException, InterruptedException {
        int maxWaitTime = 60; // seconds
        int waitInterval = 2; // seconds
        int elapsedTime = 0;

        while (elapsedTime < maxWaitTime) {
            V1Pod pod = coreV1Api.readNamespacedPod(podName, namespace, null);
            V1PodStatus status = pod.getStatus();

            if (status != null && status.getPhase() != null) {
                String phase = status.getPhase();
                logger.info("Pod {} phase: {}", podName, phase);

                if ("Succeeded".equals(phase)) {
                    // Get pod logs
                    return getPodLogs(podName);
                } else if ("Failed".equals(phase)) {
                    String logs = getPodLogs(podName);
                    return "Pod execution failed. Logs: " + logs;
                }
            }

            Thread.sleep(waitInterval * 1000);
            elapsedTime += waitInterval;
        }

        return "Pod execution timed out after " + maxWaitTime + " seconds";
    }

    private String getPodLogs(String podName) {
        try {
            String logs = coreV1Api.readNamespacedPodLog(
                    podName,
                    namespace,
                    null, // container name (null for single container pod)
                    false, // follow
                    null, // limitBytes
                    null, // pretty
                    false, // previous
                    null, // sinceSeconds
                    null, // tailLines
                    false // timestamps
            );
            return logs != null ? logs.trim() : "No output";
        } catch (ApiException e) {
            logger.error("Failed to get pod logs for {}", podName, e);
            return "Failed to retrieve pod logs: " + e.getMessage();
        }
    }

    private void deletePod(String podName) {
        try {
            coreV1Api.deleteNamespacedPod(
                    podName,
                    namespace,
                    null, // pretty
                    null, // dryRun
                    null, // gracePeriodSeconds
                    null, // orphanDependents
                    null, // propagationPolicy
                    null // body
            );
            logger.info("Deleted pod: {}", podName);
        } catch (ApiException e) {
            logger.warn("Failed to delete pod {}: {}", podName, e.getMessage());
        }
    }

    /**
     * List all task execution pods
     */
    public String listTaskPods() {
        try {
            V1PodList podList = coreV1Api.listNamespacedPod(
                    namespace,
                    null, // pretty
                    null, // allowWatchBookmarks
                    null, // continue
                    null, // fieldSelector
                    "app=task-execution", // labelSelector
                    null, // limit
                    null, // resourceVersion
                    null, // resourceVersionMatch
                    null, // timeoutSeconds
                    false // watch
            );

            StringBuilder result = new StringBuilder("Task Execution Pods:\n");
            for (V1Pod pod : podList.getItems()) {
                String name = pod.getMetadata().getName();
                String phase = pod.getStatus() != null ? pod.getStatus().getPhase() : "Unknown";
                OffsetDateTime creationTime = pod.getMetadata().getCreationTimestamp();
                result.append(String.format("- %s (Phase: %s, Created: %s)\n", name, phase, creationTime));
            }

            return result.toString();
        } catch (ApiException e) {
            logger.error("Failed to list task pods", e);
            return "Error listing task pods: " + e.getMessage();
        }
    }
}
