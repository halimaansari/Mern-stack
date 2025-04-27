import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });

  useEffect(() => {
    // Simulating an API call to fetch the logged-in user data
    const loggedInUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      profilePic: 'https://www.w3schools.com/w3images/avatar2.png', // Placeholder profile picture
    };

    // Simulating an API call to fetch tasks assigned to the user
    const assignedTasks = [
      { id: 1, title: 'Task 1', status: 'To Do' },
      { id: 2, title: 'Task 2', status: 'In Progress' },
      { id: 3, title: 'Task 3', status: 'Done' },
    ];

    setUser(loggedInUser);
    setTasks(assignedTasks);
  }, []);

  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    const newTaskObj = {
      ...newTask,
      id: tasks.length + 1, // Simple ID generator
    };
    setTasks([...tasks, newTaskObj]);
    setShowAddTaskModal(false);
    setNewTask({ title: '', description: '', status: 'To Do' });
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <img src={user?.profilePic} alt="Profile" className="profile-pic" />
          <div className="user-details">
            <h2>{user?.name}</h2>
            <p className="role">{user?.role}</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="tasks-container">
        <h3>Assigned Tasks</h3>

        {/* Add Task Button */}
        <div className="task-actions">
          <button className="task-action-btn" onClick={() => setShowAddTaskModal(true)}>
            Add Task
          </button>
        </div>

        {/* Task Columns by Status */}
        <div className="task-columns">
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <div key={status} className="task-column">
              <h4>{status}</h4>
              <ul>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <li key={task.id} className="task-card">
                      <h5>{task.title}</h5>
                      <p>Status: {task.status}</p>
                      {status === 'To Do' && (
                        <button
                          className="move-task-btn"
                          onClick={() => handleTaskStatusChange(task.id, 'In Progress')}
                        >
                          Move to In Progress
                        </button>
                      )}
                      {status === 'In Progress' && (
                        <button
                          className="move-task-btn"
                          onClick={() => handleTaskStatusChange(task.id, 'Done')}
                        >
                          Move to Done
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Add New Task</h3>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter task description"
              ></textarea>
            </div>
            <div className="input-group">
              <label>Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddTaskModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleAddTask}>
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
