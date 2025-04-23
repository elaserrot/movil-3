import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth'; // Reemplaza con tu URL real

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.status === 200 && response.data?.token) {
      return response.data;
    } else {
      throw new Error('Credenciales incorrectas');
    }
  } catch (error: any) {
    console.error('Error en login:', error.message);
    return null;
  }
};

export const register = async (userData: { nombre: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/registrar`, userData);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Error en el registro');
    }
  } catch (error: any) {
    console.error('Error en register:', error.message);
    return null;
  }
};

export default {
  login,
  register,
};