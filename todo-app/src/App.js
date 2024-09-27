// App.js
import React from 'react';
import TaskList from './components/TaskList';

function App() {
  return (<>
    <div  className="slds-p-around_small" style={{ border: '2px solid #d8dde6' }}>
      <h1 className="slds-text-heading_large ">Tasks</h1>
      <h3>All Tasks</h3>
      <TaskList />

    </div>
    </>);
}

export default App;
