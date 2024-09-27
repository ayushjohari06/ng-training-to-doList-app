// TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ show, handleClose, task, saveTask }) => {
  const [formData, setFormData] = useState({
    assignedTo: task?.assignedTo || '',
    status: task?.status || 'Not Started',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'normal',
    comments: task?.comments || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.assignedTo || !formData.status || !formData.dueDate || !formData.priority) {
      alert('All fields are required!');
      return;
    }
    saveTask(formData);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="slds-modal slds-fade-in-open">
      <div className="slds-modal__container">
        <div className="slds-modal__header">
          
          <h2 className="slds-text-heading_medium">{task ? 'Edit Task' : 'New Task'}</h2>
        </div>
        <div className="slds-modal__content">
          <div className="slds-form slds-form_stacked">
            <div className="slds-form-element">
            <abbr class="slds-required" title="required">* </abbr>
              <label className="slds-form-element__label" htmlFor="assignedTo">Assigned To</label>
              <div className="slds-form-element__control">
                <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="slds-input" required />
              </div>
            </div>
            <div className="slds-form-element">
            <abbr class="slds-required" title="required">* </abbr>
              <label className="slds-form-element__label" htmlFor="status">Status</label>
              <div className="slds-form-element__control">
              <select name="priority" value={formData.priority} onChange={handleChange} className="slds-select">
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="dueDate">Due Date</label>
              <div className="slds-form-element__control">
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="slds-input" required />
              </div>
            </div>
            <div className="slds-form-element">
            <abbr class="slds-required" title="required">* </abbr>
              <label className="slds-form-element__label" htmlFor="priority">Priority</label>
              <div className="slds-form-element__control">
                <select name="priority" value={formData.priority} onChange={handleChange} className="slds-select">
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="comments">Comments</label>
              <div className="slds-form-element__control">
                <input type="text" name="comments" value={formData.comments} onChange={handleChange} className="slds-input" />
              </div>
            </div>
          </div>
        </div>
        <div className="slds-modal__footer">
          <button className="slds-button slds-button_neutral" onClick={handleClose}>Cancel</button>
          <button className="slds-button slds-button_brand" onClick={handleSubmit}>Save Task</button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
