import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ORDER_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/orders';
const PRODUCTS_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/products';
const PROFILE_API_URL = 'https://nextrade-api-2hnp.onrender.com/api/profile';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: ''
  });
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorProfile, setErrorProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
      await axios.post(ORDER_API_URL, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      navigate('/orders');
    } catch (error) {
      setError('Erro ao adicionar pedido');
      console.error(error);
    }
  };
};

export default OrderForm;
