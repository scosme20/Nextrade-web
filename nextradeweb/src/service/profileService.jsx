import axios from 'axios';

// Define a URL base da API para perfis
const API_URL = 'https://nextrade-api-2hnp.onrender.com';

class ProfileService {
  // Método para obter o perfil de um cliente
  static async getClientProfile(clientId) {
    return axios.get(`${API_URL}/client/${clientId}`);
  }

  // Método para obter o perfil de um vendedor
  static async getSellerProfile(sellerId) {
    return axios.get(`${API_URL}/seller/${sellerId}`);
  }

  // Método para obter o perfil de um fornecedor
  static async getSupplierProfile(supplierId) {
    return axios.get(`${API_URL}/supplier/${supplierId}`);
  }

  // Método para atualizar um perfil
  static async updateProfile(profileId, profileData) {
    return axios.put(`${API_URL}/${profileId}`, profileData);
  }

  // Método para criar um novo perfil
  static async createProfile(profileData) {
    return axios.post(API_URL, profileData);
  }

  // Método para deletar um perfil
  static async deleteProfile(profileId) {
    return axios.delete(`${API_URL}/${profileId}`);
  }
}

export default ProfileService;
