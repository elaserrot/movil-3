import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ImageBackground 
} from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleNavigateToLogin = () => {
    navigation.navigate('Login'as never);
  };  

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'El correo electrónico no es válido.');
      return;
    }
    
    Alert.alert(
      'Correo enviado',
      `Se ha enviado un enlace de recuperación a ${email}`,
      [{ text: 'OK', onPress: handleNavigateToLogin }]
    );
  };

  return (
    <ImageBackground 
      source={require('../screens/fondol.png')}
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Recupera tu Contraseña</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo electrónico para restablecer tu contraseña
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Enviar enlace de recuperación</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.normalText}>¿Recordaste tu contraseña? </Text>
          <TouchableOpacity onPress={handleNavigateToLogin}>
            <Text style={styles.linkText}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#014d82',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#014d82',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
    borderRadius: 10,
  },
  normalText: {
    color: '#333',
    fontSize: 15,
  },
  linkText: {
    color: '#007bff',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;