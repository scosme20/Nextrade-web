import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PROFILE_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/profile';

const ProfileDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(PROFILE_API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setProfile(response.data);
      } catch (error) {
        setError('Erro ao buscar perfil');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Dados do perfil não encontrados.</Alert>
      </Container>
    );
  }

  const { role, name, email, phone, birthDate, bio } = profile;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                <strong>E-mail:</strong> {email}<br />
                <strong>Telefone:</strong> {phone}<br />
                <strong>Data de Nascimento:</strong> {birthDate}<br />
                {bio && <><strong>Bio:</strong> {bio}<br /></>}
              </Card.Text>
              <Link to="/edit-profile">
                <Button variant="primary">Editar Perfil</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          {role === 'admin' && (
            <>
              <h2 className="mb-4">Admin Dashboard</h2>
              {/* Admin-specific components or information */}
              <Card>
                <Card.Body>
                  <Card.Title>Admin Features</Card.Title>
                  <Card.Text>
                    <Link to="/admin/settings">
                      <Button variant="primary">Configurações</Button>
                    </Link>
                    <Link to="/admin/users" className="ms-2">
                      <Button variant="secondary">Gerenciar Usuários</Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
          
          {role === 'supplier' && (
            <>
              <h2 className="mb-4">Supplier Dashboard</h2>
              {/* Supplier-specific components or information */}
              <Card>
                <Card.Body>
                  <Card.Title>Supplier Features</Card.Title>
                  <Card.Text>
                    <Link to="/supplier/products">
                      <Button variant="primary">Gerenciar Produtos</Button>
                    </Link>
                    <Link to="/supplier/orders" className="ms-2">
                      <Button variant="secondary">Meus Pedidos</Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
          
          {role === 'client' && (
            <>
              <h2 className="mb-4">Client Dashboard</h2>
              {/* Client-specific components or information */}
              <Card>
                <Card.Body>
                  <Card.Title>Client Features</Card.Title>
                  <Card.Text>
                    <Link to="/client/orders">
                      <Button variant="primary">Meus Pedidos</Button>
                    </Link>
                    <Link to="/client/products" className="ms-2">
                      <Button variant="secondary">Catálogo de Produtos</Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileDashboard;
