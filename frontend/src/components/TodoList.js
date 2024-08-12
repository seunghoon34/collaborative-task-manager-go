import React, { useState, useEffect, useCallback } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, listUserTeams } from '../services/api';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [teams, setTeams] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', teamId: '', deadline: '', priority: 2 });
    const [filters, setFilters] = useState({ team: '', priority: '', deadline: '' });
    const [sortBy, setSortBy] = useState('');

    const fetchTodos = useCallback(async () => {
        try {
            const response = await getTodos({ ...filters, sort_by: sortBy });
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }, [filters, sortBy]);

    const fetchTeams = useCallback(async () => {
        try {
            const response = await listUserTeams();
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
        fetchTeams();
    }, [fetchTodos, fetchTeams]);

    const handleCreateTodo = async (e) => {
        e.preventDefault();
        try {
            await createTodo(newTodo);
            setNewTodo({ title: '', teamId: '', deadline: '', priority: 2 });
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
            <h1>Todo List</h1>
            <form onSubmit={handleCreateTodo}>
                <input
                    type="text"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    placeholder="New todo"
                    required
                />
                <select
                    value={newTodo.teamId}
                    onChange={(e) => setNewTodo({ ...newTodo, teamId: e.target.value })}
                >
                    <option value="">Personal</option>
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <input
                    type="date"
                    value={newTodo.deadline}
                    onChange={(e) => setNewTodo({ ...newTodo, deadline: e.target.value })}
                />
                <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({ ...newTodo, priority: parseInt(e.target.value) })}
                >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>
                <button type="submit">Add Todo</button>
            </form>
            <div>
                <h3>Filters</h3>
                <select
                    value={filters.team}
                    onChange={(e) => setFilters({ ...filters, team: e.target.value })}
                >
                    <option value="">All Teams</option>
                    <option value="personal">Personal</option>
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <select
                    value={filters.priority}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                >
                    <option value="">All Priorities</option>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>
                <input
                    type="date"
                    value={filters.deadline}
                    onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="deadline">Deadline</option>
                    <option value="priority">Priority</option>
                    <option value="created_at">Created At</option>
                </select>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className={todo.team_id ? 'team-task' : 'personal-task'}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id, todo.completed)}
                        />
                        <span>{todo.title}</span>
                        <span>Priority: {todo.priority}</span>
                        <span>Deadline: {new Date(todo.deadline).toLocaleDateString()}</span>
                        {todo.team_id && <span>Team Task</span>}
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;