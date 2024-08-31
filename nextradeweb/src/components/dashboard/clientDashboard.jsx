import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OrderList from '../order/orderList.jsx';

const ORDERS_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/orders';
const PRODUCTS_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/products';
const PROFILE_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/profile';

const ClientDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: ''
  });
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorProfile, setErrorProfile] = useState(null);
  const [error, setError] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(ORDERS_API_URL, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setOrders([...orders, response.data]);
      setFormData({ productId: '', quantity: '' }); // Reset form
    } catch (error) {
      setError('Erro ao adicionar pedido');
      console.error(error);
    }
  };

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
              <h2 className="mb-4">Criar Novo Pedido</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProduct">
                  <Form.Label>Produto</Form.Label>
                  <Form.Control
                    as="select"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um produto</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formQuantity">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="primary" type="submit">
                  Adicionar Pedido
                </Button>
              </Form>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <h2 className="mb-4">Meus Pedidos</h2>
              {loadingOrders ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              ) : errorOrders ? (
                <Alert variant="danger">{errorOrders}</Alert>
              ) : (
                <OrderList orders={orders} />
              )}
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
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text><strong>Preço:</strong> R${product.price.toFixed(2)}</Card.Text>
                            <Link to={`/product/${product.id}`}>
                              <Button variant="primary">Ver Detalhes</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Alert variant="info">Nenhum produto encontrado.</Alert>
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
