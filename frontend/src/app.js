import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  
import UserList from './components/userList';
import UserForm from './components/userForm';
import UserDetail from './components/userDetails';

function App() {
  return (
    <Router>
      <header>
        <h1>Sistema de Gestão de Usuários - [Gabriel Mariani Ribeiro Santos]</h1>
        <nav>
          <Link to="/">Lista de Usuários</Link>
          {' | '}
          <Link to="/new">Novo Usuário</Link>
        </nav>
      </header>
      <main>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/new" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
        <Route path="/detail/:id" element={<UserDetail />} />
      </Routes>
      </main>
    </Router>
  );
}

export default App;
