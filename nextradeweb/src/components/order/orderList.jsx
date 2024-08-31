import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Alert, Modal } from 'react-bootstrap';
import OrderForm from './OrderForm'; // Ajuste o caminho conforme necessário

const ORDERS_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/orders';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await axios.get(ORDERS_API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data);
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Falha ao carregar pedidos');
      }
    };

    fetchOrders();
  }, []);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setShowForm(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      if (selectedOrder) {
        await axios.put(`${ORDERS_API_URL}/${selectedOrder.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(ORDERS_API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setShowForm(false);
      setSelectedOrder(null);

      const response = await axios.get(ORDERS_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data);
    } catch (err) {
      console.error('Erro ao salvar pedido:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Falha ao salvar pedido');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      await axios.delete(`${ORDERS_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Atualize a lista de pedidos
      const response = await axios.get(ORDERS_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data);
    } catch (err) {
      console.error('Erro ao excluir pedido:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Falha ao excluir pedido');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={handleAddOrder} className="mb-3">
        Adicionar Pedido
      </Button>
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
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.quantity}</td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditOrder(order)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDeleteOrder(order.id)} className="ms-2">
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOrder ? 'Editar Pedido' : 'Adicionar Pedido'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderForm order={selectedOrder} onSave={handleSave} onCancel={handleCancel} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderList;
