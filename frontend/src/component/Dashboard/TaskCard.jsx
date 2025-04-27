const TaskCard = ({ task }) => {
    return (
      <div className="border border-gray-300 p-3 mb-2 rounded">
        <h4 className="font-semibold">{task.title}</h4>
        <p>{task.description}</p>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">Assigned to: {task.assignedTo}</span>
          <span className="text-sm text-gray-600">Status: {task.status}</span>
        </div>
      </div>
    );
  };
  
  export default TaskCard;
  