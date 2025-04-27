import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, Text } from 'react-native'; 
import Login from '../src/screens/Login';
import Register from '../src/screens/Register';
import HomeScreen from '../src/screens/HomeScreen';
import ForgotPassword from '../src/screens/ForgotPassword';
import Citas from '../src/screens/Citas';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ 
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Iniciar Sesión' }} 
      />
      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#014d82' }}>
            Registrate
            </Text>
            <Image
            source={require('../src/screens/logovet.png')}
            style={{ width: 50, height: 70, resizeMode: 'contain', marginRight: -20 }}
            />
          </View>
          ),
            headerTitleAlign: 'center',
          }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword} 
        options={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#014d82' }}>
            Recuperar Contraseña
            </Text>
            <Image
            source={require('../src/screens/logovet.png')}
            style={{ width: 50, height: 70, resizeMode: 'contain', marginRight: -20 }}
            />
          </View>
          ),
            headerTitleAlign: 'center',
          }}
      />
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#014d82' }}>
            Bienvenido
            </Text>
            <Image
            source={require('../src/screens/logovet.png')}
            style={{ width: 50, height: 70, resizeMode: 'contain', marginRight: -20 }}
            />
          </View>
          ),
            headerTitleAlign: 'center',
          }}
      />
      <Stack.Screen 
        name="Citas" 
        component={Citas} 
        options={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#014d82' }}>
            Agenda tu cita
            </Text>
            <Image
            source={require('../src/screens/logovet.png')}
            style={{ width: 50, height: 70, resizeMode: 'contain', marginRight: -20 }}
            />
          </View>
          ),
            headerTitleAlign: 'center',
          }}
      />
    </Stack.Navigator>
  );
}

