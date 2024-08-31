import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/nav/navbar.jsx'; // Certifique-se de que o caminho está correto

function HomePage() {
  return (
    <main>
      <NavBar />
      <Container className="mt-5">
        <header className="text-center mb-5">
          <h1 className="display-4">Bem-vindo (a) à Nextrade</h1>
          <p className="lead">
            Conecte-se com clientes, vendedores e fornecedores de forma eficiente e colaborativa.
          </p>
        </header>
        
        <section>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="shadow-sm rounded">
                <Card.Body>
                  <Card.Title className="h4 text-primary">Seller</Card.Title>
                  <Card.Text>
                    Faça login ou crie uma conta para gerenciar suas vendas e interações.
                  </Card.Text>
                  <Button variant="primary" as={Link} to="/seller/login">Acessar Seller</Button>
                  <Button variant="outline-primary" className="mt-2" as={Link} to="/seller/register">Cadastrar-se como Seller</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="shadow-sm rounded">
                <Card.Body>
                  <Card.Title className="h4 text-primary">Supplier</Card.Title>
                  <Card.Text>
                    Faça login ou crie uma conta para gerenciar seu fornecimento de produtos.
                  </Card.Text>
                  <Button variant="primary" as={Link} to="/supplier/login">Acessar Supplier</Button>
                  <Button variant="outline-primary" className="mt-2" as={Link} to="/supplier/register">Cadastrar-se como Supplier</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="shadow-sm rounded">
                <Card.Body>
                  <Card.Title className="h4 text-primary">Client</Card.Title>
                  <Card.Text>
                    Faça login ou crie uma conta para acessar e gerenciar suas compras.
                  </Card.Text>
                  <Button variant="primary" as={Link} to="/client/login">Acessar Client</Button>
                  <Button variant="outline-primary" className="mt-2" as={Link} to="/client/register">Cadastrar-se como Client</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
}

export default HomePage;
