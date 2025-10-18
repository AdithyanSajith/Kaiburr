import React from 'react';
import {
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  Card,
  Typography,
  message,
} from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Task } from '../services/TaskService';

const { Title } = Typography;

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  visible: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, visible }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const taskData: Task = {
        ...values,
        id: task?.id, // Preserve ID for updates
      };

      onSubmit(taskData);
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Please fill in all required fields');
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card>
      <Title level={4} style={{ marginBottom: 24 }}>
        {task ? 'Edit Task Details' : 'Create New Task'}
      </Title>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: task?.name || '',
          owner: task?.owner || '',
          command: task?.command || '',
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Task Name"
              name="name"
              rules={[
                { required: true, message: 'Please enter task name' },
                { min: 3, message: 'Name must be at least 3 characters' },
                { max: 100, message: 'Name must not exceed 100 characters' },
              ]}
            >
              <Input
                placeholder="Enter task name"
                maxLength={100}
                showCount
              />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label="Assignee"
              name="owner"
              rules={[
                { required: true, message: 'Please enter assignee name' },
                { min: 2, message: 'Assignee name must be at least 2 characters' },
              ]}
            >
              <Input
                placeholder="Enter assignee name"
                maxLength={50}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Command"
          name="command"
          rules={[
            { required: true, message: 'Please enter command to execute' },
            { max: 200, message: 'Command must not exceed 200 characters' },
          ]}
          help="Shell command to execute for this task."
        >
          <Input
            placeholder="e.g., ls -la, echo 'Hello World', date"
            maxLength={200}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleReset}
              disabled={false}
            >
              Reset
            </Button>
            
            <Button
              onClick={onCancel}
              icon={<CloseOutlined />}
            >
              Cancel
            </Button>
            
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              size="large"
            >
              {task ? 'Update Task' : 'Create Task'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
