export const filterTodos = (filter, todos) => filter
  ? todos.filter(todo => todo.isComplete === (filter === 'completed'))
  : todos
