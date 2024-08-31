import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Alert, Modal } from 'react-bootstrap';
import ProductForm from './ProductForm'; // Ajuste o caminho conforme necessário

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await axios.get('https://nextrade-api-2hnp.onrender.com/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProducts(response.data);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Falha ao carregar produtos');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      if (selectedProduct) {
        await axios.put(`https://nextrade-api-2hnp.onrender.com/api/products/${selectedProduct.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post('https://nextrade-api-2hnp.onrender.com/api/products', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      setShowForm(false);
      setSelectedProduct(null);

      const response = await axios.get('https://nextrade-api-2hnp.onrender.com/api/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(response.data);
    } catch (err) {
      console.error('Erro ao salvar produto:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Falha ao salvar produto');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      await axios.delete(`https://nextrade-api-2hnp.onrender.com/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Atualize a lista de produtos após exclusão
      const response = await axios.get('https://nextrade-api-2hnp.onrender.com/api/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(response.data);
    } catch (err) {
      console.error('Erro ao excluir produto:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Falha ao excluir produto');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={handleAddProduct} className="mb-3">
        Adicionar Produto
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Estoque</th>
            <th>Fornecedor</th>
            <th>Vendedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>{product.supplierId}</td>
              <td>{product.sellerId}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditProduct(product)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)} className="ms-2">
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Editar Produto' : 'Adicionar Produto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm product={selectedProduct} onSave={handleSave} onCancel={handleCancel} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
