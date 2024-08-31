import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SUPPLIER_LOGIN_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/auth/login';

const SupplierLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SUPPLIER_LOGIN_API_URL, {
        email,
        password,
        role: 'supplier',
        identifier: cnpj
      });
      localStorage.setItem('token', response.data.token);
      navigate('/supplier/dashboard'); // Redireciona para o dashboard do fornecedor
    } catch (err) {
      setError(err.response?.data?.message || 'Login falhou');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Supplier Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
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
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default SupplierLoginPage;
