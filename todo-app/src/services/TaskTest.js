import { expect } from 'chai';
import{handleSaveTask,handleSubmit } from "../components/TaskForm";

describe('Task Service', () => {
  it('should add a task', async () => {
    const task = { name: 'Test Task' };
    await handleSaveTask(task);
    const tasks = await handleSubmit ();
    expect(tasks.length).to.equal(1);
    expect(tasks[0].name).to.equal('Test Task');
  });
});