import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.phoneFrame}>
        <View style={styles.phoneScreen}>
          <Text style={styles.title}>VETERINARIA{"\n"}CIUDAD CANINA</Text>
          <View style={styles.decorativeBar} />
          <Text style={styles.subtitle}>NUESTROS PRODUCTOS</Text>

          

          <View style={styles.buttonContainer}>
            <Button title="Ir a Registro" onPress={navigateToRegister} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#D9EAFB',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: 320,
    height: 500,
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
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#014d82',
    marginTop: 20,
  },
  decorativeBar: {
    width: '80%',
    height: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 120,
    height: 160,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});
