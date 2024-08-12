import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      await createTodo({ title: newTodo, completed: false });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
      {todos.map((todo) => (
  <li key={todo.ID || todo.id}>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => handleToggleTodo(todo.ID || todo.id, todo.completed)}
    />
    {todo.title}
    <button onClick={() => handleDeleteTodo(todo.ID || todo.id)}>Delete</button>
  </li>
))}
      </ul>
    </div>
  );
};

export default TodoList;