import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface User {
  nombre_completo: string;
  correo_electronico: string;
  usuario: string;
  contrasena: string;
  verificarContrasena: string;
}

const Register: React.FC = () => {
  const [user, setUser] = useState<User>({
    nombre_completo: '',
    correo_electronico: '',
    usuario: '',
    contrasena: '',
    verificarContrasena: '',
  });

  const navigation = useNavigation<NavigationProp>();

  const handleChange = (name: keyof User, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (Object.values(user).some((value) => value.trim() === '')) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (user.contrasena !== user.verificarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/registrar', user);
      if (response.status === 201 || response.status === 200) {
        Alert.alert('Éxito', response.data.message, [
          {
            text: 'Ir a Login',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        throw new Error('Error desconocido en el registro.');
      }
    } catch (error: any) {
      Alert.alert(error?.response?.data?.title || 'Error', error?.response?.data?.message || 'Error al registrar el usuario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.phoneFrame}>
        <View style={styles.phoneScreen}>
          <Text style={styles.title}>Veterinaria Ciudad Canina</Text>
          <Text style={styles.subtitle}>Regístrate para acceder a nuestros servicios.</Text>

          <TextInput
            placeholder="Nombre completo"
            style={styles.input}
            value={user.nombre_completo}
            onChangeText={(text) => handleChange('nombre_completo', text)}
          />
          <TextInput
            placeholder="Correo electrónico"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={user.correo_electronico}
            onChangeText={(text) => handleChange('correo_electronico', text)}
          />
          <TextInput
            placeholder="Usuario"
            style={styles.input}
            value={user.usuario}
            onChangeText={(text) => handleChange('usuario', text)}
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry
            value={user.contrasena}
            onChangeText={(text) => handleChange('contrasena', text)}
          />
          <TextInput
            placeholder="Verificar contraseña"
            style={styles.input}
            secureTextEntry
            value={user.verificarContrasena}
            onChangeText={(text) => handleChange('verificarContrasena', text)}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#D9EAFB',
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneScreen: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#007bff',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#ffc107',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
