import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import NavBar from '../../components/nav/navbar.jsx'; 

function SellerProfile() {
  return (
    <main>
      <NavBar />
      <Container className="mt-5">
        <header className="text-center mb-4">
          <h1 className="display-4">Perfil do Seller</h1>
        </header>
        <Card className="shadow-sm rounded">
          <Card.Body>
            <Card.Title className="h4">Informações do Seller</Card.Title>
            <Card.Text>
              <p><strong>Nome:</strong> [Nome do Seller]</p>
              <p><strong>Email:</strong> [Email do Seller]</p>
              <p><strong>Telefone:</strong> [Telefone do Seller]</p>
              {/* Adicione mais informações conforme necessário */}
            </Card.Text>
            <Button variant="primary" href="/seller/dashboard">Voltar para o Dashboard</Button>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}

export default SellerProfile;
