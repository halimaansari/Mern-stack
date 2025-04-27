import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks(response.data); // Set tasks after fetching from the backend
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex space-x-4">
      <div className="w-1/3">
        <h3 className="text-lg">To Do</h3>
        {tasks
          .filter((task) => task.status === 'To Do')
          .map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
      <div className="w-1/3">
        <h3 className="text-lg">In Progress</h3>
        {tasks
          .filter((task) => task.status === 'In Progress')
          .map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
      <div className="w-1/3">
        <h3 className="text-lg">Done</h3>
        {tasks
          .filter((task) => task.status === 'Done')
          .map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default TaskBoard;
