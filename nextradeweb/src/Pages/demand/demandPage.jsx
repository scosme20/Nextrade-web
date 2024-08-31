import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const DemandPage = () => {
  const [demands, setDemands] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        const response = await axios.get('/api/demands');
        setDemands(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Falha ao carregar demandas');
      }
    };

    fetchDemands();
  }, []);

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Data</th>
            <th>Fornecedor</th>
          </tr>
        </thead>
        <tbody>
          {demands.map(demand => (
            <tr key={demand.id}>
              <td>{demand.id}</td>
              <td>{demand.description}</td>
              <td>{demand.status}</td>
              <td>{new Date(demand.date).toLocaleDateString()}</td>
              <td>{demand.supplierId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DemandPage;
