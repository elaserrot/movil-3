import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import HomeScreen from '../screens/HomeScreen';
import ForgotPassword from '../screens/ForgotPassword';
import Citas from '../screens/Citas';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"  // ← Esto define la pantalla inicial
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
        options={{ title: 'Registro' }} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword} 
        options={{ title: 'Recuperar Contraseña' }} 
      />
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Bienvenido' }}  
      />
      <Stack.Screen 
        name="Citas" 
        component={Citas} 
        options={{ title: 'Agenda tus citas' }}  
      />
    </Stack.Navigator>
  );
}

