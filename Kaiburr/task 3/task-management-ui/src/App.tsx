import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Space,
  Button,
  Alert,
  Spin,
  Card,
  Row,
  Col,
  Statistic,
  Badge,
  message,
} from 'antd';
import {
  ApiOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskList from './components/TaskList';
import { TaskService, TaskExecution, Task } from './services/TaskService';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading');
  const [lastExecution, setLastExecution] = useState<TaskExecution | null>(null);

  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    setApiStatus('loading');
    try {
      await TaskService.healthCheck();
      setApiStatus('connected');
      message.success('Connected to Task Management API');
    } catch (error) {
      setApiStatus('disconnected');
      message.error('Cannot connect to API server. Please ensure the backend is running.');
    }
  };

  const handleTaskExecuted = (task: Task) => {
    // Get the latest execution from the task
    if (task.taskExecutions && task.taskExecutions.length > 0) {
      setLastExecution(task.taskExecutions[task.taskExecutions.length - 1]);
    }
  };

  const getApiStatusBadge = () => {
    switch (apiStatus) {
      case 'connected':
        return <Badge status="success" text="API Connected" />;
      case 'disconnected':
        return <Badge status="error" text="API Disconnected" />;
      case 'loading':
        return <Badge status="processing" text="Checking Connection..." />;
      default:
        return <Badge status="default" text="Unknown" />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ 
          background: '#001529', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Space>
            <ApiOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              Task Management System
            </Title>
          </Space>
          
          <Space>
            {getApiStatusBadge()}
            <Button
              icon={<ReloadOutlined />}
              onClick={checkApiConnection}
              loading={apiStatus === 'loading'}
              size="small"
              style={{ color: 'white', borderColor: 'white' }}
            >
              Test Connection
            </Button>
          </Space>
        </Header>

        <Content style={{ padding: '24px' }}>
          {/* API Connection Status */}
          {apiStatus === 'disconnected' && (
            <Alert
              message="API Connection Failed"
              description={
                <div>
                  <p>Cannot connect to the Task Management API server.</p>
                  <p><strong>Please ensure:</strong></p>
                  <ul>
                    <li>The Java backend server is running (Task 1 or Task 2)</li>
                    <li>API URL is correct: <code>http://localhost:8081</code> or <code>http://localhost:30080</code></li>
                    <li>No firewall is blocking the connection</li>
                  </ul>
                </div>
              }
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
              action={
                <Button
                  size="small"
                  danger
                  onClick={checkApiConnection}
                  loading={false}
                >
                  Retry Connection
                </Button>
              }
            />
          )}

          {/* Dashboard Stats */}
          {apiStatus === 'connected' && lastExecution && (
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Last Execution Status"
                    value="SUCCESS"
                    prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    valueStyle={{ 
                      color: '#52c41a',
                      fontSize: '18px'
                    }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Started"
                    value={new Date(lastExecution.startTime).toLocaleTimeString()}
                    prefix={<ClockCircleOutlined />}
                    valueStyle={{ fontSize: '18px' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Duration"
                    value={(() => {
                      const start = new Date(lastExecution.startTime);
                      const end = new Date(lastExecution.endTime);
                      return end.getTime() - start.getTime();
                    })()}
                    suffix="ms"
                    prefix={<ApiOutlined />}
                    valueStyle={{ 
                      color: '#52c41a',
                      fontSize: '18px'
                    }}
                  />
                </Card>
              </Col>
            </Row>
          )}

          {/* Main Task List */}
          {apiStatus === 'loading' ? (
            <Card style={{ textAlign: 'center', padding: '48px' }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>
                <Text>Connecting to Task Management API...</Text>
              </div>
            </Card>
          ) : (
            <TaskList onTaskExecuted={handleTaskExecuted} />
          )}
        </Content>

        <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
          <Space direction="vertical" size="small">
            <Text>
              Task Management System - React 19 + TypeScript + Ant Design
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Kaiburr Task 3: Web UI Forms | Built with ❤️ for modern task management
            </Text>
          </Space>
        </Footer>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
