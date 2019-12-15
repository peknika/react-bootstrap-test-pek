const host = 'http://localhost:5000';
const apiHost = `${host}/api`;

// Create new task
// POST /tasks
// { task: { text: 'your text' } }

// Get List Of Tasks
// GET /tasks

// Get Task
// GET /tasks/:id

// Remove Task
// DELETE /tasks/:id

export default {
  tasksUrl: () => [apiHost, 'tasks'].join('/'), // get tasks list
  taskUrl: (id) => [apiHost, 'tasks', id].join('/')
};
