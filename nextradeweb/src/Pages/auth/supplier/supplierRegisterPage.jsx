import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SUPPLIER_REGISTER_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/auth/register';

const SupplierRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem('authToken'); // Substitua 'authToken' pela chave usada para armazenar o token
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(SUPPLIER_REGISTER_API_URL, {
        email,
        password,
        name,
        cnpj, // Certifique-se de que o campo é `cnpj`
        role: 'supplier'
      }, {
        headers: {
          Authorization: `Bearer ${getToken()}` // Adiciona o token ao header
        }
      });
      navigate('/supplier/dashboard'); // Redireciona para a página de login
    } catch (err) {
      console.error('Erro ao registrar fornecedor:', err); // Log para depuração
      setError(err.response?.data?.message || 'Registro falhou');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Supplier Register</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCnpj">
          <Form.Label>CNPJ</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default SupplierRegisterPage;
