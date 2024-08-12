import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import TodoList from './components/TodoList';
import CreateTeam from './components/CreateTeam';
import JoinTeam from './components/JoinTeam';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          {/* Add navigation links here */}
        </nav>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/join-team" element={<JoinTeam />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
