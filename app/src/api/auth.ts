import axios from 'axios';

const API_URL = 'http://192.168.10.21:3001/'; // cambiar el numero de la ip

export const login = async (correoElectronico: string, contrasena: string) => {
  try {
    const response = await axios.post(`${API_URL}login`, { 
      correoElectronico, 
      contrasena 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 && response.data?.token) {
      return response.data;
    }
    throw new Error(response.data?.message || 'Credenciales incorrectas');
  } catch (error: any) {
    console.error('Error en login:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData: { 
  nombreCompleto: string; 
  correoElectronico: string; 
  usuario: string;
  contrasena: string;
  verificarContrasena: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}agregar`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.data?.error || 'Error en el registro');
  } catch (error: any) {
    console.error('Error en register:', error.response?.data || error.message);
    throw error;
  }
};
export const agendarCita = async (citaData: {
  Usuario: number;
  Fecha: string;
  Motivo: string;
  Estado: string;
  Mascota: number;
}) => {
  try {
    const response = await axios.post(`http://192.168.10.21:3001/api/citas/agregarCita`, citaData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.data?.error || 'Error al agendar cita');
  } catch (error: any) {
    console.error('Error en agendar cita:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Error en el servidor al agendar cita');
  }
};


export default {
  login,
  register,
  agendarCita, 
};
