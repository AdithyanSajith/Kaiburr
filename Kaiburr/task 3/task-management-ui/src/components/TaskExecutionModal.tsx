import React from 'react';
import {
  Modal,
  Typography,
  Card,
  Space,
  Tag,
  Descriptions,
  Button,
  Timeline,
  Empty,
} from 'antd';
import {
  ClockCircleOutlined,
  CodeOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { Task } from '../services/TaskService';

const { Text } = Typography;

interface TaskExecutionModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
}

const TaskExecutionModal: React.FC<TaskExecutionModalProps> = ({
  visible,
  task,
  onClose,
}) => {
  if (!task) return null;

  const handleCopyOutput = (output: string) => {
    navigator.clipboard.writeText(output);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();
    return durationMs < 1000 ? `${durationMs}ms` : `${(durationMs / 1000).toFixed(2)}s`;
  };

  const executions = task.taskExecutions || [];
  const hasExecutions = executions.length > 0;

  return (
    <Modal
      title={
        <Space>
          <CodeOutlined />
          <Text strong>Task Execution History</Text>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={900}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card size="small" title="Task Information">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Name">
              <Text strong>{task.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Owner">
              <Text>{task.owner}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Command">
              <code style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                {task.command || 'No command'}
              </code>
            </Descriptions.Item>
            <Descriptions.Item label="Total Executions">
              <Tag color="blue">{executions.length}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card size="small" title="Execution History" style={{ maxHeight: '500px', overflow: 'auto' }}>
          {!hasExecutions ? (
            <Empty description="No executions yet" />
          ) : (
            <Timeline>
              {executions.map((execution, index) => (
                <Timeline.Item
                  key={index}
                  dot={<ClockCircleOutlined style={{ color: '#1890ff', fontSize: '16px' }} />}
                >
                  <Card size="small" style={{ marginBottom: '16px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>Started:</Text> {formatTimestamp(execution.startTime)}
                      </div>
                      <div>
                        <Text strong>Duration:</Text> {calculateDuration(execution.startTime, execution.endTime)}
                      </div>
                      <div>
                        <Space style={{ marginBottom: '8px' }}>
                          <Text strong>Output:</Text>
                          <Button
                            type="link"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => handleCopyOutput(execution.output)}
                          >
                            Copy
                          </Button>
                        </Space>
                        <Card 
                          size="small" 
                          style={{ background: '#001529', color: '#ffffff', fontFamily: 'monospace' }}
                        >
                          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#ffffff', fontSize: '12px' }}>
                            {execution.output || 'No output'}
                          </pre>
                        </Card>
                      </div>
                    </Space>
                  </Card>
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </Card>
      </Space>
    </Modal>
  );
};

export default TaskExecutionModal;
