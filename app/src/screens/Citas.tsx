import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { agendarCita } from '../api/auth';

interface CitasProps {
  navigation: any;
}

const Citas = ({ navigation }: CitasProps) => {
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // se modifica el id depende el usuario 
  const usuarioId = 54;
  const mascotaId = 1;

  const formatearFecha = (fecha: Date) => {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    if (!servicio || !fecha) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    const citaData = {
      Usuario: usuarioId,
      Fecha: formatearFecha(fecha),
      Motivo: servicio,
      Estado: 'Pendiente',
      Mascota: mascotaId,
    };
    console.log(citaData);

    try {
        const response = await agendarCita(citaData);
        console.log('Respuesta de cita:', response);
        Alert.alert('Cita agendada', `Servicio: ${servicio}\nFecha: ${formatearFecha(fecha)}`, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } catch (error: any) {
        console.error('Error al agendar cita:', error.response?.data || error.message);
        Alert.alert('Error', `Detalles del error: ${error.response?.data?.details || error.message}`);
      }
      
      
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Agendamiento de Citas</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Servicio *</Text>
        <TextInput
          style={styles.input}
          value={servicio}
          onChangeText={setServicio}
          placeholder="Ej: Vacunación, Peluquería..."
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Fecha *</Text>
        <TouchableOpacity onPress={openDatePicker} style={styles.input}>
          <Text style={{ color: fecha ? '#000' : '#888' }}>
            {fecha ? fecha.toLocaleDateString() : 'Seleccionar fecha'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>AGENDAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#014d82',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    color: '#014d82',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Citas;
