import React, { useState } from 'react';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewTask = () => {
    setSelectedTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const handleSaveTask = (task) => {
    if (selectedTask) {
      setTasks(tasks.map(t => (t.id === selectedTask.id ? { ...task, id: selectedTask.id } : t)));
    } else {
      // Generate a random color for the border
      const borderColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
      setTasks([...tasks, { ...task, id: tasks.length + 1, borderColor }]);
    }
    setShowForm(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    task.comments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header with Buttons and Search Bar */}
      <div className="slds-grid slds-grid_align-end slds-m-bottom_medium">
        <div style={{ textAlign: 'right', width: '90%' }}>
          <button 
            className="slds-button slds-button_neutral" 
            onClick={handleNewTask} 
            style={{ backgroundColor: '#FE9339', color: 'white', marginRight: '10px' }}>
            New Task
          </button>
          <button 
            className="slds-button slds-button_neutral" 
            onClick={() => window.location.reload()} 
            style={{ backgroundColor: '#FE9339', color: 'white' }}>
            Refresh
          </button>
          <div style={{ marginTop: '5px' }}>
          
            <input 
              type="text" 
              className="slds-input" 
              placeholder="Search" 
              style={{ width: '175px' }} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Order Display */}
      <h2>({tasks.length} {tasks.length === 1 ? 'Record' : 'Records'})</h2>

      {/* Task List Table with Borders */}
      <div>
        <table className="slds-table slds-table_cell-buffer slds-table_bordered" aria-labelledby="element-with-table-label other-element-with-table-label">
          <thead>
            <tr className="slds-line-height_reset">
              <th scope="col">
                <div className="slds-checkbox">
                  <input type="checkbox" id="checkbox-select-all" />
                  <label className="slds-checkbox__label" htmlFor="checkbox-select-all">
                    <span className="slds-checkbox_faux"></span>
                    <span className="slds-form-element__label slds-assistive-text">Select All</span>
                  </label>
                </div>
              </th>
              <th scope="col"><div className="slds-truncate" title="Assigned To">Assigned To</div></th>
              <th scope="col"><div className="slds-truncate" title="Status">Status</div></th>
              <th scope="col"><div className="slds-truncate" title="Due Date">Due Date</div></th>
              <th scope="col"><div className="slds-truncate" title="Priority">Priority</div></th>
              <th scope="col"><div className="slds-truncate" title="Comments">Comments</div></th>
              <th scope="col"><div className="slds-truncate" title="Actions">Actions</div></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id} className="slds-hint-parent" style={{ borderBottom: `2px solid ${task.borderColor}` }}>
                <td>
                  <div className="slds-checkbox">
                    <input type="checkbox" id={`checkbox-${task.id}`} />
                    <label className="slds-checkbox__label" htmlFor={`checkbox-${task.id}`}>
                      <span className="slds-checkbox_faux"></span>
                      <span className="slds-form-element__label slds-assistive-text">Select {task.assignedTo}</span>
                    </label>
                  </div>
                </td>
                <td><div className="slds-truncate" title={task.assignedTo}>{task.assignedTo}</div></td>
                <td><div className="slds-truncate" title={task.status}>{task.status}</div></td>
                <td><div className="slds-truncate" title={task.dueDate}>{task.dueDate}</div></td>
                <td><div className="slds-truncate" title={task.priority}>{task.priority}</div></td>
                <td><div className="slds-truncate" title={task.comments}>{task.comments}</div></td>
                <td>
                  <button  onClick={() => handleEditTask(task)}>
                    <span >Edit</span>
                  </button>
                  <button  onClick={() => handleDeleteTask(task.id)}>
                    <span >Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="slds-grid slds-grid_align-end slds-m-bottom_medium">
      <div style={{ textAlign: 'right', width: '90%' }}>
      <div className="slds-button-group" role="group">
<div>
<button className="slds-button slds-button_neutral slds-button_first">First</button>
</div>
<div>
<button className="slds-button slds-button_neutral slds-button_middle">Previous</button>
</div>
<div>
<button className="slds-button slds-button_neutral slds-button_middle">1</button>
</div>
<div>
<button className="slds-button slds-button_neutral slds-button_middle">Next</button>
</div>
<div>
<button className="slds-button slds-button_neutral slds-button_last">Last</button>
</div>
</div>        
        

      
      </div></div>

      {/* TaskForm for Creating/Editing Tasks */}
      <TaskForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        task={selectedTask}
        saveTask={handleSaveTask}
      />
    </div>
  );
};

export default TaskList;
