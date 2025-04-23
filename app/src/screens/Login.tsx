import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  HomeScreen: undefined;
  Register: undefined;
  ForgotPassword: undefined
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface UserLogin {
  correo_electronico: string;
  contrasena: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<UserLogin>({
    correo_electronico: '',
    contrasena: '',
  });
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const handleChange = (name: keyof UserLogin, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', user);
      
      if (response.status === 200 && response.data?.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
        Alert.alert('Éxito', 'Inicio de sesión exitoso', [
          {
            text: 'Continuar',
            onPress: () => navigation.navigate('HomeScreen'), // Redirigir a HomeScreen
          },
        ]);
      } else {
        throw new Error('Credenciales incorrectas.');
      }
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message || 'Usuario o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.phoneFrame}>
        <View style={styles.phoneScreen}>
          <Text style={styles.title}>Bienvenido a Veterinaria Ciudad Canina</Text>
          <Text style={styles.subtitle}>Ingresa tus credenciales para acceder.</Text>

          <TextInput
            placeholder="Correo electrónico"
            value={user.correo_electronico}
            onChangeText={(text) => handleChange('correo_electronico', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            placeholder="Contraseña"
            value={user.contrasena}
            onChangeText={(text) => handleChange('contrasena', text)}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Cargando...' : 'Ingresar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>¿Aún no tienes una cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  phoneFrame: {
    width: 320,
    height: 600,
    backgroundColor: '#000',
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  phoneScreen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#008000',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
});
