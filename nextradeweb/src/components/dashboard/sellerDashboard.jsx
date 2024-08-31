import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Table, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ORDERS_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/orders';
const PRODUCTS_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/products';
const PROFILE_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/profile';

const ClientDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorProfile, setErrorProfile] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(ORDERS_API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setOrders(response.data);
      } catch (error) {
        setErrorOrders('Erro ao buscar pedidos');
        console.error(error);
      } finally {
        setLoadingOrders(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(PRODUCTS_API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setProducts(response.data);
      } catch (error) {
        setErrorProducts('Erro ao buscar produtos');
        console.error(error);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get(PROFILE_API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setProfile(response.data);
      } catch (error) {
        setErrorProfile('Erro ao buscar perfil');
        console.error(error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchOrders();
    fetchProducts();
    fetchProfile();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <h2 className="mb-4">Perfil</h2>
          {loadingProfile ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          ) : errorProfile ? (
            <Alert variant="danger">{errorProfile}</Alert>
          ) : profile ? (
            <Card>
              <Card.Body>
                {profile.avatar && <Card.Img variant="top" src={profile.avatar} />}
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>
                  <strong>E-mail:</strong> {profile.email}<br />
                  <strong>Telefone:</strong> {profile.phone}<br />
                  <strong>Data de Nascimento:</strong> {profile.birthDate}<br />
                  {profile.bio && <><strong>Bio:</strong> {profile.bio}<br /></>}
                </Card.Text>
                <Link to="/edit-profile">
                  <Button variant="primary">Editar Perfil</Button>
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="info">Dados do perfil não encontrados.</Alert>
          )}
        </Col>
        
        <Col md={8}>
          <Row>
            <Col>
              <h2 className="mb-4">Meus Pedidos</h2>
              {loadingOrders ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              ) : errorOrders ? (
                <Alert variant="danger">{errorOrders}</Alert>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Quantidade</th>
                      <th>Preço Total</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.quantity}</td>
                          <td>${order.totalPrice}</td>
                          <td>{order.status}</td>
                          <td>
                            <Link to={`/orders/${order.id}`}>
                              <Button variant="info">Detalhes</Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">Nenhum pedido encontrado.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
              <Link to="/create-order">
                <Button variant="primary">Criar Novo Pedido</Button>
              </Link>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <h2 className="mb-4">Catálogo de Produtos</h2>
              {loadingProducts ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              ) : errorProducts ? (
                <Alert variant="danger">{errorProducts}</Alert>
              ) : (
                <Row>
                  {products.length > 0 ? (
                    products.map(product => (
                      <Col md={4} key={product.id} className="mb-4">
                        <Card>
                          <Card.Img variant="top" src={product.imageUrl} />
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                              <strong>Preço:</strong> ${product.price}
                            </Card.Text>
                            <Link to={`/products/${product.id}`}>
                              <Button variant="primary">Ver Detalhes</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <Alert variant="info">Nenhum produto disponível.</Alert>
                    </Col>
                  )}
                </Row>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientDashboard;
