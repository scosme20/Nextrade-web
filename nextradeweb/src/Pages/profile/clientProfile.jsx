import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PROFILE_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/profile';

const ClientProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(PROFILE_API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        const data = response.data;
        setProfile(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setBio(data.bio || '');
      } catch (err) {
        setError('Erro ao buscar perfil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(PROFILE_API_URL, {
        name,
        email,
        phone,
        bio
      }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      navigate('/client/dashboard');
    } catch (err) {
      setError('Erro ao atualizar perfil');
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Meu Perfil</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card>
          <Card.Body>
            <Form onSubmit={handleSave}>
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
              <Form.Group controlId="formPhone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Digite sua bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Salvar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ClientProfilePage;
