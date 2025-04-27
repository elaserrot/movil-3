import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState('citas');
  const [contact, setContact] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'citas':
        return (
          <Text style={styles.serviceText}>
            En la veterinaria Ciudad Canina, tenemos servicio de consulta médica con un médico veterinario con más de
            20 años de experiencia, incluyendo servicios de esterilización, vacunaciones, desparasitaciones y controles.
          </Text>
        );
      case 'urgencias':
        return (
          <Text style={styles.serviceText}>
            Contamos con un servicio de urgencias disponible 24/7 para atender cualquier situación médica que pueda
            afectar a tu mascota. Tu tranquilidad y la salud de tu compañero son nuestra prioridad.
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Menú superior */}
      <View style={styles.menuContainer}>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Citas' as never)}>
          <Feather name="calendar" size={18} color="#014d82" style={styles.menuIcon} />
          <Text style={styles.menuButtonText}>Citas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#dc3545' }]}>
          <Feather name="log-out" size={18} color="#ffffff" style={styles.menuIcon} />
          <Text style={[styles.menuButtonText, { color: 'white' }]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Carrusel de los banners */}
      <View style={styles.carouselContainer}>
        <Swiper 
          style={styles.wrapper} 
          showsButtons={false}
          autoplay
          dotColor="#ccc"
          activeDotColor="#014d82"
        >
          <View style={styles.slide}>
            <Image 
              source={require('../screens/Banner1.png')} 
              style={styles.bannerImage}
            />
          </View>
          <View style={styles.slide}>
            <Image 
              source={require('../screens/Banner2.png')} 
              style={styles.bannerImage}
            />
          </View>
          <View style={styles.slide}>
            <Image 
              source={require('../screens/Banner3.png')} 
              style={styles.bannerImage}
            />
          </View>
        </Swiper>
      </View>

      {/* Sección Servicios */}
      <View style={[styles.sectionContainer, styles.servicesSection]}>
        <Text style={styles.sectionTitle}>SERVICIOS DISPONIBLES</Text>
        <View style={styles.serviceButtonsContainer}>
          
          <TouchableOpacity 
            style={[styles.serviceButton, activeSection === 'urgencias' && styles.activeServiceButton]}
            onPress={() => setActiveSection('urgencias')}
          >
            <Text style={[styles.serviceButtonText, activeSection === 'urgencias' && styles.activeServiceButtonText]}>
              Servicio de urgencias
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceContentContainer}>
          {renderContent()}
          <Image 
            source={{ uri: 'https://www.shutterstock.com/image-photo/happy-male-vet-doctor-uniform-260nw-2485692303.jpg' }}
            style={styles.serviceImage}
          />
        </View>
      </View>

      {/* Sección Contacto */}
      <View style={[styles.sectionContainer, styles.contactSection]}>
        <Text style={styles.sectionTitle}>CONTACTO</Text>
        <View style={styles.contactContainer}>
          <View style={styles.contactForm}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={contact.nombre}
              onChangeText={(text) => setContact({ ...contact, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={contact.email}
              onChangeText={(text) => setContact({ ...contact, email: text })}
            />
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Mensaje"
              multiline
              numberOfLines={4}
              value={contact.mensaje}
              onChangeText={(text) => setContact({ ...contact, mensaje: text })}
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.infoTitle}>INFORMACIÓN DE CONTACTO</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+57321234567')}>
              <Text style={styles.infoText}>+57 321 234567</Text>
            </TouchableOpacity>

            <View style={styles.socialIcons}>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/juan.uparela.3')}>
                <FontAwesome name="facebook" size={24} color="#3b5998" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+573115929738')}>
                <FontAwesome name="whatsapp" size={24} color="#25D366" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/jusbass07/?hl=es-la')}>
                <FontAwesome name="instagram" size={24} color="#E1306C" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#e9ecef',
  },
  menuButtonText: {
    color: '#014d82',
    fontWeight: 'bold',
  },
  menuIcon: {
    marginRight: 6,
  },
  carouselContainer: {
    height: 250,
    position: 'relative',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    padding: 20,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#014d82',
    marginBottom: 15,
    textAlign: 'center',
  },
  servicesSection: {
    backgroundColor: '#f8f9fa',
  },
  serviceButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  serviceButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#e9ecef',
  },
  activeServiceButton: {
    backgroundColor: '#014d82',
  },
  serviceButtonText: {
    color: '#495057',
  },
  activeServiceButtonText: {
    color: 'white',
  },
  serviceContentContainer: {
    flexDirection: 'column',
  },
  serviceText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  contactSection: {
    backgroundColor: '#f8f9fa',
  },
  contactContainer: {
    flexDirection: 'column',
  },
  contactForm: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#014d82',
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contactInfo: {},
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#014d82',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#014d82',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default HomeScreen;
