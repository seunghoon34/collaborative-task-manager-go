import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import TodoList from './components/TodoList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;