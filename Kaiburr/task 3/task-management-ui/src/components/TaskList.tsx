import React, { useState, useEffect } from 'react';
import {
  Table, 
  Button,
  Space,
  Input,
  Modal,
  Popconfirm,
  Tag,
  Typography,
  Card,
  Row,
  Col,
  Alert,
  Badge,
  Tooltip,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Task, TaskExecution, TaskService } from '../services/TaskService';
import TaskForm from './TaskForm';
import TaskExecutionModal from './TaskExecutionModal';

const { Title } = Typography;
const { Search } = Input;

interface TaskListProps {
  onTaskExecuted?: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onTaskExecuted }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isExecutionModalVisible, setIsExecutionModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskForExecution, setSelectedTaskForExecution] = useState<Task | null>(null);
  const [executing, setExecuting] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await TaskService.getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      fetchTasks();
      return;
    }

    setLoading(true);
    try {
      const searchResults = await TaskService.searchTasks(value);
      setTasks(searchResults);
      setSearchTerm(value);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Search failed');
      // If search fails, show all tasks
      fetchTasks();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsFormModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormModalVisible(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await TaskService.deleteTask(taskId);
      message.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to delete task');
    }
  };

  const handleExecuteTask = async (task: Task) => {
    if (!task.id || !task.command) {
      message.warning('Task must have an ID and command to execute');
      return;
    }

    setExecuting(task.id);
    try {
      const updatedTask = await TaskService.executeTask(task.id);
      setSelectedTaskForExecution(updatedTask);
      setIsExecutionModalVisible(true);
      onTaskExecuted?.(updatedTask);
      fetchTasks(); // Refresh the task list to show updated execution history
      message.success('Task executed successfully');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Task execution failed');
    } finally {
      setExecuting(null);
    }
  };

  const handleFormSubmit = async (taskData: Task) => {
    try {
      await TaskService.createOrUpdateTask(taskData);
      message.success(selectedTask ? 'Task updated successfully' : 'Task created successfully');
      setIsFormModalVisible(false);
      fetchTasks();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to save task');
    }
  };

  const columns: ColumnsType<Task> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Task, b: Task) => a.name.localeCompare(b.name),
      render: (text: string, record: Task) => (
        <Space>
          <strong>{text}</strong>
          {record.command && (
            <Tooltip title="Has executable command">
              <Badge dot color="blue" />
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      sorter: (a: Task, b: Task) => a.owner.localeCompare(b.owner),
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
      ellipsis: {
        showTitle: false,
      },
      render: (command: string) => (
        <Tooltip placement="topLeft" title={command}>
          <code style={{ 
            background: '#f5f5f5', 
            padding: '2px 6px', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {command || 'No command'}
          </code>
        </Tooltip>
      ),
    },
    {
      title: 'Executions',
      key: 'executions',
      render: (_, record: Task) => {
        const executionCount = record.taskExecutions?.length || 0;
        const lastExecution = record.taskExecutions?.[executionCount - 1];
        
        return (
          <Space direction="vertical" size="small">
            <Tag color={executionCount > 0 ? 'blue' : 'default'}>
              {executionCount} execution{executionCount !== 1 ? 's' : ''}
            </Tag>
            {lastExecution && (
              <Typography.Text type="secondary" style={{ fontSize: '11px' }}>
                Last: {new Date(lastExecution.startTime).toLocaleString()}
              </Typography.Text>
            )}
          </Space>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Task) => (
        <Space size="middle">
          <Tooltip title="Edit task">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditTask(record)}
              size="small"
            />
          </Tooltip>
          
          <Tooltip title="Execute command">
            <Button
              type="text"
              icon={<PlayCircleOutlined />}
              onClick={() => handleExecuteTask(record)}
              disabled={!record.command || executing === record.id}
              loading={executing === record.id}
              size="small"
              style={{ color: '#52c41a' }}
            />
          </Tooltip>
          
          <Tooltip title="View execution history">
            <Button
              type="text"
              icon={<ExclamationCircleOutlined />}
              onClick={() => {
                setSelectedTaskForExecution(record);
                setIsExecutionModalVisible(true);
              }}
              disabled={!record.taskExecutions?.length}
              size="small"
              style={{ color: '#1890ff' }}
            />
          </Tooltip>
          
          <Popconfirm
            title="Delete Task"
            description="Are you sure you want to delete this task?"
            onConfirm={() => handleDeleteTask(record.id!)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete task">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                size="small"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col span={12}>
            <Title level={2} style={{ margin: 0 }}>
              Task Management
            </Title>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Space>
              <Button
                type="default"
                icon={<ReloadOutlined />}
                onClick={fetchTasks}
                loading={loading}
              >
                Refresh
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreateTask}
              >
                New Task
              </Button>
            </Space>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col span={24}>
            <Search
              placeholder="Search tasks by name..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => {
                if (e.target.value === '') {
                  setSearchTerm('');
                  fetchTasks();
                }
              }}
              style={{ width: '100%', maxWidth: '400px' }}
            />
          </Col>
        </Row>

        {searchTerm && (
          <Alert
            message={`Search results for "${searchTerm}"`}
            type="info"
            showIcon
            closable
            onClose={() => {
              setSearchTerm('');
              fetchTasks();
            }}
            style={{ marginTop: '16px' }}
          />
        )}

        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          loading={loading}
          pagination={{
            total: tasks.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} tasks`,
          }}
          style={{ marginTop: '16px' }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Task Form Modal */}
      <TaskForm
        visible={isFormModalVisible}
        task={selectedTask}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsFormModalVisible(false)}
      />

      {/* Task Execution Modal */}
      <TaskExecutionModal
        visible={isExecutionModalVisible}
        task={selectedTaskForExecution}
        onClose={() => setIsExecutionModalVisible(false)}
      />
    </div>
  );
};

export default TaskList;
