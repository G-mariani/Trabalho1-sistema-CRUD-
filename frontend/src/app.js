import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import UserList from './components/userList';
import UserForm from './components/userForm';
import UserDetail from './components/userDetail';

function App() {
  return (
    <Router>
      <header>
        <h1>Sistema de Gestão de Usuários - [Seu Nome]</h1>
        <nav>
          <Link to="/">Lista de Usuários</Link>
          {' | '}
          <Link to="/new">Novo Usuário</Link>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/new" component={UserForm} />
          <Route path="/edit/:id" component={UserForm} />
          <Route path="/detail/:id" component={UserDetail} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
