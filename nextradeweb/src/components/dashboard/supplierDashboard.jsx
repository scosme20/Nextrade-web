import React from 'react';
import { Container } from 'react-bootstrap';
import DashboardNav from '../../components/nav/supplierNavDashboard.jsx';
import ProductList from '../product/productList.jsx';

const SupplierDashboardPage = () => {
  return (
    <Container>
      <DashboardNav />
      <ProductList />
    </Container>
  );
};

export default SupplierDashboardPage;
