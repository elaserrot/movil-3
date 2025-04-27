import { LogBox } from 'react-native'; // 👈 Importamos LogBox
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';

// 👇 Ignorar el warning de VirtualizedLists
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
