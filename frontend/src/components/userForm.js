import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    anoNascimento: '',
    endereco: '',
    genero: '',
    cpf: ''
  });
  // estado para mensagens de erro
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/users/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error("Erro ao obter usuário:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // limpa erro do campo enquanto digita
    setErrors(errs => ({ ...errs, [e.target.name]: '' }));
  };

  // função de validação antes do envio
  const validate = () => {
    const errs = {};
    const curYear = new Date().getFullYear();

    // valida CPF: só numero e 11 caracteres
    if (!/^\d{11}$/.test(user.cpf)) {
      errs.cpf = 'CPF deve conter 11 dígitos numéricos.';
    }
    // valida Ano de Nascimento: só dígitos, 4 caracteres, entre 1900 e ano atual
    if (!/^\d{4}$/.test(user.anoNascimento)
        || user.anoNascimento < 1900
        || user.anoNascimento > curYear) {
      errs.anoNascimento = `Ano inválido. Deve estar entre 1900 e ${curYear}.`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // bloqueia envio se validações falharem
    if (!validate()) return;

    const request = id
      ? axios.put(`http://localhost:3001/api/users/${id}`, user)
      : axios.post('http://localhost:3001/api/users', user);

    request
      .then(response => {
        alert(response.data.message);
        navigate('/');
      })
      .catch(error => {
        console.error("Erro ao salvar usuário:", error);
        alert('Ocorreu um erro ao enviar os dados.');
      });
  };

  return (
    <div>
      <h2>{id ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br/>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Ano de Nascimento:</label><br/>
          <input
            type="text"
            name="anoNascimento"
            value={user.anoNascimento}
            onChange={handleChange}
            maxLength={4}
            required
          />
          {errors.anoNascimento && (
            <div style={{ color: 'red' }}>{errors.anoNascimento}</div>
          )}
        </div>

        <div>
          <label>Endereço:</label><br/>
          <input
            type="text"
            name="endereco"
            value={user.endereco}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gênero:</label><br/>
          <input
            type="text"
            name="genero"
            value={user.genero}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>CPF:</label><br/>
          <input
            type="text"
            name="cpf"
            value={user.cpf}
            onChange={handleChange}
            maxLength={11}
            required
          />
          {errors.cpf && (
            <div style={{ color: 'red' }}>{errors.cpf}</div>
          )}
        </div>

        <button type="submit">
          {id ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;