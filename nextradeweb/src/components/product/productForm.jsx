import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    supplierId: '',
    sellerId: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        stock: product.stock || '',
        supplierId: product.supplierId || '',
        sellerId: product.sellerId || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Preço</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formStock">
        <Form.Label>Estoque</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formSupplierId">
        <Form.Label>ID do Fornecedor</Form.Label>
        <Form.Control
          type="text"
          name="supplierId"
          value={formData.supplierId}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formSellerId">
        <Form.Label>ID do Vendedor</Form.Label>
        <Form.Control
          type="text"
          name="sellerId"
          value={formData.sellerId}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">
        Cancelar
      </Button>
    </Form>
  );
};

export default ProductForm;
